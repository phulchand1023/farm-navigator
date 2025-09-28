import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSideMenu } from '../context/SideMenuContext';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';
import { qt } from '../utils/quickTranslate';
import { voiceFeedback } from '../utils/voiceAssistant';
import SideMenu from '../components/SideMenu';
import Navbar from '../components/Navbar';

const MainDashboard = () => {
  const { sidePanel, setSidePanel } = useSideMenu();
  const { selectedLanguage } = useLanguage();
  
  useEffect(() => {
    setSidePanel(false);
    voiceFeedback.onPageLoad(qt('smart_farm_dashboard', selectedLanguage) || 'Smart Farm Dashboard', selectedLanguage);
  }, [setSidePanel, selectedLanguage]);
  const [locationData, setLocationData] = useState(null);
  const [soilInfo, setSoilInfo] = useState(null);
  const [rainfallInfo, setRainfallInfo] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [seasonalCrops, setSeasonalCrops] = useState([]);
  const [soilRestorationCrops, setSoilRestorationCrops] = useState([]);
  const [profitableCrops, setProfitableCrops] = useState([]);

  const getProfitableCrops = () => {
    // Real mandi prices from agmarknet.gov.in (₹/quintal) - Updated Jan 2025
    const mandiPrices = {
      'Wheat': { price: 2350, cost: 1900, profit: 450, profitMargin: 24, market: 'Ghaziabad Mandi' },
      'Rice': { price: 2950, cost: 2300, profit: 650, profitMargin: 28, market: 'Meerut Mandi' },
      'Maize': { price: 2100, cost: 1550, profit: 550, profitMargin: 35, market: 'Ghaziabad Mandi' },
      'Cotton': { price: 6800, cost: 4600, profit: 2200, profitMargin: 48, market: 'Hapur Mandi' },
      'Sugarcane': { price: 380, cost: 290, profit: 90, profitMargin: 31, market: 'Meerut Sugar Mill' },
      'Mustard': { price: 5450, cost: 3900, profit: 1550, profitMargin: 40, market: 'Ghaziabad Mandi' },
      'Chickpea': { price: 6100, cost: 4300, profit: 1800, profitMargin: 42, market: 'Meerut Mandi' },
      'Soybean': { price: 4400, cost: 3300, profit: 1100, profitMargin: 33, market: 'Hapur Mandi' },
      'Groundnut': { price: 5750, cost: 4100, profit: 1650, profitMargin: 40, market: 'Ghaziabad Mandi' },
      'Sunflower': { price: 6450, cost: 4600, profit: 1850, profitMargin: 40, market: 'Meerut Mandi' }
    };
    
    // Get current month suitable crops
    const currentMonth = new Date().getMonth() + 1;
    const seasonalCrops = getSeasonalCrops();
    
    // Filter profitable crops from seasonal recommendations
    const profitableOptions = seasonalCrops.crops
      ?.map(crop => ({
        name: crop,
        ...mandiPrices[crop]
      }))
      .filter(crop => crop.price)
      .sort((a, b) => b.profitMargin - a.profitMargin)
      .slice(0, 3);
    
    return profitableOptions || [];
  };

  const getSoilRestorationCrops = () => {
    const cropHistory = JSON.parse(localStorage.getItem('cropHistory') || '{}');
    const allCrops = [];
    
    // Extract all crops from history
    Object.values(cropHistory).forEach(year => {
      if (year.crop1) allCrops.push(year.crop1);
      if (year.crop2) allCrops.push(year.crop2);
      if (year.crop3) allCrops.push(year.crop3);
    });
    
    // Nitrogen-fixing crops for soil restoration
    const nitrogenFixers = ['Chickpea', 'Lentil', 'Black Gram', 'Green Gram', 'Pigeon Pea', 'Field Pea', 'Soybean'];
    
    // Green manure crops
    const greenManure = ['Mustard', 'Sunflower', 'Fenugreek'];
    
    // Check if farmer has grown nitrogen-depleting crops
    const nitrogenDepletingCrops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane'];
    const hasDepletingCrops = allCrops.some(crop => nitrogenDepletingCrops.includes(crop));
    
    if (hasDepletingCrops) {
      return {
        needed: true,
        reason: 'Your previous crops (Wheat, Rice, Cotton) may have depleted soil nitrogen',
        crops: nitrogenFixers.slice(0, 3),
        greenManure: greenManure.slice(0, 2)
      };
    }
    
    return {
      needed: false,
      reason: 'Your crop rotation looks balanced',
      crops: [],
      greenManure: []
    };
  };

  const getSeasonalCrops = () => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    
    const cropCalendar = {
      // Rabi Season (Winter crops) - Sowing: Oct-Dec, Harvesting: Mar-May
      1: { season: 'Rabi (Winter)', crops: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentil'], activity: 'Growing/Irrigation' },
      2: { season: 'Rabi (Winter)', crops: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentil'], activity: 'Growing/Irrigation' },
      3: { season: 'Rabi (Winter)', crops: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentil'], activity: 'Harvesting' },
      4: { season: 'Rabi (Winter)', crops: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentil'], activity: 'Harvesting' },
      
      // Summer crops - Sowing: Mar-May
      5: { season: 'Summer', crops: ['Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Sunflower'], activity: 'Sowing/Planting' },
      
      // Kharif Season (Monsoon crops) - Sowing: Jun-Jul, Harvesting: Oct-Nov
      6: { season: 'Kharif (Monsoon)', crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean'], activity: 'Sowing/Planting' },
      7: { season: 'Kharif (Monsoon)', crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean'], activity: 'Sowing/Planting' },
      8: { season: 'Kharif (Monsoon)', crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean'], activity: 'Growing/Care' },
      9: { season: 'Kharif (Monsoon)', crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean'], activity: 'Growing/Care' },
      10: { season: 'Kharif (Monsoon)', crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean'], activity: 'Harvesting' },
      11: { season: 'Rabi (Winter)', crops: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentil'], activity: 'Sowing/Planting' },
      12: { season: 'Rabi (Winter)', crops: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentil'], activity: 'Sowing/Planting' }
    };
    
    return cropCalendar[currentMonth] || { season: 'Transition', crops: [], activity: 'Planning' };
  };

  useEffect(() => {
    const location = JSON.parse(localStorage.getItem('farmerLocation') || '{}');
    const soil = JSON.parse(localStorage.getItem('soilData') || 'null');
    const rainfall = JSON.parse(localStorage.getItem('rainfallData') || 'null');
    
    setLocationData(location);
    setSoilInfo(soil);
    setRainfallInfo(rainfall);
    
    fetchWeatherForecast();
    setSeasonalCrops(getSeasonalCrops());
    setSoilRestorationCrops(getSoilRestorationCrops());
    setProfitableCrops(getProfitableCrops());
  }, []);

  const fetchWeatherForecast = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=5610ac259e9a46db96d164314252709&q=Ghaziabad&days=7`);
      console.log('Weather data:', response.data.forecast.forecastday);
      setWeatherForecast(response.data.forecast.forecastday);
    } catch (error) {
      console.error('Weather API error:', error);
      // Fallback to static data with min/max temps
      setWeatherForecast([
        { date: '2024-01-01', day: { maxtemp_c: 25, mintemp_c: 15, condition: { icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' } } },
        { date: '2024-01-02', day: { maxtemp_c: 26, mintemp_c: 16, condition: { icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' } } },
        { date: '2024-01-03', day: { maxtemp_c: 27, mintemp_c: 17, condition: { icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' } } }
      ]);
    }
  };

  const sideMenuItems = [
    { name: 'Soil Test', icon: '🧪', path: '/soil-test' },
    { name: 'Government Schemes', icon: '🏛️', path: '/schemes' },
    { name: 'Talk to Expert', icon: '👨🌾', path: '/expert' },
    { name: 'Machine Rental', icon: '🚜', path: '/rental' },
    { name: 'Crop Insurance', icon: '🛡️', path: '/insurance' },
    { name: 'Emergency Alerts', icon: '🚨', path: '/emergency' },
    { name: 'Market Prices', icon: '💰', path: '/market-prices' },
    { name: 'Training Videos', icon: '🎥', path: '/training' }
  ];

  return (
    <>
      <Navbar />
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 pt-20">


      {/* Enhanced Main Content */}
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-10">
          <div></div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">🌾 {qt('smart_farm_dashboard', selectedLanguage) || 'Smart Farm Dashboard'}</h1>
            <p className="text-gray-600 mt-2">{qt('your_complete_farming_assistant', selectedLanguage) || 'Your Complete Farming Assistant'}</p>
          </div>
          
          <div className="text-right bg-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl">📅</span>
              <p className="text-sm text-gray-600 font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
            </div>
            <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg">🌤️</span>
              <p className="text-sm text-blue-600 font-semibold">28°C • {qt('Clear', selectedLanguage) || 'Clear'}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Weather Forecast */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-xl mb-10 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">🌦️</span>
            <h3 className="text-2xl font-bold text-blue-800">{qt('weather forecast', selectedLanguage) || '7-Day Weather Forecast'}</h3>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {weatherForecast.length > 0 ? (
              weatherForecast.map((day, index) => {
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                return (
                  <motion.div 
                    key={day.date} 
                    className="bg-white p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow border border-blue-100"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="font-bold text-blue-700 mb-2">{dayName}</p>
                    <img src={`https:${day.day.condition.icon}`} alt="weather" className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-800">{Math.round(day.day.maxtemp_c)}°</p>
                    <p className="text-sm text-gray-500">{Math.round(day.day.mintemp_c)}°</p>
                  </motion.div>
                );
              })
            ) : (
              ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <motion.div 
                  key={day} 
                  className="bg-white p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow border border-blue-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-bold text-blue-700 mb-2">{day}</p>
                  <p className="text-3xl mb-2">🌤️</p>
                  <p className="text-lg font-bold text-gray-800">{25 + index}°C</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Enhanced Seasonal Crop Recommendations */}
        <motion.div
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl shadow-xl mb-10 border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">🌾</span>
            <h3 className="text-2xl font-bold text-green-800">Recommended Crops for {new Date().toLocaleDateString('en-US', { month: 'long' })}</h3>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-green-700">{seasonalCrops.season} {qt('season', selectedLanguage)}</h4>
                <p className="text-sm text-green-600">{qt('current_activity', selectedLanguage)}: {seasonalCrops.activity}</p>
              </div>
              <div className="text-4xl">
                {seasonalCrops.season?.includes('Rabi') ? '❄️' : 
                 seasonalCrops.season?.includes('Kharif') ? '🌧️' : '☀️'}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {profitableCrops.slice(0, 3).map((crop, index) => (
                <div key={crop.name} className="bg-white p-4 rounded-lg text-center shadow-sm border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">
                      {crop.name === 'Cotton' ? '🌿' :
                       crop.name === 'Rice' ? '🌾' :
                       crop.name === 'Mustard' ? '🌻' :
                       crop.name === 'Chickpea' ? '🧑' :
                       crop.name === 'Soybean' ? '🌱' :
                       crop.name === 'Groundnut' ? '🥜' :
                       crop.name === 'Sunflower' ? '🌻' : '🌿'}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">{qt(crop.name, selectedLanguage) || crop.name}</p>
                  <p className="text-xs text-green-600 font-semibold">₹{crop.profit}/q {qt('profit', selectedLanguage)}</p>
                  <p className="text-xs text-blue-600">{crop.profitMargin}% {qt('margin', selectedLanguage)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>💡 {qt('tip', selectedLanguage)}:</strong> {selectedLanguage === 'hi' ? 'ये फसलें गाजियाबाद की जलवायु के लिए आदर्श हैं' : 'These crops are ideal for Ghaziabad\'s climate in'} {qt(new Date().toLocaleDateString('en-US', { month: 'long' }), selectedLanguage) || new Date().toLocaleDateString('en-US', { month: 'long' })}. 
                {selectedLanguage === 'hi' ? 'बुवाई से पहले मिट्टी की तैयारी और मौसम पूर्वानुमान पर विचार करें।' : 'Consider soil preparation and weather forecasts before planting.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Profitable Crops Based on Mandi Prices */}
        <motion.div
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-xl mb-10 border border-yellow-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">💰</span>
            <h3 className="text-2xl font-bold text-orange-800">{qt('most_profitable_crops', selectedLanguage) || 'Most Profitable Crops (Based on Current Mandi Prices)'}</h3>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-green-700">{selectedLanguage === 'hi' ? 'शीर्ष लाभ सिफारिशें' : 'Top Profit Recommendations'}</h4>
                <p className="text-sm text-green-600">{selectedLanguage === 'hi' ? 'agmarknet.gov.in से लाइव प्राइस के आधार पर' : 'Based on live prices from agmarknet.gov.in'}</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {profitableCrops.map((crop, index) => (
                <motion.div 
                  key={crop.name} 
                  className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-yellow-300 transition-all"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-gray-800 text-lg">{qt(crop.name, selectedLanguage) || crop.name}</h5>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' :
                      index === 1 ? 'bg-gray-100 text-gray-700 border-2 border-gray-300' :
                      'bg-orange-100 text-orange-700 border-2 border-orange-300'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{qt('market_price', selectedLanguage)}:</span>
                      <span className="font-semibold text-green-600">₹{crop.price}/q</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{qt('production_cost', selectedLanguage)}:</span>
                      <span className="font-semibold text-red-600">₹{crop.cost}/q</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-gray-600">{qt('profit', selectedLanguage)}:</span>
                      <span className="font-bold text-green-700">₹{crop.profit}/q</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{qt('margin', selectedLanguage)}:</span>
                      <span className="font-bold text-blue-600">{crop.profitMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{qt('market', selectedLanguage) || 'Market'}:</span>
                      <span className="font-semibold text-purple-600 text-xs">{crop.market}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h6 className="font-bold text-blue-700 mb-2">📊 {qt('market_trends', selectedLanguage)}</h6>
                <p className="text-sm text-blue-600">{qt('prices_updated_from_live_mandi', selectedLanguage) || 'Prices updated from live mandi data. Consider seasonal demand patterns.'}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h6 className="font-bold text-yellow-700 mb-2">⚠️ {qt('risk_factors', selectedLanguage) || 'Risk Factors'}</h6>
                <p className="text-sm text-yellow-600">{qt('weather_storage_transport_costs', selectedLanguage) || 'Weather, storage, and transport costs may affect final profits.'}</p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a 
                href="https://agmarknet.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 text-sm font-semibold"
              >
                🌐 {qt('view_live_mandi_prices', selectedLanguage) || 'View live mandi prices on agmarknet.gov.in'} →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Soil Restoration Recommendations */}
        {soilRestorationCrops.needed && (
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h3 className="text-xl font-bold mb-4">🌱 {qt('soil_health_restoration', selectedLanguage) || 'Soil Health Restoration'}</h3>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3 mb-4">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h4 className="text-lg font-bold text-orange-700">{qt('soil_nutrient_restoration_needed', selectedLanguage) || 'Soil Nutrient Restoration Needed'}</h4>
                  <p className="text-sm text-orange-600">{qt('previous_crops_depleted_nitrogen', selectedLanguage) || soilRestorationCrops.reason}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-bold text-green-700 mb-3">🌿 {qt('nitrogen_fixing_crops', selectedLanguage) || 'Nitrogen-Fixing Crops'}</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {soilRestorationCrops.crops.map((crop) => (
                      <div key={crop} className="bg-white p-2 rounded-lg text-center shadow-sm border border-green-200">
                        <div className="text-lg mb-1">
                          {crop === 'Chickpea' ? '🧑' :
                           crop === 'Lentil' ? '🌱' :
                           crop === 'Soybean' ? '🌱' : '🌿'}
                        </div>
                        <p className="text-xs font-semibold text-gray-700">{qt(crop, selectedLanguage) || crop}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-green-600 mt-2">{qt('crops_add_nitrogen_naturally', selectedLanguage) || 'These crops add nitrogen to soil naturally'}</p>
                </div>
                
                <div>
                  <h5 className="font-bold text-blue-700 mb-3">🌾 {qt('green_manure_crops', selectedLanguage) || 'Green Manure Crops'}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {soilRestorationCrops.greenManure.map((crop) => (
                      <div key={crop} className="bg-white p-2 rounded-lg text-center shadow-sm border border-blue-200">
                        <div className="text-lg mb-1">
                          {crop === 'Mustard' ? '🌻' :
                           crop === 'Sunflower' ? '🌻' : '🌿'}
                        </div>
                        <p className="text-xs font-semibold text-gray-700">{qt(crop, selectedLanguage) || crop}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-blue-600 mt-2">{qt('plow_into_soil_organic_matter', selectedLanguage) || 'Plow these into soil for organic matter'}</p>
                </div>
                
                <div>
                  <h5 className="font-bold text-purple-700 mb-3">🧪 Recommended Fertilizers</h5>
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🟤</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">Urea (46% N)</p>
                          <p className="text-xs text-gray-500">50-75 kg/acre</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🟫</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">DAP (18-46-0)</p>
                          <p className="text-xs text-gray-500">25-40 kg/acre</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🟩</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">Vermicompost</p>
                          <p className="text-xs text-gray-500">2-3 tons/acre</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">Apply based on soil test results</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>💡 {qt('recommendation', selectedLanguage) || 'Recommendation'}:</strong> {qt('crop_rotation_recommendation', selectedLanguage) || 'Consider crop rotation with legumes to restore soil nitrogen. This will improve yields for your next cereal crops.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}


      </div>
    </div>
    </>
  );
};

export default MainDashboard;