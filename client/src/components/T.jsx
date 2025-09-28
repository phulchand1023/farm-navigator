import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';

// Quick translation component
const T = ({ children, k }) => {
  const { selectedLanguage } = useLanguage();
  
  // If k prop is provided, use it as translation key
  if (k) {
    return t(k, selectedLanguage) || children || k;
  }
  
  // Otherwise try to translate the children text
  const key = children?.toLowerCase()?.replace(/\s+/g, '_');
  return t(key, selectedLanguage) || children;
};

export default T;