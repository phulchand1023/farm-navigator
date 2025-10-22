import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { z } from 'zod'

const decisionRoutes = new Hono()

// JWT middleware
decisionRoutes.use('*', async (c, next) => {
  const jwtMiddleware = jwt({ secret: c.env.JWT_SECRET || 'fallback-secret' })
  return jwtMiddleware(c, next)
})

// Decision validation schema
const decisionSchema = z.object({
  farmId: z.number(),
  type: z.enum(['planting', 'irrigation', 'fertilizer', 'harvest']),
  recommendation: z.string(),
  confidence: z.number().min(0).max(1),
  factors: z.array(z.string()).optional(),
  nasaData: z.object({
    temperature: z.number().optional(),
    rainfall: z.number().optional(),
    soilMoisture: z.number().optional()
  }).optional()
})

// Get farming decisions
decisionRoutes.get('/', async (c) => {
  try {
    const payload = c.get('jwtPayload')
    const farmId = c.req.query('farmId')

    let query = 'SELECT * FROM decisions WHERE user_id = ?'
    let params = [payload.id]

    if (farmId) {
      query += ' AND farm_id = ?'
      params.push(farmId)
    }

    query += ' ORDER BY created_at DESC LIMIT 50'

    const decisions = await c.env.DB.prepare(query).bind(...params).all()

    return c.json({ decisions: decisions.results })
  } catch (error) {
    console.error('Get decisions error:', error)
    return c.json({ message: 'Failed to fetch decisions' }, 500)
  }
})

// Create farming decision
decisionRoutes.post('/', async (c) => {
  try {
    const payload = c.get('jwtPayload')
    const body = await c.req.json()
    const data = decisionSchema.parse(body)

    // Verify farm belongs to user
    const farm = await c.env.DB.prepare(
      'SELECT id FROM farms WHERE id = ? AND user_id = ?'
    ).bind(data.farmId, payload.id).first()

    if (!farm) {
      return c.json({ message: 'Farm not found' }, 404)
    }

    const result = await c.env.DB.prepare(`
      INSERT INTO decisions (user_id, farm_id, type, recommendation, confidence, 
                           factors, nasa_data, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      payload.id,
      data.farmId,
      data.type,
      data.recommendation,
      data.confidence,
      JSON.stringify(data.factors || []),
      JSON.stringify(data.nasaData || {}),
      new Date().toISOString()
    ).run()

    return c.json({
      message: 'Decision created successfully',
      decision: { id: result.meta.last_row_id, ...data }
    }, 201)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors[0].message }, 400)
    }
    console.error('Create decision error:', error)
    return c.json({ message: 'Failed to create decision' }, 500)
  }
})

// Get NASA data for location
decisionRoutes.get('/nasa-data', async (c) => {
  try {
    const lat = c.req.query('lat')
    const lng = c.req.query('lng')

    if (!lat || !lng) {
      return c.json({ message: 'Latitude and longitude required' }, 400)
    }

    // Cache key for NASA data
    const cacheKey = `nasa-data:${lat}:${lng}:${new Date().toDateString()}`
    
    // Try to get from KV cache first
    const cached = await c.env.CACHE.get(cacheKey)
    if (cached) {
      return c.json(JSON.parse(cached))
    }

    // Fetch from NASA POWER API
    const currentYear = new Date().getFullYear()
    const startDate = `${currentYear}0101`
    const endDate = `${currentYear}1231`

    const nasaResponse = await fetch(
      `https://power.larc.nasa.gov/api/temporal/daily/point?latitude=${lat}&longitude=${lng}&start=${startDate}&end=${endDate}&parameters=T2M,PRECTOTCORR&community=AG&format=JSON`
    )

    if (!nasaResponse.ok) {
      throw new Error('NASA API request failed')
    }

    const nasaData = await nasaResponse.json()

    // Cache for 24 hours
    await c.env.CACHE.put(cacheKey, JSON.stringify(nasaData), { expirationTtl: 86400 })

    return c.json(nasaData)

  } catch (error) {
    console.error('NASA data error:', error)
    return c.json({ message: 'Failed to fetch NASA data' }, 500)
  }
})

export { decisionRoutes }