const axios = require("axios");
const logger = require("../utils/logger");

const NASA_API_URL =
  process.env.NASA_API_URL || "https://power.larc.nasa.gov/api/temporal/daily";
const NASA_API_KEY = process.env.NASA_API_KEY || ""; // some datasets may need this

/**
 * Fetch NASA POWER data for a given location and time range
 * @param {Object} params
 * @param {number} params.lat - Latitude (-90 to 90)
 * @param {number} params.lng - Longitude (-180 to 180)
 * @param {string} params.start - Start date (YYYYMMDD)
 * @param {string} params.end - End date (YYYYMMDD)
 * @param {Array<string>} params.parameters - NASA parameters (e.g., ["T2M", "PRECTOTCORR"])
 */
const fetchNasaData = async ({ lat, lng, start, end, parameters }) => {
  try {
    const url = `${NASA_API_URL}?latitude=${lat}&longitude=${lng}&start=${start}&end=${end}&parameters=${parameters.join(
      ","
    )}&format=JSON`;

    logger.info(`Fetching NASA data: ${url}`);

    const { data } = await axios.get(url);

    if (!data?.properties?.parameter) {
      throw new Error("Invalid NASA API response");
    }

    return data.properties.parameter;
  } catch (err) {
    logger.error("NASA API error:", err.message);
    throw new Error("Failed to fetch NASA data");
  }
};

module.exports = { fetchNasaData };
