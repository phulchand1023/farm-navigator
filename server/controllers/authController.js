const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/crypto");
const { generateToken } = require("../utils/jwt");
const { registerSchema, loginSchema } = require("../validators/userSchema");

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    // Check for existing email
    const existingEmail = await User.findOne({ email: data.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username: data.username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // Hash password
    const hashed = await hashPassword(data.password);

    // Create user
    const user = await User.create({
      username: data.username,
      email: data.email,
      password: hashed,
    });

    // Generate token
    const token = generateToken({ id: user._id });

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    // Handle Zod validation errors
    if (err.name === 'ZodError') {
      const errorMessage = err.errors[0]?.message || 'Validation failed';
      return res.status(400).json({ message: errorMessage });
    }
    // Handle duplicate key error from MongoDB
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    next(err);
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);

    // Find user by email
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken({ id: user._id });

    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    // Handle Zod validation errors
    if (err.name === 'ZodError') {
      const errorMessage = err.errors[0]?.message || 'Validation failed';
      return res.status(400).json({ message: errorMessage });
    }
    next(err);
  }
};

module.exports = { register, login };
