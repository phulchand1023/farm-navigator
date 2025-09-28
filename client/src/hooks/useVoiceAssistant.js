import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { voiceFeedback } from '../utils/voiceAssistant';

// Custom hook to add voice assistance to any page
export const useVoiceAssistant = (pageTitle, options = {}) => {
  const { selectedLanguage } = useLanguage();
  
  useEffect(() => {
    if (pageTitle && !options.skipWelcome) {
      voiceFeedback.onPageLoad(pageTitle, selectedLanguage);
    }
  }, [pageTitle, selectedLanguage, options.skipWelcome]);

  // Helper functions for common voice interactions
  const voiceHelpers = {
    announcePageLoad: (title) => {
      voiceFeedback.onPageLoad(title, selectedLanguage);
    },
    
    announceSelection: (text) => {
      voiceFeedback.onSelect(text, selectedLanguage);
    },
    
    announceFocus: (text) => {
      voiceFeedback.onFocus(text, selectedLanguage);
    },
    
    announceSuccess: (text) => {
      voiceFeedback.onSuccess(text, selectedLanguage);
    },
    
    announceValidation: (text) => {
      voiceFeedback.onValidation(text, selectedLanguage);
    }
  };

  return voiceHelpers;
};