const { z } = require("zod");

const farmSchema = z.object({
  name: z.string().min(2, "Farm name must be at least 2 characters"),
  location: z.object({
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    lng: z
      .number()
      .min(-180)
      .max(180, "Longitude must be between -180 and 180"),
  }),
  areaHa: z.number().min(0.01, "Farm area must be greater than 0"),
  soilType: z.enum(["sandy", "loamy", "clayey", "silty", "peaty", "chalky"]),
  irrigationMethod: z.enum(["drip", "sprinkler", "flood", "rainfed"]),
  notes: z.string().optional(),
});

// For partial updates (PUT)
const farmUpdateSchema = farmSchema.partial();

module.exports = { farmSchema, farmUpdateSchema };
