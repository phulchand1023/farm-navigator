import { Hono } from 'hono'
import { jwt, sign, verify } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const authRoutes = new Hono()

// Validation schemas
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

// Register endpoint
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const data = registerSchema.parse(body)

    // Check if user exists in D1 database
    const existingUser = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ? OR username = ?'
    ).bind(data.email, data.username).first()

    if (existingUser) {
      return c.json({ message: 'User already exists' }, 400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Insert user into D1 database
    const result = await c.env.DB.prepare(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)'
    ).bind(data.username, data.email, hashedPassword, new Date().toISOString()).run()

    // Generate JWT token
    const token = await sign(
      { id: result.meta.last_row_id, username: data.username },
      c.env.JWT_SECRET || 'fallback-secret'
    )

    return c.json({
      message: 'User registered successfully',
      user: { id: result.meta.last_row_id, username: data.username, email: data.email },
      token
    }, 201)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors[0].message }, 400)
    }
    console.error('Registration error:', error)
    return c.json({ message: 'Registration failed' }, 500)
  }
})

// Login endpoint
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const data = loginSchema.parse(body)

    // Find user in D1 database
    const user = await c.env.DB.prepare(
      'SELECT id, username, email, password FROM users WHERE email = ?'
    ).bind(data.email).first()

    if (!user) {
      return c.json({ message: 'Invalid credentials' }, 401)
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) {
      return c.json({ message: 'Invalid credentials' }, 401)
    }

    // Generate JWT token
    const token = await sign(
      { id: user.id, username: user.username },
      c.env.JWT_SECRET || 'fallback-secret'
    )

    return c.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      token
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ message: error.errors[0].message }, 400)
    }
    console.error('Login error:', error)
    return c.json({ message: 'Login failed' }, 500)
  }
})

export { authRoutes }