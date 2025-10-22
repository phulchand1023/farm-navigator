import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/client";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Client-side validation
    if (form.username.length < 3) {
      setError('Username must be at least 3 characters long');
      setLoading(false);
      return;
    }
    
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      await api.post("/auth/register", form);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Join Farm Navigator
          </h1>
          <p className="text-gray-600">
            Start your smart farming journey with NASA data
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-6">
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            {/* Username Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/50"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                disabled={loading}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/50"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                disabled={loading}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white/50"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                disabled={loading}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Create Account</span>
              )}
            </motion.button>
          </div>

          {/* Login Link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.form>

        {/* Features */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-green-200">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-700 font-medium">NASA Data</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-700 font-medium">AI Insights</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-200">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-700 font-medium">Multi-Language</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Success Popup */}
      {showSuccess && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Account Created!
            </h3>
            <p className="text-gray-600 mb-4">
              Welcome to Farm Navigator! Redirecting to login...
            </p>
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
