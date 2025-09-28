import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      crop: 'Wheat',
      profit: '₹45,000',
      roi: '65%',
      season: 'Rabi',
      icon: '🌾'
    },
    {
      crop: 'Mustard',
      profit: '₹38,000',
      roi: '58%',
      season: 'Rabi',
      icon: '🌻'
    },
    {
      crop: 'Barley',
      profit: '₹32,000',
      roi: '52%',
      season: 'Rabi',
      icon: '🌾'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-purple-700 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎯 Crop Recommendations
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.crop}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl text-center mb-4">{rec.icon}</div>
              <h3 className="text-xl font-bold text-center mb-2">{rec.crop}</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Expected Profit:</strong> {rec.profit}</p>
                <p><strong>ROI:</strong> {rec.roi}</p>
                <p><strong>Season:</strong> {rec.season}</p>
              </div>
              <motion.button
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/main-dashboard')}
              >
                Select This Crop
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold mr-4"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/main-dashboard')}
          >
            Continue to Dashboard
          </motion.button>
          <motion.button
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Browse More Options
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;