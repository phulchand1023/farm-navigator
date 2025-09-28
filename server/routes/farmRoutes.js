const express = require("express");
const {
  createFarm,
  getFarms,
  updateFarm,
  deleteFarm,
} = require("../controllers/farmController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Apply JWT auth middleware to all farm routes
router.use(authMiddleware);

// @route   POST /api/farm
// @desc    Create a new farm
router.post("/", createFarm);

// @route   GET /api/farm
// @desc    Get all farms of the logged-in user
router.get("/", getFarms);

// @route   PUT /api/farm/:id
// @desc    Update a farm by ID
router.put("/:id", updateFarm);

// @route   DELETE /api/farm/:id
// @desc    Delete a farm by ID
router.delete("/:id", deleteFarm);

module.exports = router;
