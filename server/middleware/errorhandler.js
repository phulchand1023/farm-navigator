// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  // Handle Zod validation errors
  if (err.name === "ZodError" || err.errors) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors || err.issues,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
