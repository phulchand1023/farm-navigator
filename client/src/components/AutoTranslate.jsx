import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Simple auto-translate component that translates any text
const AutoTranslate = ({ children, fallback }) => {
  const { selectedLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [loading, setLoading] = useState(false);

  // Mock translation function (replace with actual API)
  const translateText = async (text, targetLang) => {
    if (targetLang === 'en') return text;
    
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simple mock translations for demo
    const mockTranslations = {
      'hi': {
        'Login as Guest': 'गेस्ट के रूप में लॉगिन करें',
        'or': 'या',
        'Register here': 'यहाँ रजिस्टर करें',
        'Loading market prices...': 'बाजार की कीमतें लोड हो रही हैं...',
        'Updated': 'अपडेट किया गया',
        'this week': 'इस सप्ताह',
        'Detailed Prices': 'विस्तृत कीमतें'
      }
    };

    return mockTranslations[targetLang]?.[text] || text;
  };

  useEffect(() => {
    if (selectedLanguage !== 'en' && children) {
      setLoading(true);
      translateText(children, selectedLanguage)
        .then(setTranslatedText)
        .finally(() => setLoading(false));
    } else {
      setTranslatedText(children);
    }
  }, [children, selectedLanguage]);

  if (loading) return <span className="opacity-50">...</span>;
  return translatedText;
};

export default AutoTranslate;