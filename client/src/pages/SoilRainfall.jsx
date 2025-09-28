import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SoilRainfall = () => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);
  const [soilAnalysis, setSoilAnalysis] = useState(null);
  const [rainfallAnalysis, setRainfallAnalysis] = useState(null);

  useEffect(() => {
    const location = JSON.parse(localStorage.getItem('farmerLocation') || '{}');
    const soil = JSON.parse(localStorage.getItem('soilData') || 'null');
    const rainfall = JSON.parse(localStorage.getItem('rainfallData') || 'null');
    
    setLocationData({ location, soil, rainfall });
    
    // Process soil data
    if (soil && soil.properties) {
      const processedSoil = {
        clay: soil.properties.clay ? Math.round(soil.properties.clay.values[0] / 10) : 25,
        sand: soil.properties.sand ? Math.round(soil.properties.sand.values[0] / 10) : 45,
        silt: soil.properties.silt ? Math.round(soil.properties.silt.values[0] / 10) : 30,
        ph: soil.properties.phh2o ? (soil.properties.phh2o.values[0] / 10).toFixed(1) : '7.2'
      };
      setSoilAnalysis(processedSoil);
    }
    
    // Process rainfall data
    if (rainfall && rainfall.properties && rainfall.properties.parameter) {
      const precipData = rainfall.properties.parameter.PRECTOTCORR;
      if (precipData) {
        const values = Object.values(precipData);
        const totalRainfall = values.reduce((sum, val) => sum + val, 0);
        const avgDaily = totalRainfall / values.length;
        
        setRainfallAnalysis({
          annual: Math.round(totalRainfall),
          avgDaily: avgDaily.toFixed(1),
          pattern: totalRainfall > 1000 ? 'High Rainfall Zone' : totalRainfall > 600 ? 'Moderate Rainfall Zone' : 'Low Rainfall Zone'
        });
      }
    }
  }, []);

  const handleContinue = () => {
    navigate('/crop-history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-700 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🌍 Location Analysis - {locationData?.location?.district || 'Your Location'}, {locationData?.location?.state || 'India'}
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Based on your location, here's the soil and rainfall analysis for better farming decisions.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Soil Analysis */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-yellow-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl font-bold text-yellow-800">Soil Analysis</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">Soil Type</h3>
                <p className="text-yellow-700">Alluvial Soil - Rich in nutrients</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">Composition</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">Clay</p>
                    <p className="text-yellow-600">{soilAnalysis?.clay || 25}%</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Sand</p>
                    <p className="text-yellow-600">{soilAnalysis?.sand || 45}%</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Silt</p>
                    <p className="text-yellow-600">{soilAnalysis?.silt || 30}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">pH Level</h3>
                <p className="text-yellow-700">{soilAnalysis?.ph || '7.2'} - {(soilAnalysis?.ph || 7.2) > 7 ? 'Slightly Alkaline' : (soilAnalysis?.ph || 7.2) < 7 ? 'Slightly Acidic' : 'Neutral'} (Good for most crops)</p>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-4">
                {locationData?.soil ? 'Data source: SoilGrids API (Live Data)' : 'Data source: Default values for region'}
              </div>
            </div>
          </motion.div>

          {/* Rainfall Analysis */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🌧️</div>
              <h2 className="text-2xl font-bold text-blue-800">Rainfall Pattern</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Climate Zone</h3>
                <p className="text-blue-700">{rainfallAnalysis?.pattern || 'Monsoon Zone'} - {rainfallAnalysis?.annual || '800-1000'}mm annually</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Seasonal Pattern</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Peak Season:</span>
                    <span className="text-blue-600">July - September</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Moderate:</span>
                    <span className="text-blue-600">April - June</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Dry Period:</span>
                    <span className="text-blue-600">November - March</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Irrigation Need</h3>
                <p className="text-blue-700">Moderate - Supplemental irrigation recommended</p>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-4">
                {locationData?.rainfall ? 'Data source: NASA POWER API (Live Data)' : 'Data source: Default values for region'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-green-700 text-center mb-4">
            🎯 Quick Recommendations
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🌾</div>
              <p className="font-semibold">Best Crops</p>
              <p className="text-sm text-gray-600">Wheat, Rice, Sugarcane</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">💧</div>
              <p className="font-semibold">Irrigation</p>
              <p className="text-sm text-gray-600">Drip/Sprinkler system</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-2">🌱</div>
              <p className="font-semibold">Soil Health</p>
              <p className="text-sm text-gray-600">Compost, FYM, Vermicompost, Green manure</p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <motion.button
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg font-semibold text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Crop History →
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SoilRainfall;