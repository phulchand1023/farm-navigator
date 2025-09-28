import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';

const TalkToExpert = () => {
  const { setSidePanel } = useSideMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  const experts = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      category: 'crop',
      specialization: 'Crop Production Specialist',
      qualification: 'Ph.D. in Agronomy, IARI Delhi',
      experience: '15 years',
      expertise: ['Crop Selection', 'Seed Varieties', 'Planting Techniques', 'Yield Optimization'],
      contact: '+91-98765-43210',
      email: 'dr.rajesh@agri.gov.in',
      availability: 'Mon-Fri: 9 AM - 5 PM',
      languages: ['Hindi', 'English', 'Punjabi'],
      location: 'KVK Ghaziabad, UP',
      consultationFee: 'Free (Government Service)'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      category: 'soil',
      specialization: 'Soil Health Expert',
      qualification: 'Ph.D. in Soil Science, PAU Ludhiana',
      experience: '12 years',
      expertise: ['Soil Testing', 'Nutrient Management', 'Organic Farming', 'Soil Conservation'],
      contact: '+91-98765-43211',
      email: 'dr.priya@soilhealth.gov.in',
      availability: 'Tue-Sat: 10 AM - 4 PM',
      languages: ['Hindi', 'English'],
      location: 'Soil Testing Lab, Meerut',
      consultationFee: 'Free (Government Service)'
    },
    {
      id: 3,
      name: 'Dr. Amit Singh',
      category: 'pest',
      specialization: 'Plant Protection Specialist',
      qualification: 'Ph.D. in Entomology, GBPUAT',
      experience: '10 years',
      expertise: ['Pest Control', 'Disease Management', 'IPM Techniques', 'Pesticide Advisory'],
      contact: '+91-98765-43212',
      email: 'dr.amit@plantprotection.gov.in',
      availability: 'Mon-Sat: 8 AM - 6 PM',
      languages: ['Hindi', 'English', 'Urdu'],
      location: 'Plant Protection Office, Ghaziabad',
      consultationFee: 'Free (Government Service)'
    },
    {
      id: 4,
      name: 'Prof. Sunita Verma',
      category: 'horticulture',
      specialization: 'Horticulture Expert',
      qualification: 'M.Sc. Horticulture, NDUAT Faizabad',
      experience: '18 years',
      expertise: ['Vegetable Farming', 'Fruit Cultivation', 'Greenhouse Technology', 'Post-Harvest'],
      contact: '+91-98765-43213',
      email: 'prof.sunita@horticulture.up.gov.in',
      availability: 'Mon-Fri: 9 AM - 3 PM',
      languages: ['Hindi', 'English'],
      location: 'Horticulture Department, UP',
      consultationFee: 'Free (Government Service)'
    },
    {
      id: 5,
      name: 'Dr. Manoj Gupta',
      category: 'irrigation',
      specialization: 'Irrigation & Water Management',
      qualification: 'Ph.D. in Agricultural Engineering',
      experience: '14 years',
      expertise: ['Drip Irrigation', 'Water Conservation', 'Pump Selection', 'Irrigation Scheduling'],
      contact: '+91-98765-43214',
      email: 'dr.manoj@irrigation.gov.in',
      availability: 'Mon-Fri: 10 AM - 5 PM',
      languages: ['Hindi', 'English'],
      location: 'Irrigation Department, Meerut',
      consultationFee: 'Free (Government Service)'
    },
    {
      id: 6,
      name: 'Dr. Kavita Joshi',
      category: 'livestock',
      specialization: 'Animal Husbandry Expert',
      qualification: 'Ph.D. in Veterinary Science',
      experience: '16 years',
      expertise: ['Cattle Management', 'Dairy Farming', 'Animal Health', 'Feed Management'],
      contact: '+91-98765-43215',
      email: 'dr.kavita@animalhusbandry.up.gov.in',
      availability: 'Tue-Sat: 9 AM - 4 PM',
      languages: ['Hindi', 'English'],
      location: 'Veterinary Hospital, Ghaziabad',
      consultationFee: 'Free (Government Service)'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Experts', icon: '👥' },
    { id: 'crop', name: 'Crop Production', icon: '🌾' },
    { id: 'soil', name: 'Soil Health', icon: '🌱' },
    { id: 'pest', name: 'Plant Protection', icon: '🐛' },
    { id: 'horticulture', name: 'Horticulture', icon: '🍅' },
    { id: 'irrigation', name: 'Irrigation', icon: '💧' },
    { id: 'livestock', name: 'Animal Husbandry', icon: '🐄' }
  ];

  const filteredExperts = selectedCategory === 'all' 
    ? experts 
    : experts.filter(expert => expert.category === selectedCategory);

  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 px-6 py-10 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-green-700 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👨🌾 Talk to Agricultural Experts
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get expert advice from qualified agricultural professionals for your farming needs
        </motion.p>

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
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    👨‍🔬
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-800">{expert.name}</h3>
                    <p className="text-sm text-green-600 font-semibold">{expert.specialization}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Qualification:</h4>
                    <p className="text-xs text-gray-600">{expert.qualification}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Experience:</h4>
                    <p className="text-xs text-gray-600">{expert.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Expertise:</h4>
                    <div className="flex flex-wrap gap-1">
                      {expert.expertise.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Contact:</h4>
                    <p className="text-xs text-gray-600">📞 {expert.contact}</p>
                    <p className="text-xs text-gray-600">✉️ {expert.email}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Availability:</h4>
                    <p className="text-xs text-gray-600">🕒 {expert.availability}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Languages:</h4>
                    <p className="text-xs text-gray-600">🗣️ {expert.languages.join(', ')}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Location:</h4>
                    <p className="text-xs text-gray-600">📍 {expert.location}</p>
                  </div>

                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs text-green-700 font-semibold">
                      💰 {expert.consultationFee}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${expert.contact}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold text-center"
                    >
                      📞 Call Now
                    </a>
                    <a
                      href={`mailto:${expert.email}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-semibold text-center"
                    >
                      ✉️ Email
                    </a>
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 How to Consult</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-semibold text-blue-700">Phone Consultation</h4>
              <p className="text-sm text-blue-600">Call directly during available hours for immediate advice</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">✉️</div>
              <h4 className="font-semibold text-green-700">Email Consultation</h4>
              <p className="text-sm text-green-600">Send detailed queries with photos for comprehensive advice</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="font-semibold text-orange-700">Visit Office</h4>
              <p className="text-sm text-orange-600">Schedule appointment for in-person consultation</p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-lg mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-red-700 mb-4">🚨 Emergency Agricultural Helplines</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-red-700">Kisan Call Center</h4>
              <p className="text-red-600">📞 1800-180-1551 (Toll Free, 24x7)</p>
            </div>
            <div>
              <h4 className="font-semibold text-red-700">UP Agriculture Helpline</h4>
              <p className="text-red-600">📞 0522-2286-999 (State Helpline)</p>
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

export default TalkToExpert;