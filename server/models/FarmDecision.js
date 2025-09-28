const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm" },
    cropName: { type: String, required: true, trim: true, lowercase: true },
    irrigationLiters: { type: Number, required: true, min: 0, max: 1_000_000 },
    fertilizerKg: { type: Number, required: true, min: 0, max: 10_000 },
    pesticideApplied: { type: Boolean, default: false },
    decisionDate: { type: Date, default: Date.now },

    nasaDataSnapshot: {
      precipitationMm: Number,
      soilMoistureVolumetric: Number,
      lstDayC: Number,
      lstNightC: Number,
      ndvi: Number,
      et0_mm: Number,
      weather: {
        tminC: Number,
        tmaxC: Number,
        humidityPct: Number,
        windMps: Number,
      },
      sourceMeta: {
        tiles: [String],
        datasets: [String],
        fetchedAt: { type: Date, default: Date.now },
      },
    },

    outcome: {
      expectedYieldKg: { type: Number, min: 0 },
      waterUseEfficiency: Number,
      soilHealthDelta: Number,
      pollutionRiskScore: { type: Number, min: 0, max: 100 },
      sustainabilityScore: { type: Number, min: 0, max: 100 },
      notes: String,
    },

    status: {
      type: String,
      enum: ["pending", "simulated", "finalized"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("FarmDecision", decisionSchema);
