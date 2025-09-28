import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    farmName: '',
    farmSize: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('farmerProfile', JSON.stringify(formData));
    navigate('/language-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
          🚜 Farmer Profile Setup
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="tel"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => setFormData({...formData, contact: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Farm Name"
            value={formData.farmName}
            onChange={(e) => setFormData({...formData, farmName: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            placeholder="Farm Size (acres)"
            value={formData.farmSize}
            onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          
          <motion.button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
          >
            Continue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FarmerProfile;