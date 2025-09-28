const Farm = require("../models/Farm");
const { farmSchema, farmUpdateSchema } = require("../validators/farmSchema");

// @desc    Create a new farm
// @route   POST /api/farm
// @access  Private
const createFarm = async (req, res, next) => {
  try {
    const data = farmSchema.parse(req.body);

    const farm = await Farm.create({ ...data, owner: req.user.id });
    res.status(201).json({ message: "Farm created", farm });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all farms for the logged-in user
// @route   GET /api/farm
// @access  Private
const getFarms = async (req, res, next) => {
  try {
    const farms = await Farm.find({ owner: req.user.id });
    res.json(farms);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a farm
// @route   PUT /api/farm/:id
// @access  Private
const updateFarm = async (req, res, next) => {
  try {
    const data = farmUpdateSchema.parse(req.body);

    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.json({ message: "Farm updated", farm });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a farm
// @route   DELETE /api/farm/:id
// @access  Private
const deleteFarm = async (req, res, next) => {
  try {
    const farm = await Farm.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.json({ message: "Farm deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createFarm, getFarms, updateFarm, deleteFarm };
