import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import all translation files
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import pa from "./locales/pa.json"; // Punjabi
import te from "./locales/te.json"; // Telugu
import mr from "./locales/mr.json"; // Marathi
import gu from "./locales/gu.json"; // Gujarati
import ml from "./locales/ml.json"; // Malayalam
import bn from "./locales/bn.json"; // Bangla
import or from "./locales/or.json"; // Odia

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    pa: { translation: pa },
    te: { translation: te },
    mr: { translation: mr },
    gu: { translation: gu },
    ml: { translation: ml },
    bn: { translation: bn },
    or: { translation: or },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
