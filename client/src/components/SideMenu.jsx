import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSideMenu } from '../context/SideMenuContext';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';

const SideMenu = () => {
  const { sidePanel, setSidePanel } = useSideMenu();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  const sideMenuItems = [
    { name: t('dashboard', selectedLanguage) || 'Dashboard', icon: '🏠', path: '/main-dashboard' },
    { name: t('soil_test', selectedLanguage) || 'Soil Test', icon: '🧪', path: '/soil-test' },
    { name: t('government_schemes', selectedLanguage) || 'Government Schemes', icon: '🏛️', path: '/schemes' },
    { name: t('talk_to_expert', selectedLanguage) || 'Talk to Expert', icon: '👨🌾', path: '/expert' },
    { name: t('machine_rental', selectedLanguage) || 'Machine Rental', icon: '🚜', path: '/rental' },
    { name: t('crop_insurance', selectedLanguage) || 'Crop Insurance', icon: '🛡️', path: '/insurance' },
    { name: t('emergency_alerts', selectedLanguage) || 'Emergency Alerts', icon: '🚨', path: '/emergency' },
    { name: t('market_prices', selectedLanguage) || 'Market Prices', icon: '💰', path: '/market-prices' },
    { name: t('training_videos', selectedLanguage) || 'Training Videos', icon: '🎥', path: '/training' }
  ];

  return (
    <>


      {/* Modern Side Panel */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform ${
          sidePanel ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-out border-r border-gray-100`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-xl text-white">🌾</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Farm Navigator</h2>
                  <p className="text-xs text-gray-500">{t('smart_farming', selectedLanguage) || 'Smart Farming'}</p>
                </div>
              </div>
              <motion.button
                onClick={() => setSidePanel(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 px-4 py-2 overflow-y-auto">
            <nav className="space-y-1">
              {sideMenuItems.map((item, index) => (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    className="group flex items-center px-3 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                    whileHover={{ x: 4 }}
                    onClick={() => setSidePanel(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Sign Out Button */}
          <div className="p-4">
            <Link to="/">
              <motion.div
                className="group flex items-center px-3 py-3 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 cursor-pointer border border-red-200"
                whileHover={{ x: 4 }}
                onClick={() => {
                  setSidePanel(false);
                  localStorage.clear();
                }}
              >
                <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-200">🚪</span>
                <span className="flex-1">Sign Out</span>
                <svg className="w-4 h-4 text-red-400 group-hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </Link>
          </div>
          
          {/* Location Card */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Ghaziabad, UP</p>
                  <p className="text-xs text-gray-500">Muradnagar, India</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              © 2025 Farm Navigator
            </p>
          </div>
        </div>
      </motion.div>


    </>
  );
};

export default SideMenu;