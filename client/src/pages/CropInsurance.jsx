import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';

const CropInsurance = () => {
  const { setSidePanel } = useSideMenu();
  const [selectedType, setSelectedType] = useState('all');
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  const insuranceProviders = [
    {
      id: 1,
      name: 'PMFBY (Government)',
      type: 'government',
      company: 'Agriculture Insurance Company of India Ltd (AIC)',
      coverage: 'Up to ₹2,00,000 per hectare',
      premium: '2% for Kharif, 1.5% for Rabi crops',
      claimsPaid: '₹87,369 crores (2022-23)',
      beneficiaries: '5.5 crore farmers covered',
      avgClaim: '₹15,885 per beneficiary',
      features: ['Weather-based losses', 'Technology assessment', 'Quick settlement'],
      contact: '1800-200-7710',
      website: 'https://pmfby.gov.in',
      documents: ['Aadhaar', 'Bank Account', 'Land Records', 'Sowing Certificate']
    },
    {
      id: 2,
      name: 'ICICI Lombard Crop Insurance',
      type: 'private',
      company: 'ICICI Lombard General Insurance',
      coverage: 'Up to ₹3,00,000 per hectare',
      premium: '3-5% of sum insured',
      claimsPaid: '₹2,450 crores (2022-23)',
      beneficiaries: '12 lakh farmers',
      avgClaim: '₹20,416 per beneficiary',
      features: ['Satellite monitoring', 'Mobile app claims', 'Weather alerts'],
      contact: '1800-266-7766',
      website: 'https://www.icicilombard.com',
      documents: ['Aadhaar', 'Bank Account', 'Land Records', 'Crop Photos']
    },
    {
      id: 3,
      name: 'Bajaj Allianz Crop Shield',
      type: 'private',
      company: 'Bajaj Allianz General Insurance',
      coverage: 'Up to ₹2,50,000 per hectare',
      premium: '2.5-4% of sum insured',
      claimsPaid: '₹1,890 crores (2022-23)',
      beneficiaries: '8.5 lakh farmers',
      avgClaim: '₹22,235 per beneficiary',
      features: ['Drone surveys', 'AI-based assessment', 'Digital claims'],
      contact: '1800-209-5858',
      website: 'https://www.bajajallianz.com',
      documents: ['Aadhaar', 'Bank Account', 'Land Records', 'Soil Health Card']
    },
    {
      id: 4,
      name: 'HDFC ERGO Crop Insurance',
      type: 'private',
      company: 'HDFC ERGO General Insurance',
      coverage: 'Up to ₹4,00,000 per hectare',
      premium: '3-6% of sum insured',
      claimsPaid: '₹1,650 crores (2022-23)',
      beneficiaries: '6.8 lakh farmers',
      avgClaim: '₹24,265 per beneficiary',
      features: ['Real-time monitoring', 'Quick claim processing', 'Expert advisory'],
      contact: '1800-266-9966',
      website: 'https://www.hdfcergo.com',
      documents: ['Aadhaar', 'Bank Account', 'Land Records', 'Previous Insurance']
    },
    {
      id: 5,
      name: 'SBI General Crop Insurance',
      type: 'private',
      company: 'SBI General Insurance',
      coverage: 'Up to ₹2,75,000 per hectare',
      premium: '2.8-4.5% of sum insured',
      claimsPaid: '₹1,320 crores (2022-23)',
      beneficiaries: '5.2 lakh farmers',
      avgClaim: '₹25,385 per beneficiary',
      features: ['Branch network support', 'Multilingual service', 'Fast settlements'],
      contact: '1800-123-2310',
      website: 'https://www.sbigeneral.in',
      documents: ['Aadhaar', 'Bank Account', 'Land Records', 'Income Certificate']
    },
    {
      id: 6,
      name: 'Reliance General Crop Cover',
      type: 'private',
      company: 'Reliance General Insurance',
      coverage: 'Up to ₹3,50,000 per hectare',
      premium: '3.2-5.5% of sum insured',
      claimsPaid: '₹980 crores (2022-23)',
      beneficiaries: '3.8 lakh farmers',
      avgClaim: '₹25,789 per beneficiary',
      features: ['Mobile app', 'Video claim submission', '24x7 support'],
      contact: '1800-300-0100',
      website: 'https://www.reliancegeneral.co.in',
      documents: ['Aadhaar', 'Bank Account', 'Land Records', 'Crop Calendar']
    }
  ];

  const types = [
    { id: 'all', name: 'All Insurance', icon: '🛡️' },
    { id: 'government', name: 'Government Schemes', icon: '🏛️' },
    { id: 'private', name: 'Private Companies', icon: '🏢' }
  ];

  const filteredProviders = selectedType === 'all' 
    ? insuranceProviders 
    : insuranceProviders.filter(provider => provider.type === selectedType);

  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 px-6 py-10 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-blue-700 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🛡️ Crop Insurance Options
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Protect your crops with comprehensive insurance coverage from government and private providers
        </motion.p>

        {/* Type Filter */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedType === type.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.icon} {type.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Insurance Providers Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    provider.type === 'government' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {provider.type === 'government' ? 'Government' : 'Private'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">Coverage & Premium</h4>
                    <p className="text-sm text-green-600">💰 Coverage: {provider.coverage}</p>
                    <p className="text-sm text-green-600">📊 Premium: {provider.premium}</p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Claims Performance (2022-23)</h4>
                    <p className="text-sm text-blue-600">💵 Total Claims Paid: {provider.claimsPaid}</p>
                    <p className="text-sm text-blue-600">👥 Beneficiaries: {provider.beneficiaries}</p>
                    <p className="text-sm text-blue-600 font-semibold">💳 Avg Claim per Farmer: {provider.avgClaim}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {provider.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-2">Required Documents:</h4>
                    <div className="flex flex-wrap gap-1">
                      {provider.documents.map((doc, idx) => (
                        <span key={idx} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">📞 {provider.contact}</span>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${provider.contact}`}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold text-center"
                      >
                        📞 Call Now
                      </a>
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-semibold text-center"
                      >
                        🌐 Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Information */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 How to Choose Insurance</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🏛️</div>
              <h4 className="font-semibold text-green-700">Government Schemes</h4>
              <p className="text-sm text-green-600">Lower premium, subsidized by government, wider coverage</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="font-semibold text-blue-700">Private Insurance</h4>
              <p className="text-sm text-blue-600">Higher coverage, faster claims, advanced technology</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="font-semibold text-orange-700">Best Practice</h4>
              <p className="text-sm text-orange-600">Compare avg claims, read terms, check claim settlement ratio</p>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-8">
          <Link to="/main-dashboard">
            <motion.button
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              ← Back to Dashboard
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default CropInsurance;