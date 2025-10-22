import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { authRoutes } from './routes/auth'
import { farmRoutes } from './routes/farm'
import { decisionRoutes } from './routes/decisions'

const app = new Hono()

// CORS middleware
app.use('*', cors({
  origin: ['http://localhost:5173', 'https://nasa-farm-navigator.pages.dev', 'https://dc014ac0.nasa-farm-navigator.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Health check
app.get('/', (c) => {
  return c.json({ 
    message: 'NASA Farm Navigator API',
    version: '1.0.0',
    status: 'healthy'
  })
})

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/farm', farmRoutes)
app.route('/api/decision', decisionRoutes)

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Route not found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app