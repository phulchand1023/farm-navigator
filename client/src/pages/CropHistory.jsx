import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CropHistory = () => {
  const navigate = useNavigate();
  const [cropHistory, setCropHistory] = useState({
    year1: { crop1: '', crop2: '', crop3: '' },
    year2: { crop1: '', crop2: '', crop3: '' },
    year3: { crop1: '', crop2: '', crop3: '' }
  });

  const crops = [
    'Wheat', 'Rice', 'Maize/Corn', 'Barley', 'Millet', 'Sorghum',
    'Cotton', 'Sugarcane', 'Jute', 'Flax',
    'Soybean', 'Groundnut/Peanut', 'Mustard', 'Sunflower', 'Sesame', 'Safflower',
    'Chickpea', 'Lentil', 'Black Gram', 'Green Gram', 'Pigeon Pea', 'Field Pea',
    'Potato', 'Sweet Potato', 'Onion', 'Garlic',
    'Mango', 'Banana', 'Citrus', 'Apple', 'Grapes', 'Pomegranate', 'Guava',
    'Tea', 'Coffee', 'Rubber', 'Coconut', 'Areca Nut', 'Cardamom', 'Black Pepper',
    'Turmeric', 'Ginger', 'Coriander', 'Cumin', 'Fennel'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cropHistory.year1.crop1 || !cropHistory.year2.crop1 || !cropHistory.year3.crop1) {
      alert('Please select at least one crop for each year');
      return;
    }
    localStorage.setItem('cropHistory', JSON.stringify(cropHistory));
    navigate('/irrigation-source');
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-orange-700 text-center mb-6">
          🌾 Crop History (Past 3 Years)
        </h2>
        
        <p className="text-gray-600 text-center mb-8">
          Please select the main crops you grew in the past 3 years. This helps us provide better recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              {currentYear - 2} (3 years ago) - Select up to 3 crops *
            </label>
            <div className="space-y-3">
              <select
                value={cropHistory.year1.crop1}
                onChange={(e) => setCropHistory({...cropHistory, year1: {...cropHistory.year1, crop1: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Primary crop (Required)</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <select
                value={cropHistory.year1.crop2}
                onChange={(e) => setCropHistory({...cropHistory, year1: {...cropHistory.year1, crop2: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Secondary crop (Optional)</option>
                {crops.filter(crop => crop !== cropHistory.year1.crop1).map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <select
                value={cropHistory.year1.crop3}
                onChange={(e) => setCropHistory({...cropHistory, year1: {...cropHistory.year1, crop3: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Third crop (Optional)</option>
                {crops.filter(crop => crop !== cropHistory.year1.crop1 && crop !== cropHistory.year1.crop2).map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              {currentYear - 1} (2 years ago) - Select up to 3 crops *
            </label>
            <div className="space-y-3">
              <select
                value={cropHistory.year2.crop1}
                onChange={(e) => setCropHistory({...cropHistory, year2: {...cropHistory.year2, crop1: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Primary crop (Required)</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <select
                value={cropHistory.year2.crop2}
                onChange={(e) => setCropHistory({...cropHistory, year2: {...cropHistory.year2, crop2: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Secondary crop (Optional)</option>
                {crops.filter(crop => crop !== cropHistory.year2.crop1).map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <select
                value={cropHistory.year2.crop3}
                onChange={(e) => setCropHistory({...cropHistory, year2: {...cropHistory.year2, crop3: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Third crop (Optional)</option>
                {crops.filter(crop => crop !== cropHistory.year2.crop1 && crop !== cropHistory.year2.crop2).map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              {currentYear} (Last year) - Select up to 3 crops *
            </label>
            <div className="space-y-3">
              <select
                value={cropHistory.year3.crop1}
                onChange={(e) => setCropHistory({...cropHistory, year3: {...cropHistory.year3, crop1: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Primary crop (Required)</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <select
                value={cropHistory.year3.crop2}
                onChange={(e) => setCropHistory({...cropHistory, year3: {...cropHistory.year3, crop2: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Secondary crop (Optional)</option>
                {crops.filter(crop => crop !== cropHistory.year3.crop1).map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
              <select
                value={cropHistory.year3.crop3}
                onChange={(e) => setCropHistory({...cropHistory, year3: {...cropHistory.year3, crop3: e.target.value}})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Third crop (Optional)</option>
                {crops.filter(crop => crop !== cropHistory.year3.crop1 && crop !== cropHistory.year3.crop2).map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
          </div>

          {cropHistory.year1.crop1 && cropHistory.year2.crop1 && cropHistory.year3.crop1 && (
            <motion.div
              className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-bold text-green-700 mb-2">📋 Your Crop History:</h3>
              <div className="text-sm text-green-600 space-y-2">
                <div>
                  <strong>{currentYear - 2}:</strong> {cropHistory.year1.crop1}
                  {cropHistory.year1.crop2 && `, ${cropHistory.year1.crop2}`}
                  {cropHistory.year1.crop3 && `, ${cropHistory.year1.crop3}`}
                </div>
                <div>
                  <strong>{currentYear - 1}:</strong> {cropHistory.year2.crop1}
                  {cropHistory.year2.crop2 && `, ${cropHistory.year2.crop2}`}
                  {cropHistory.year2.crop3 && `, ${cropHistory.year2.crop3}`}
                </div>
                <div>
                  <strong>{currentYear}:</strong> {cropHistory.year3.crop1}
                  {cropHistory.year3.crop2 && `, ${cropHistory.year3.crop2}`}
                  {cropHistory.year3.crop3 && `, ${cropHistory.year3.crop3}`}
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue to Irrigation Setup
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CropHistory;