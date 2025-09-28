const FarmDecision = require("../models/FarmDecision");
const { decisionSchema } = require("../validators/decisionSchema");
const calculateYield = require("../utils/calculateYield");

// @desc    Record a new farming decision
// @route   POST /api/decision
// @access  Private
const makeDecision = async (req, res, next) => {
  try {
    const data = decisionSchema.parse(req.body);

    // Simulate outcome
    const outcome = calculateYield({
      cropName: data.cropName,
      irrigationLiters: data.irrigationLiters,
      fertilizerKg: data.fertilizerKg,
      nasaDataSnapshot: data.nasaDataSnapshot || {},
    });

    const decision = await FarmDecision.create({
      user: req.user.id,
      ...data,
      outcome,
    });

    res.status(201).json({
      message: "Decision recorded",
      decision,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all decisions of the logged-in user
// @route   GET /api/decision
// @access  Private
const getDecisions = async (req, res, next) => {
  try {
    const decisions = await FarmDecision.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(decisions);
  } catch (err) {
    next(err);
  }
};

module.exports = { makeDecision, getDecisions };
