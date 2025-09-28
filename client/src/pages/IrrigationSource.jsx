import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IrrigationSource = () => {
  const navigate = useNavigate();
  const [irrigationSource, setIrrigationSource] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!irrigationSource) {
      alert('Please select your irrigation source');
      return;
    }
    localStorage.setItem('irrigationSource', irrigationSource);
    navigate('/main-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 flex items-center justify-center px-6 pt-32">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          💧 Irrigation Source
        </h2>
        
        <p className="text-gray-600 text-center mb-8">
          Please select your main source of irrigation. This helps us provide better water management recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Main Source of Irrigation *
            </label>
            <select
              value={irrigationSource}
              onChange={(e) => setIrrigationSource(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select your main irrigation source</option>
              <option value="tubewell">🏗️ Tubewell/Borewell</option>
              <option value="canal">🌊 Canal Irrigation</option>
              <option value="river">🏞️ River/Stream</option>
              <option value="pond">🏊 Farm Pond/Tank</option>
              <option value="rainwater">☔ Rainwater Harvesting</option>
              <option value="drip">💧 Drip Irrigation System</option>
              <option value="sprinkler">🚿 Sprinkler System</option>
              <option value="rainfed">🌧️ Rainfed (No Irrigation)</option>
            </select>
          </div>

          {irrigationSource && (
            <motion.div
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-bold text-blue-700 mb-2">✅ Selected:</h3>
              <p className="text-blue-600">
                {irrigationSource === 'tubewell' && '🏗️ Tubewell/Borewell'}
                {irrigationSource === 'canal' && '🌊 Canal Irrigation'}
                {irrigationSource === 'river' && '🏞️ River/Stream'}
                {irrigationSource === 'pond' && '🏊 Farm Pond/Tank'}
                {irrigationSource === 'rainwater' && '☔ Rainwater Harvesting'}
                {irrigationSource === 'drip' && '💧 Drip Irrigation System'}
                {irrigationSource === 'sprinkler' && '🚿 Sprinkler System'}
                {irrigationSource === 'rainfed' && '🌧️ Rainfed (No Irrigation)'}
              </p>
            </motion.div>
          )}
          
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue to Dashboard
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default IrrigationSource;