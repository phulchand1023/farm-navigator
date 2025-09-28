import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CropInfo = () => {
  const navigate = useNavigate();
  const [cropData, setCropData] = useState({
    lastCrop: '',
    landSize: '',
    irrigation: '',
    experience: '',
    yieldQuality: ''
  });

  const crops = ['Wheat', 'Rice', 'Corn', 'Cotton', 'Sugarcane'];
  const irrigationSources = ['Tube Well', 'Canal', 'Rain Fed', 'Drip Irrigation'];
  const experienceLevels = ['Beginner (0-2 years)', 'Intermediate (3-10 years)', 'Expert (10+ years)'];

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('cropInfo', JSON.stringify(cropData));
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-yellow-700 text-center mb-8">
          🌾 Crop Information
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={cropData.lastCrop}
            onChange={(e) => setCropData({...cropData, lastCrop: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Last Year's Crop</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Land Size (acres)"
            value={cropData.landSize}
            onChange={(e) => setCropData({...cropData, landSize: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          />

          <select
            value={cropData.irrigation}
            onChange={(e) => setCropData({...cropData, irrigation: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Irrigation Source</option>
            {irrigationSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <select
            value={cropData.experience}
            onChange={(e) => setCropData({...cropData, experience: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="">Experience Level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Last Year's Yield Quality:</label>
            {['Good', 'Average', 'Poor'].map(quality => (
              <label key={quality} className="flex items-center">
                <input
                  type="radio"
                  name="yieldQuality"
                  value={quality}
                  onChange={(e) => setCropData({...cropData, yieldQuality: e.target.value})}
                  className="mr-2"
                  required
                />
                {quality}
              </label>
            ))}
          </div>
          
          <motion.button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
          >
            Get Recommendations
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CropInfo;