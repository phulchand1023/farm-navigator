const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const farmRoutes = require("./routes/farmRoutes");
const decisionRoutes = require("./routes/decisionRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to NASA Farm Navigator API");
});

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/decision", decisionRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
