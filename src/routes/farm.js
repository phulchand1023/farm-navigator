import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { z } from 'zod'

const farmRoutes = new Hono()

// JWT middleware
farmRoutes.use('*', async (c, next) => {
  const jwtMiddleware = jwt({ secret: c.env.JWT_SECRET || 'fallback-secret' })
  return jwtMiddleware(c, next)
})

// Farm validation schema
const farmSchema = z.object({
  name: z.string().min(1, 'Farm name is required'),
  location: z.object({
    state: z.string(),
    district: z.string(),
    village: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional()
  }),
  size: z.number().positive('Farm size must be positive'),
  cropTypes: z.array(z.string()).optional()
})

// Get user farms
farmRoutes.get('/', async (c) => {
  try {
    const payload = c.get('jwtPayload')
    
    const farms = await c.env.DB.prepare(
      'SELECT * FROM farms WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(payload.id).all()

    return c.json({ farms: farms.results })
  } catch (error) {
    console.error('Get farms error:', error)
    return c.json({ message: 'Failed to fetch farms' }, 500)
  }
})

// Create farm
farmRoutes.post('/', async (c) => {
  try {
    const payload = c.get('jwtPayload')
    const body = await c.req.json()
    const data = farmSchema.parse(body)

    const result = await c.env.DB.prepare(`
      INSERT INTO farms (user_id, name, location_state, location_district, location_village, 
                        coordinates_lat, coordinates_lng, size, crop_types, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      payload.id,
      data.name,
      data.location.state,
      data.location.district,
      data.location.village,
      data.location.coordinates?.lat || null,
      data.location.coordinates?.lng || null,
      data.size,
      JSON.stringify(data.cropTypes || []),
      new Date().toISOString()
    ).run()

    return c.json({
      message: 'Farm created successfully',
      farm: { id: result.meta.last_row_id, ...data }
    }, 201)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors[0].message }, 400)
    }
    console.error('Create farm error:', error)
    return c.json({ message: 'Failed to create farm' }, 500)
  }
})

// Update farm
farmRoutes.put('/:id', async (c) => {
  try {
    const payload = c.get('jwtPayload')
    const farmId = c.req.param('id')
    const body = await c.req.json()
    const data = farmSchema.parse(body)

    const result = await c.env.DB.prepare(`
      UPDATE farms SET name = ?, location_state = ?, location_district = ?, 
                       location_village = ?, coordinates_lat = ?, coordinates_lng = ?,
                       size = ?, crop_types = ?, updated_at = ?
      WHERE id = ? AND user_id = ?
    `).bind(
      data.name,
      data.location.state,
      data.location.district,
      data.location.village,
      data.location.coordinates?.lat || null,
      data.location.coordinates?.lng || null,
      data.size,
      JSON.stringify(data.cropTypes || []),
      new Date().toISOString(),
      farmId,
      payload.id
    ).run()

    if (result.changes === 0) {
      return c.json({ message: 'Farm not found' }, 404)
    }

    return c.json({ message: 'Farm updated successfully' })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors[0].message }, 400)
    }
    console.error('Update farm error:', error)
    return c.json({ message: 'Failed to update farm' }, 500)
  }
})

// Delete farm
farmRoutes.delete('/:id', async (c) => {
  try {
    const payload = c.get('jwtPayload')
    const farmId = c.req.param('id')

    const result = await c.env.DB.prepare(
      'DELETE FROM farms WHERE id = ? AND user_id = ?'
    ).bind(farmId, payload.id).run()

    if (result.changes === 0) {
      return c.json({ message: 'Farm not found' }, 404)
    }

    return c.json({ message: 'Farm deleted successfully' })

  } catch (error) {
    console.error('Delete farm error:', error)
    return c.json({ message: 'Failed to delete farm' }, 500)
  }
})

export { farmRoutes }