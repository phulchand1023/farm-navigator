const { z } = require("zod");

const decisionSchema = z.object({
  cropName: z.string().min(1, "Crop name is required"),
  irrigationLiters: z
    .number()
    .min(0)
    .max(1_000_000, "Invalid irrigation amount"),
  fertilizerKg: z.number().min(0).max(10_000, "Invalid fertilizer amount"),
  pesticideApplied: z.boolean().optional(),
});

module.exports = { decisionSchema };
