import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Client-side validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userType', 'authenticated');
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        navigate('/location-selection');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle Zod validation errors
      if (error.response?.status === 400 && error.response?.data?.message?.includes('ZodError')) {
        setError('Password must be at least 6 characters long');
      } else {
        setError(error.response?.data?.message || 'Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('userType', 'guest');
    navigate('/location-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <motion.div
        className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-white/20"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Farm Navigator
          </h1>
          <p className="text-gray-600">Welcome back to your farming companion</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-200"
            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In to Dashboard'
            )}
          </motion.button>
        </form>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or continue with</span>
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={handleGuestLogin}
          className="w-full mt-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-200"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue as Guest
        </motion.button>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New to Farm Navigator?{' '}
            <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-all">
              Create Account
            </Link>
          </p>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
