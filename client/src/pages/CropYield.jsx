import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const CropYield = () => {
  const navigate = useNavigate();
  const [yieldRating, setYieldRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!yieldRating) {
      alert("Please select your crop yield rating");
      return;
    }
    localStorage.setItem("cropYield", yieldRating);
    navigate("/farm-size");
  };

  const yieldOptions = [
    {
      value: "good",
      title: "Good Yield",
      description: "Above average production, satisfied with harvest",
      icon: "🌟",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      textColor: "text-green-700",
    },
    {
      value: "average",
      title: "Average Yield",
      description: "Normal production, met expectations",
      icon: "⚖️",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      value: "poor",
      title: "Poor Yield",
      description: "Below average production, faced challenges",
      icon: "📉",
      color: "bg-red-50 border-red-200 hover:bg-red-100",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          📊 Last Year's Crop Yield
        </h2>

        <p className="text-gray-600 text-center mb-8">
          How would you rate your overall crop yield performance last year? This
          helps us understand your farming success.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {yieldOptions.map((option) => (
              <motion.label
                key={option.value}
                className={`block cursor-pointer p-6 rounded-xl border-2 transition-all ${
                  yieldRating === option.value
                    ? `${option.color} border-opacity-100 shadow-md`
                    : `${option.color} border-opacity-50`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="yieldRating"
                  value={option.value}
                  checked={yieldRating === option.value}
                  onChange={(e) => setYieldRating(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${option.textColor}`}>
                      {option.title}
                    </h3>
                    <p className={`text-sm ${option.textColor} opacity-80`}>
                      {option.description}
                    </p>
                  </div>
                  {yieldRating === option.value && (
                    <div className={`text-2xl ${option.textColor}`}>✓</div>
                  )}
                </div>
              </motion.label>
            ))}
          </div>

          {yieldRating && (
            <motion.div
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-bold text-blue-700 mb-2">
                📋 Your Assessment:
              </h3>
              <p className="text-sm text-blue-600">
                Last year's yield:{" "}
                <strong>
                  {yieldOptions.find((opt) => opt.value === yieldRating)?.title}
                </strong>
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg"
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

export default CropYield;
