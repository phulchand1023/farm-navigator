import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useVoiceAssistant } from "../hooks/useVoiceAssistant";

// Mock translation function (replace with react-i18next later)
const t = (key) => {
  const translations = {
    dashboard_welcome: "Welcome to Your Farm Dashboard",
    language: "Language",
    dashboard_description:
      "Leverage NASA's satellite data to make informed decisions, improve crop yield, and practice sustainable agriculture. Manage your farms, analyze data, and view detailed reports all in one place.",
    farms: "Manage Farms",
    dashboard_farms: "View, add, or edit your farm plots.",
    decisions: "Farming Decisions",
    dashboard_decisions: "Get AI-powered planting and irrigation advice.",
    reports: "View Reports",
    dashboard_reports: "Analyze yield history and soil data.",
  };
  return translations[key] || key;
};

// =========================
// Animated Hero Component
// =========================
const AnimatedHero = ({ parallaxX, parallaxY }) => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const satelliteVariants = {
    initial: { x: "-100vw", y: 0 },
    animate: {
      x: "100vw",
      y: [0, -20, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  const dataStreamVariants = {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: "100%",
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 1,
      },
    },
  };

  return (
    <motion.div
      className="relative h-64 bg-green-200 rounded-2xl overflow-hidden mb-12 flex items-center justify-center p-4 shadow-lg"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{
        transform: `translate(${parallaxX * 0.05}px, ${parallaxY * 0.05}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Satellite Animation */}
      <motion.div
        className="absolute text-5xl"
        variants={satelliteVariants}
        initial="initial"
        animate="animate"
      >
        🛰️
      </motion.div>

      {/* Data Streams */}
      <motion.div
        className="absolute w-1 bg-cyan-300"
        variants={dataStreamVariants}
        initial="initial"
        animate="animate"
        style={{ left: "30%" }}
      />
      <motion.div
        className="absolute w-1 bg-cyan-300"
        variants={dataStreamVariants}
        initial="initial"
        animate="animate"
        style={{ left: "50%" }}
      />
      <motion.div
        className="absolute w-1 bg-cyan-300"
        variants={dataStreamVariants}
        initial="initial"
        animate="animate"
        style={{ left: "70%" }}
      />

      {/* Hero Text */}
      <motion.h2
        variants={itemVariants}
        initial="initial"
        animate="animate"
        className="text-3xl md:text-5xl font-bold text-green-800 text-center z-10"
      >
        Connecting <span className="text-blue-600">NASA Data</span>
        <br /> with <span className="text-yellow-700">Agriculture</span>
      </motion.h2>
    </motion.div>
  );
};

// =========================
// Dashboard Component
// =========================
export default function Dashboard() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [location, setLocation] = useState({ state: '', district: '', village: '' });
  const voice = useVoiceAssistant('Welcome to Farm Navigator Dashboard');
  
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'or', name: 'Odia', native: 'ଓଡିଆ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृत' },
    { code: 'sd', name: 'Sindhi', native: 'سنڌي' }
  ];
  
  const states = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Gujarat', 'Rajasthan'];
  const districts = ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'];
  const villages = ['Village A', 'Village B', 'Village C', 'Village D'];

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX - innerWidth / 2;
    const y = e.clientY - innerHeight / 2;
    setParallax({ x, y });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 px-6 py-10 font-sans"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedHero parallaxX={parallax.x} parallaxY={parallax.y} />

        {/* Language Selection Prompt - Show at top if no language selected */}
        {!selectedLanguage && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-3xl font-bold text-red-600 mb-4">
              ⬆️ Please select your language first to continue
            </p>
          </motion.div>
        )}

        <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
          {t("dashboard_description")}
        </p>

        {/* Language Selection */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-blue-700 text-center mb-4">
            🌐 Select Your Language / अपनी भाषा चुनें
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang.code);
                  voice.announceSelection(`Language selected: ${lang.native}`);
                }}
                onMouseEnter={() => voice.announceFocus(lang.native)}
                className={`p-3 border-2 rounded-lg text-center transition-all ${
                  selectedLanguage === lang.code
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-semibold text-sm">{lang.name}</div>
                <div className="text-xs mt-1">{lang.native}</div>
              </motion.button>
            ))}
          </div>
          
          {selectedLanguage && (
            <motion.div
              className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg text-center border border-blue-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-blue-700 font-semibold mb-2">
                ✓ Language Selected: {languages.find(l => l.code === selectedLanguage)?.native}
              </p>
              <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                <span>🌤️ 28°C</span>
                <span>📍 India</span>
                <span>🌾 Farming Season Active</span>
              </div>
            </motion.div>
          )}
        </motion.div>



        {/* Continue Button - Only show if language is selected */}
        {selectedLanguage && (
          <div className="flex justify-center mb-12">
            <Link to="/login">
              <motion.button
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg font-semibold shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => voice.announceSelection('Continuing to login')}
                onMouseEnter={() => voice.announceFocus('Continue button')}
              >
                Continue →
              </motion.button>
            </Link>
          </div>
        )}
        



      </div>
    </div>
  );
}
