// A simple yield calculation utility (can be improved later)
const calculateYield = ({
  cropName,
  irrigationLiters,
  fertilizerKg,
  nasaDataSnapshot,
}) => {
  let baseYield = 1000; // base yield in kg/ha for demonstration

  // Apply crop-specific adjustments (very simplistic for now)
  if (cropName.includes("wheat")) baseYield = 3000;
  if (cropName.includes("rice")) baseYield = 4000;
  if (cropName.includes("maize")) baseYield = 3500;

  // Adjust with irrigation
  const irrigationEffect = irrigationLiters / 1000; // scale factor
  // Adjust with fertilizer
  const fertilizerEffect = fertilizerKg / 100; // scale factor

  // Environmental effect from NASA snapshot (placeholder)
  let climateEffect = 1;
  if (nasaDataSnapshot?.precipitationMm < 50) climateEffect = 0.8; // drought
  if (nasaDataSnapshot?.lstDayC > 40) climateEffect = 0.7; // heat stress

  // Calculate expected yield
  const expectedYieldKg = Math.round(
    baseYield *
      (1 + 0.1 * irrigationEffect + 0.05 * fertilizerEffect) *
      climateEffect
  );

  return {
    expectedYieldKg,
    waterUseEfficiency: irrigationLiters
      ? expectedYieldKg / irrigationLiters
      : null,
    soilHealthDelta: fertilizerKg > 500 ? -0.2 : 0.1, // too much fert → bad soil health
    pollutionRiskScore: fertilizerKg > 300 ? 80 : 30,
    sustainabilityScore: Math.max(0, 100 - fertilizerKg / 10),
  };
};

module.exports = calculateYield;
