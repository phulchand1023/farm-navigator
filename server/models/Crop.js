const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: ["cereal", "pulse", "oilseed", "vegetable", "fruit", "other"],
      default: "other",
    },
    durationDays: { type: Number, min: 30, max: 540 }, // sow-to-harvest
    waterNeedMmPerSeason: { type: Number, min: 0, max: 4000 },
    nitrogenNeedKgPerHa: { type: Number, min: 0, max: 400 },
    optimalTempC: {
      min: { type: Number, default: 10 },
      max: { type: Number, default: 35 },
    },
    kc: { type: Number, min: 0, max: 2, default: 1 }, // crop coefficient
    description: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Crop", cropSchema);
