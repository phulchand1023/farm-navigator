import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { voiceAssistant } from '../utils/voiceAssistant';
import { useLanguage } from '../context/LanguageContext';
import { qt } from '../utils/quickTranslate';

const VoiceToggle = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const { selectedLanguage } = useLanguage();

  const toggleVoice = () => {
    const newState = voiceAssistant.toggle();
    setIsEnabled(newState);
    
    // Provide audio feedback
    const message = newState 
      ? qt('voice_enabled', selectedLanguage) || 'Voice assistant enabled'
      : qt('voice_disabled', selectedLanguage) || 'Voice assistant disabled';
    
    if (newState) {
      setTimeout(() => voiceAssistant.speak(message, selectedLanguage), 100);
    }
  };

  return (
    <motion.button
      onClick={toggleVoice}
      className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 ${
        isEnabled 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-gray-400 hover:bg-gray-500 text-gray-200'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isEnabled ? 'Voice Assistant On' : 'Voice Assistant Off'}
    >
      {isEnabled ? '🔊' : '🔇'}
    </motion.button>
  );
};

export default VoiceToggle;