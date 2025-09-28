import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FarmSize = () => {
  const navigate = useNavigate();
  const [farmSize, setFarmSize] = useState('');

  const farmSizeOptions = [
    { value: 'less-than-1', label: 'Less than 1 acre', icon: '🏡', description: 'Small scale farming' },
    { value: '1-2', label: '1-2 acres', icon: '🌾', description: 'Small to medium farm' },
    { value: '2-5', label: '2-5 acres', icon: '🚜', description: 'Medium scale farming' },
    { value: '5-10', label: '5-10 acres', icon: '🌻', description: 'Large scale farming' },
    { value: 'more-than-10', label: 'More than 10 acres', icon: '🏞️', description: 'Commercial farming' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!farmSize) {
      alert('Please select your farm size');
      return;
    }
    localStorage.setItem('farmSize', farmSize);
    navigate('/main-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          📏 Farm Size Information
        </h2>
        
        <p className="text-gray-600 text-center mb-8">
          Please select your total farm size. This helps us provide recommendations suitable for your farming scale.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {farmSizeOptions.map((option) => (
              <motion.label
                key={option.value}
                className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${
                  farmSize === option.value 
                    ? 'border-green-500 bg-green-50 shadow-md' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="farmSize"
                  value={option.value}
                  checked={farmSize === option.value}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                  {farmSize === option.value && (
                    <div className="text-2xl text-green-600">✓</div>
                  )}
                </div>
              </motion.label>
            ))}
          </div>

          {farmSize && (
            <motion.div
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-bold text-blue-700 mb-2">📋 Your Farm Details:</h3>
              <p className="text-sm text-blue-600">
                Farm Size: <strong>{farmSizeOptions.find(opt => opt.value === farmSize)?.label}</strong>
              </p>
              <p className="text-xs text-blue-500 mt-1">
                We'll customize recommendations based on your farm scale
              </p>
            </motion.div>
          )}
          
          <motion.button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg mt-6"
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

export default FarmSize;