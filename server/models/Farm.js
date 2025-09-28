const mongoose = require("mongoose");

const SOIL_TYPES = ["sandy", "loamy", "clayey", "silty", "peaty", "chalky"];
const IRRIGATION_METHODS = ["drip", "sprinkler", "flood", "rainfed"];

const farmSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    location: {
      lat: { type: Number, required: true, min: -90, max: 90 },
      lng: { type: Number, required: true, min: -180, max: 180 },
    },
    areaHa: { type: Number, required: true, min: 0.01 }, // hectares
    soilType: { type: String, enum: SOIL_TYPES, required: true },
    irrigationMethod: {
      type: String,
      enum: IRRIGATION_METHODS,
      default: "rainfed",
    },
    notes: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Farm", farmSchema);
