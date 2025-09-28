import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { useSideMenu } from '../context/SideMenuContext';
import { qt } from '../utils/quickTranslate';
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const { setSidePanel } = useSideMenu();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const showMenuButton = ['/main-dashboard', '/soil-test', '/schemes', '/expert', '/rental', '/insurance', '/emergency', '/market-prices', '/training'].includes(location.pathname);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "bn", name: "বাংলা (Bangla)" },
    { code: "or", name: "ଓଡିଆ (Odia)" },
  ];

  const changeLang = (lng) => {
    setSelectedLanguage(lng);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown animation
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  // Nav animations
  const navLinkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const NavLink = ({ to, children }) => (
    <motion.div variants={navLinkVariants} className="relative">
      <Link
        to={to}
        className="block px-2 py-1 text-white hover:text-yellow-300 transition-colors duration-300"
      >
        {children}
      </Link>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-yellow-300 origin-center"
        style={{ width: "100%", scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  return (
    <nav className="bg-green-700 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      {/* Left: Logo and Menu */}
      <motion.div
        className="flex items-center space-x-4"
        initial="hidden"
        animate="visible"
      >
        {showMenuButton && (
          <motion.button
            onClick={() => setSidePanel(true)}
            className="text-white hover:text-yellow-300 bg-green-600 hover:bg-green-500 px-3 py-2 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
          >
            ☰ Menu
          </motion.button>
        )}
        <motion.div variants={navLinkVariants} whileHover={{ scale: 1.05 }}>
          <Link
            to="/"
            className="text-xl font-bold hover:text-yellow-300 transition-colors duration-300"
          >
            🌾 Farm Navigator
          </Link>
        </motion.div>
      </motion.div>

      {/* Right: Auth Links + Language Dropdown */}
      <div className="flex items-center space-x-4">
        <motion.div
          className="flex items-center space-x-4"
          initial="hidden"
          animate="visible"
        >
          <NavLink to="/register">{qt('register', selectedLanguage) || 'Register'}</NavLink>
          <NavLink to="/login">{qt('login', selectedLanguage) || 'Login'}</NavLink>
        </motion.div>
        
        <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🌐 {qt('language', selectedLanguage) || 'Language'}
          <motion.svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl z-50 origin-top-right"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  className="block w-full text-left px-4 py-2 hover:bg-green-100 transition-colors duration-200"
                >
                  {lang.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
