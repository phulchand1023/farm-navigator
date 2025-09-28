const mongoose = require("mongoose");

const nasaCacheSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // unique query signature
    query: { type: Object, required: true }, // query params
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    fetchedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false }
);

nasaCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("NasaCache", nasaCacheSchema);
