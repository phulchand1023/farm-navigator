const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error(
    "Missing JWT_SECRET in environment variables. Check your .env file!"
  );
}

const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };
