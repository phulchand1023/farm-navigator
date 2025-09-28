const express = require("express");
const {
  makeDecision,
  getDecisions,
} = require("../controllers/decisionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All decision routes require auth
router.use(authMiddleware);

router.post("/", makeDecision);
router.get("/", getDecisions);

module.exports = router;
