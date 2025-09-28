// Translation service using Google Translate API
class TranslationService {
  constructor() {
    this.cache = new Map();
    this.apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with actual API key
  }

  // Language code mapping
  getLanguageCode(lang) {
    const langMap = {
      'en': 'en',
      'hi': 'hi',
      'pa': 'pa',
      'te': 'te', 
      'mr': 'mr',
      'gu': 'gu',
      'ml': 'ml',
      'bn': 'bn',
      'ta': 'ta',
      'kn': 'kn',
      'or': 'or',
      'as': 'as',
      'ur': 'ur',
      'sa': 'sa',
      'sd': 'sd'
    };
    return langMap[lang] || 'en';
  }

  // Cache key generator
  getCacheKey(text, targetLang) {
    return `${text}_${targetLang}`;
  }

  // Translate single text
  async translateText(text, targetLang = 'en') {
    if (targetLang === 'en') return text;
    
    const cacheKey = this.getCacheKey(text, targetLang);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Using Google Translate API
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: this.getLanguageCode(targetLang),
          source: 'en',
          format: 'text'
        })
      });

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      this.cache.set(cacheKey, translatedText);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  }

  // Translate multiple texts at once
  async translateBatch(texts, targetLang = 'en') {
    if (targetLang === 'en') return texts;

    try {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: texts,
          target: this.getLanguageCode(targetLang),
          source: 'en',
          format: 'text'
        })
      });

      const data = await response.json();
      return data.data.translations.map(t => t.translatedText);
    } catch (error) {
      console.error('Batch translation error:', error);
      return texts; // Fallback to original texts
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

// Create singleton instance
const translationService = new TranslationService();

// Enhanced translation function with API fallback
export const translateWithAPI = async (key, language = 'en', fallbackText = null) => {
  // First try static translations
  const staticTranslation = t(key, language);
  if (staticTranslation !== key) {
    return staticTranslation;
  }

  // If no static translation, use API
  const textToTranslate = fallbackText || key;
  return await translationService.translateText(textToTranslate, language);
};

// Batch translate function
export const translateBatch = async (texts, language = 'en') => {
  return await translationService.translateBatch(texts, language);
};

// Auto-translate component wrapper
export const AutoTranslate = ({ text, language, children, fallback }) => {
  const [translatedText, setTranslatedText] = React.useState(text);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (language !== 'en' && text) {
      setLoading(true);
      translateWithAPI(text, language, fallback)
        .then(setTranslatedText)
        .finally(() => setLoading(false));
    }
  }, [text, language, fallback]);

  if (loading) return <span>...</span>;
  return children ? children(translatedText) : translatedText;
};

export default translationService;