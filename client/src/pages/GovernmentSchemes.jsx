import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';

const GovernmentSchemes = () => {
  const { setSidePanel } = useSideMenu();
  const [schemes, setSchemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  useEffect(() => {
    fetchGovernmentSchemes();
  }, []);

  const fetchGovernmentSchemes = () => {
    // Static data based on official government portals (pmkisan.gov.in, farmer.gov.in)
    // In production, this would be fetched from a government API or web scraping service
    // Government portals don't provide public APIs, so data is manually curated from official sources
    const governmentSchemes = [
      {
        id: 1,
        name: 'PM-KISAN Samman Nidhi',
        category: 'financial',
        amount: '₹6,000/year',
        description: 'Direct income support to small and marginal farmers',
        eligibility: 'Small & marginal farmers with cultivable land up to 2 hectares',
        benefits: ['₹2,000 every 4 months', 'Direct bank transfer', 'No intermediary'],
        documents: ['Aadhaar Card', 'Bank Account', 'Land Records'],
        website: 'https://pmkisan.gov.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 2,
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        category: 'insurance',
        amount: 'Up to ₹2 lakh coverage',
        description: 'Crop insurance scheme for farmers against crop loss',
        eligibility: 'All farmers (sharecroppers & tenant farmers included)',
        benefits: ['Low premium rates', 'Quick claim settlement', 'Technology-based assessment'],
        documents: ['Aadhaar Card', 'Bank Account', 'Land Records', 'Sowing Certificate'],
        website: 'https://pmfby.gov.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 3,
        name: 'Kisan Credit Card (KCC)',
        category: 'credit',
        amount: 'Up to ₹3 lakh at 4% interest',
        description: 'Credit facility for farmers to meet agricultural expenses',
        eligibility: 'All farmers including tenant farmers, oral lessees, sharecroppers',
        benefits: ['Low interest rate (4%)', 'Flexible repayment', 'Insurance coverage'],
        documents: ['Aadhaar Card', 'PAN Card', 'Land Documents', 'Bank Account'],
        website: 'https://www.nabard.org/kcc',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 4,
        name: 'PM Kisan Maandhan Yojana',
        category: 'pension',
        amount: '₹3,000/month pension',
        description: 'Pension scheme for small and marginal farmers',
        eligibility: 'Small & marginal farmers aged 18-40 years',
        benefits: ['Guaranteed pension', 'Voluntary contribution', 'Family pension'],
        documents: ['Aadhaar Card', 'Bank Account', 'Age Proof'],
        website: 'https://maandhan.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 5,
        name: 'Soil Health Card Scheme',
        category: 'technical',
        amount: 'Free soil testing',
        description: 'Soil health assessment and nutrient management',
        eligibility: 'All farmers',
        benefits: ['Free soil testing', 'Nutrient recommendations', 'Improved productivity'],
        documents: ['Aadhaar Card', 'Land Records'],
        website: 'https://soilhealth.dac.gov.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 6,
        name: 'National Agriculture Market (e-NAM)',
        category: 'marketing',
        amount: 'Better price discovery',
        description: 'Online trading platform for agricultural commodities',
        eligibility: 'All farmers and traders',
        benefits: ['Transparent pricing', 'Reduced transaction costs', 'Quality assurance'],
        documents: ['Aadhaar Card', 'Bank Account', 'Mobile Number'],
        website: 'https://enam.gov.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 7,
        name: 'Pradhan Mantri Krishi Sinchai Yojana',
        category: 'irrigation',
        amount: 'Up to 90% subsidy',
        description: 'Irrigation development and water conservation',
        eligibility: 'All farmers',
        benefits: ['Drip irrigation subsidy', 'Sprinkler system support', 'Water conservation'],
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account'],
        website: 'https://pmksy.gov.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      },
      {
        id: 8,
        name: 'Formation & Promotion of FPOs',
        category: 'cooperative',
        amount: 'Up to ₹18 lakh support',
        description: 'Support for Farmer Producer Organizations',
        eligibility: 'Groups of farmers (minimum 300 members)',
        benefits: ['Financial support', 'Technical assistance', 'Market linkage'],
        documents: ['Group Registration', 'Member Details', 'Business Plan'],
        website: 'https://farmer.gov.in',
        status: 'Active',
        ministry: 'Ministry of Agriculture & Farmers Welfare'
      }
    ];

    setSchemes(governmentSchemes);
  };

  const categories = [
    { id: 'all', name: 'All Schemes', icon: '📋' },
    { id: 'financial', name: 'Financial Support', icon: '💰' },
    { id: 'insurance', name: 'Insurance', icon: '🛡️' },
    { id: 'credit', name: 'Credit & Loans', icon: '🏦' },
    { id: 'technical', name: 'Technical Support', icon: '🔬' },
    { id: 'irrigation', name: 'Irrigation', icon: '💧' },
    { id: 'marketing', name: 'Marketing', icon: '📈' }
  ];

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

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
          🏛️ Government Schemes for Farmers
        </motion.h1>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-gray-600 mb-2">
            Explore various government schemes and subsidies available for farmers across India
          </p>
          <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-4xl mx-auto">
            📋 <strong>Data Source:</strong> Information compiled from official government portals including pmkisan.gov.in and farmer.gov.in. 
            Always verify current details on official websites before applying.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    {scheme.name}
                  </h3>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {scheme.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {scheme.amount}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {scheme.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Eligibility:</h4>
                    <p className="text-xs text-gray-600">{scheme.eligibility}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Key Benefits:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Required Documents:</h4>
                    <div className="flex flex-wrap gap-1">
                      {scheme.documents.slice(0, 3).map((doc, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{scheme.ministry}</span>
                    <a
                      href={scheme.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Links */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">📞 Important Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="text-2xl mb-2">🌾</div>
              <h4 className="font-semibold text-green-700">PM-KISAN Portal</h4>
              <p className="text-sm text-green-600">Check beneficiary status & apply</p>
            </a>
            <a
              href="https://farmer.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="text-2xl mb-2">👨‍🌾</div>
              <h4 className="font-semibold text-blue-700">Farmer Portal</h4>
              <p className="text-sm text-blue-600">One-stop solution for farmers</p>
            </a>
            <a
              href="tel:1800-115-526"
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-semibold text-orange-700">Kisan Call Center</h4>
              <p className="text-sm text-orange-600">1800-115-526 (Toll Free)</p>
            </a>
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

export default GovernmentSchemes;