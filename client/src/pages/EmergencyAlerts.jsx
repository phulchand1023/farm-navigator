import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';

const EmergencyAlerts = () => {
  const { setSidePanel } = useSideMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  const emergencyContacts = [
    {
      id: 1,
      category: 'district',
      title: 'District Collector, Ghaziabad',
      name: 'Shri Ritu Maheshwari (IAS)',
      designation: 'District Magistrate & Collector',
      phone: '+91-120-2766-666',
      email: 'dm-ghaziabad@up.gov.in',
      address: 'Collectorate, Civil Lines, Ghaziabad - 201001',
      availability: '24x7 Emergency',
      department: 'District Administration'
    },
    {
      id: 2,
      category: 'agriculture',
      title: 'Chief Development Officer (Agriculture)',
      name: 'Dr. Vinod Kumar Singh',
      designation: 'CDO Agriculture, Ghaziabad',
      phone: '+91-120-2782-100',
      email: 'cdo-agri-ghaziabad@up.gov.in',
      address: 'Agriculture Department, Ghaziabad',
      availability: 'Mon-Fri: 10 AM - 6 PM',
      department: 'Agriculture Department'
    },
    {
      id: 3,
      category: 'disaster',
      title: 'District Emergency Officer',
      name: 'Shri Rajesh Sharma',
      designation: 'District Disaster Management Officer',
      phone: '+91-120-2766-108',
      email: 'ddmo-ghaziabad@up.gov.in',
      address: 'Emergency Operations Center, Ghaziabad',
      availability: '24x7 Emergency Response',
      department: 'Disaster Management'
    },
    {
      id: 4,
      category: 'police',
      title: 'Senior Superintendent of Police',
      name: 'Shri Muniraj G (IPS)',
      designation: 'SSP Ghaziabad',
      phone: '+91-120-2766-100',
      email: 'ssp-ghaziabad@up.gov.in',
      address: 'Police Lines, Ghaziabad',
      availability: '24x7 Emergency',
      department: 'UP Police'
    },
    {
      id: 5,
      category: 'revenue',
      title: 'Additional District Magistrate (Revenue)',
      name: 'Smt. Priya Jain (PCS)',
      designation: 'ADM Revenue',
      phone: '+91-120-2766-200',
      email: 'adm-revenue-ghaziabad@up.gov.in',
      address: 'Revenue Department, Collectorate',
      availability: 'Mon-Sat: 10 AM - 5 PM',
      department: 'Revenue Department'
    },
    {
      id: 6,
      category: 'agriculture',
      title: 'Joint Director Agriculture',
      name: 'Dr. Suresh Chandra',
      designation: 'Joint Director, Agriculture',
      phone: '+91-120-2785-300',
      email: 'jd-agri-meerut@up.gov.in',
      address: 'Directorate of Agriculture, Meerut Division',
      availability: 'Mon-Fri: 10 AM - 5 PM',
      department: 'Agriculture Directorate'
    },
    {
      id: 7,
      category: 'water',
      title: 'Executive Engineer (Irrigation)',
      name: 'Er. Anil Kumar Gupta',
      designation: 'Executive Engineer, Irrigation',
      phone: '+91-120-2788-400',
      email: 'ee-irrigation-ghaziabad@up.gov.in',
      address: 'Irrigation Department, Ghaziabad',
      availability: 'Mon-Fri: 10 AM - 5 PM',
      department: 'Irrigation Department'
    },
    {
      id: 8,
      category: 'veterinary',
      title: 'Chief Veterinary Officer',
      name: 'Dr. Ramesh Kumar',
      designation: 'CVO Ghaziabad',
      phone: '+91-120-2789-500',
      email: 'cvo-ghaziabad@up.gov.in',
      address: 'Veterinary Hospital, Ghaziabad',
      availability: 'Mon-Sat: 9 AM - 5 PM',
      department: 'Animal Husbandry'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Contacts', icon: '📞' },
    { id: 'district', name: 'District Officials', icon: '🏛️' },
    { id: 'agriculture', name: 'Agriculture Dept', icon: '🌾' },
    { id: 'disaster', name: 'Emergency Response', icon: '🚨' },
    { id: 'police', name: 'Police', icon: '👮' },
    { id: 'revenue', name: 'Revenue Dept', icon: '📋' },
    { id: 'water', name: 'Irrigation', icon: '💧' },
    { id: 'veterinary', name: 'Veterinary', icon: '🐄' }
  ];

  const nationalHelplines = [
    { name: 'National Emergency', number: '112', description: 'All emergency services' },
    { name: 'Kisan Call Center', number: '1800-180-1551', description: 'Agricultural helpline (24x7)' },
    { name: 'Disaster Helpline', number: '1078', description: 'Natural disaster emergency' },
    { name: 'Police Emergency', number: '100', description: 'Police emergency services' },
    { name: 'Fire Emergency', number: '101', description: 'Fire department emergency' },
    { name: 'Medical Emergency', number: '108', description: 'Ambulance and medical emergency' }
  ];

  const filteredContacts = selectedCategory === 'all' 
    ? emergencyContacts 
    : emergencyContacts.filter(contact => contact.category === selectedCategory);

  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-orange-100 px-6 py-10 pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-red-700 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚨 Emergency Contacts & Alerts
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Important government officials and emergency helplines for farmers in Ghaziabad district
        </motion.p>

        {/* National Emergency Helplines */}
        <motion.div
          className="bg-red-50 border border-red-200 p-6 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-red-700 mb-4">🆘 National Emergency Helplines</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {nationalHelplines.map((helpline, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-700">{helpline.name}</h4>
                <p className="text-2xl font-bold text-red-600">{helpline.number}</p>
                <p className="text-sm text-red-500">{helpline.description}</p>
                <a
                  href={`tel:${helpline.number}`}
                  className="mt-2 inline-block bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold"
                >
                  📞 Call Now
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Government Officials Contacts */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{contact.title}</h3>
                    <p className="text-sm text-blue-600 font-semibold">{contact.name}</p>
                    <p className="text-xs text-gray-600">{contact.designation}</p>
                  </div>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {contact.department}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Contact Information:</h4>
                    <p className="text-sm text-gray-600">📞 {contact.phone}</p>
                    <p className="text-sm text-gray-600">✉️ {contact.email}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Office Address:</h4>
                    <p className="text-xs text-gray-600">📍 {contact.address}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Availability:</h4>
                    <p className="text-xs text-gray-600">🕒 {contact.availability}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs font-semibold text-center"
                    >
                      📞 Call Now
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
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

        {/* Emergency Guidelines */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 When to Contact</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-2">🚨 Immediate Emergency</h4>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Natural disasters (flood, drought, storm)</li>
                <li>• Crop disease outbreak</li>
                <li>• Animal disease emergency</li>
                <li>• Law and order issues</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-700 mb-2">📞 Regular Issues</h4>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>• Crop insurance claims</li>
                <li>• Land record issues</li>
                <li>• Irrigation problems</li>
                <li>• Government scheme queries</li>
              </ul>
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

export default EmergencyAlerts;