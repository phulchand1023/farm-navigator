import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../utils/translations';

const SoilTest = () => {
  const { setSidePanel } = useSideMenu();
  const { selectedLanguage } = useLanguage();
  const [testType, setTestType] = useState('');
  const [location, setLocation] = useState('');
  const [nearestLabs, setNearestLabs] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  useEffect(() => {
    const farmerLocation = JSON.parse(localStorage.getItem('farmerLocation') || '{}');
    setUserLocation(farmerLocation);
    getNearestSoilLabs(farmerLocation.district);
  }, []);

  const getNearestSoilLabs = (district) => {
    const soilLabs = {
      'Ghaziabad': [
        {
          name: 'District Soil Testing Laboratory, Ghaziabad',
          address: 'Collectorate Complex, Civil Lines, Ghaziabad - 201001, Uttar Pradesh',
          phone: '+91-120-2782345',
          email: 'soillab.ghaziabad@up.gov.in',
          distance: '2 km',
          type: 'Government',
          timings: '9:00 AM - 5:00 PM (Mon-Fri)'
        },
        {
          name: 'KVK Soil Testing Lab, Ghaziabad',
          address: 'Krishi Vigyan Kendra, SVPUAT Campus, Modipuram, Meerut - 250110',
          phone: '+91-121-2888456',
          email: 'kvk.ghaziabad@gmail.com',
          distance: '8 km',
          type: 'KVK',
          timings: '9:00 AM - 4:00 PM (Mon-Sat)'
        },
        {
          name: 'IARI Regional Research Station',
          address: 'Indian Agricultural Research Institute, Pusa Campus, New Delhi - 110012',
          phone: '+91-11-25842452',
          email: 'director.iari@icar.gov.in',
          distance: '35 km',
          type: 'Research',
          timings: '10:00 AM - 4:00 PM (Mon-Fri)'
        },
        {
          name: 'Private Soil Lab - AgriTech Solutions',
          address: 'Plot No. 45, Industrial Area, Sahibabad, Ghaziabad - 201005',
          phone: '+91-120-4567890',
          email: 'info@agritechsolutions.com',
          distance: '12 km',
          type: 'Private',
          timings: '8:00 AM - 6:00 PM (Mon-Sat)'
        },
        {
          name: 'Meerut Soil Testing Center',
          address: 'Agriculture College Campus, Sardhana Road, Meerut - 250004',
          phone: '+91-121-2651234',
          email: 'soiltest.meerut@up.gov.in',
          distance: '25 km',
          type: 'Government',
          timings: '9:30 AM - 4:30 PM (Mon-Fri)'
        }
      ],
      'Meerut': [
        {
          name: 'District Soil Testing Laboratory, Meerut',
          address: 'Agriculture Department, Collectorate, Meerut - 250001, UP',
          phone: '+91-121-2651234',
          email: 'soillab.meerut@up.gov.in',
          distance: '3 km',
          type: 'Government',
          timings: '9:00 AM - 5:00 PM (Mon-Fri)'
        },
        {
          name: 'SVPUAT Soil Lab',
          address: 'Sardar Vallabhbhai Patel University, Modipuram, Meerut - 250110',
          phone: '+91-121-2888123',
          email: 'soillab@svpuat.ac.in',
          distance: '15 km',
          type: 'University',
          timings: '10:00 AM - 4:00 PM (Mon-Sat)'
        }
      ],
      'Agra': [
        {
          name: 'District Soil Testing Laboratory, Agra',
          address: 'Krishi Bhawan, Civil Lines, Agra - 282002, Uttar Pradesh',
          phone: '+91-562-2851234',
          email: 'soillab.agra@up.gov.in',
          distance: '5 km',
          type: 'Government',
          timings: '9:00 AM - 5:00 PM (Mon-Fri)'
        }
      ],
      'default': [
        {
          name: 'District Soil Testing Laboratory',
          address: 'Agriculture Department, District Collectorate',
          phone: 'Contact local agriculture office',
          email: 'soillab@district.gov.in',
          distance: '5-10 km',
          type: 'Government',
          timings: '9:00 AM - 5:00 PM (Mon-Fri)'
        },
        {
          name: 'Krishi Vigyan Kendra',
          address: 'KVK Campus, Your District',
          phone: 'Contact KVK office',
          email: 'kvk@district.org',
          distance: '15-25 km',
          type: 'KVK',
          timings: '9:00 AM - 4:00 PM (Mon-Sat)'
        }
      ]
    };
    
    setNearestLabs(soilLabs[district] || soilLabs['default']);
  };

  const testTypes = [
    { id: 'basic', name: 'Basic Soil Test', duration: '3-5 days' },
    { id: 'advanced', name: 'Advanced Nutrient Analysis', duration: '5-7 days' },
    { id: 'organic', name: 'Organic Matter Test', duration: '4-6 days' }
  ];

  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-brown-100 to-yellow-100 px-6 py-10 pt-32">
        <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-brown-700 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🧪 {t('soil_testing_services', selectedLanguage)}
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testTypes.map((test, index) => (
            <motion.div
              key={test.id}
              className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer border-2 transition-all ${
                testType === test.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setTestType(test.id)}
            >
              <h3 className="text-xl font-bold mb-2">{test.name}</h3>
              <p className="text-gray-600">Duration: {test.duration}</p>
            </motion.div>
          ))}
        </div>

        {testType && (
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">{t('book_your_test', selectedLanguage)}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('farm_location', selectedLanguage)}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <motion.button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.02 }}
              >
                {t('book_test', selectedLanguage)}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Nearest Soil Labs */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4">🏥 {t('nearest_soil_testing_labs', selectedLanguage)}</h3>
          <p className="text-gray-600 mb-4">{t('based_on_location', selectedLanguage)}: {userLocation?.district}, {userLocation?.state}</p>
          
          <div className="space-y-4">
            {nearestLabs.map((lab, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <h4 className="font-bold text-gray-800">{lab.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        lab.type === 'Government' ? 'bg-green-100 text-green-700' :
                        lab.type === 'KVK' ? 'bg-blue-100 text-blue-700' :
                        lab.type === 'University' ? 'bg-indigo-100 text-indigo-700' :
                        lab.type === 'Private' ? 'bg-orange-100 text-orange-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {lab.type}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-start space-x-2">
                        <span className="text-gray-500">📍</span>
                        <span>{lab.address}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="text-gray-500">📞</span>
                        <span>{lab.phone}</span>
                      </p>
                      {lab.email && (
                        <p className="flex items-center space-x-2">
                          <span className="text-gray-500">✉️</span>
                          <span>{lab.email}</span>
                        </p>
                      )}
                      <p className="flex items-center space-x-2">
                        <span className="text-gray-500">🕰️</span>
                        <span>{lab.timings}</span>
                      </p>
                      <p className="flex items-center space-x-2 font-semibold text-green-600">
                        <span className="text-gray-500">📍</span>
                        <span>Distance: {lab.distance}</span>
                      </p>
                    </div>
                  </div>
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    Contact
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>💡 Tip:</strong> Government labs offer subsidized rates. KVK labs provide quick results. 
              Call ahead to confirm sample collection timings.
            </p>
          </div>
          
          <div className="mt-4 text-center">
            <a 
              href="https://soilhealth.dac.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
            >
              🌐 Find more labs on soilhealth.dac.gov.in →
            </a>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link to="/main-dashboard">
            <motion.button
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              ← {t('back_to_dashboard', selectedLanguage)}
            </motion.button>
          </Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default SoilTest;