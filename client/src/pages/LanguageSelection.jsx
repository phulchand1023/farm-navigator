import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { voiceFeedback } from '../utils/voiceAssistant';
import { qt } from '../utils/quickTranslate';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  
  useEffect(() => {
    voiceFeedback.onPageLoad('Select your preferred language', 'en');
  }, []);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  ];

  const selectLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    const langName = languages.find(l => l.code === langCode)?.name || langCode;
    voiceFeedback.onSelect(`Language selected: ${langName}`, langCode);
    navigate('/location-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
          🌐 Select Your Language
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              onMouseEnter={() => voiceFeedback.onFocus(lang.name, lang.code)}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{lang.flag}</div>
              <div className="font-semibold">{lang.name}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;