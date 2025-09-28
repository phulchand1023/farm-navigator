import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { useSideMenu } from '../context/SideMenuContext';

const MachineRental = () => {
  const { setSidePanel } = useSideMenu();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    setSidePanel(false);
  }, [setSidePanel]);

  const machines = [
    {
      id: 1,
      name: 'Tractor (50 HP)',
      category: 'tractor',
      owner: 'Ramesh Kumar',
      location: 'Muradnagar, Ghaziabad',
      hourlyRate: '₹400/hour',
      dailyRate: '₹2,500/day',
      contact: '+91-98765-43210',
      email: 'ramesh.kumar@gmail.com',
      address: 'Village Muradnagar, Ghaziabad, UP - 201206'
    },
    {
      id: 2,
      name: 'Combine Harvester',
      category: 'harvester',
      owner: 'Suresh Singh',
      location: 'Ghaziabad Mandi Area',
      hourlyRate: '₹800/hour',
      dailyRate: '₹5,000/day',
      contact: '+91-98765-43211',
      email: 'suresh.singh@yahoo.com',
      address: 'Near Mandi, Ghaziabad, UP - 201001'
    },
    {
      id: 3,
      name: 'Rotavator',
      category: 'tillage',
      owner: 'Mahesh Yadav',
      location: 'Hapur Road, Ghaziabad',
      hourlyRate: '₹300/hour',
      dailyRate: '₹1,800/day',
      contact: '+91-98765-43212',
      email: 'mahesh.yadav@gmail.com',
      address: 'Hapur Road, Ghaziabad, UP - 201003'
    },
    {
      id: 4,
      name: 'Seed Drill Machine',
      category: 'seeding',
      owner: 'Vikram Sharma',
      location: 'Loni, Ghaziabad',
      hourlyRate: '₹250/hour',
      dailyRate: '₹1,500/day',
      contact: '+91-98765-43213',
      email: 'vikram.sharma@hotmail.com',
      address: 'Loni Border, Ghaziabad, UP - 201102'
    },
    {
      id: 5,
      name: 'Thresher Machine',
      category: 'harvester',
      owner: 'Ajay Kumar',
      location: 'Meerut Road, Ghaziabad',
      hourlyRate: '₹350/hour',
      dailyRate: '₹2,200/day',
      contact: '+91-98765-43214',
      email: 'ajay.kumar@gmail.com',
      address: 'Meerut Road, Ghaziabad, UP - 201009'
    },
    {
      id: 6,
      name: 'Cultivator',
      category: 'tillage',
      owner: 'Ravi Gupta',
      location: 'Sahibabad, Ghaziabad',
      hourlyRate: '₹200/hour',
      dailyRate: '₹1,200/day',
      contact: '+91-98765-43215',
      email: 'ravi.gupta@outlook.com',
      address: 'Sahibabad Industrial Area, Ghaziabad, UP - 201005'
    },
    {
      id: 7,
      name: 'Sprayer (Boom Type)',
      category: 'spraying',
      owner: 'Deepak Singh',
      location: 'Vasundhara, Ghaziabad',
      hourlyRate: '₹180/hour',
      dailyRate: '₹1,000/day',
      contact: '+91-98765-43216',
      email: 'deepak.singh@gmail.com',
      address: 'Vasundhara Sector 12, Ghaziabad, UP - 201012'
    },
    {
      id: 8,
      name: 'Power Tiller',
      category: 'tractor',
      owner: 'Mohan Lal',
      location: 'Kavi Nagar, Ghaziabad',
      hourlyRate: '₹150/hour',
      dailyRate: '₹900/day',
      contact: '+91-98765-43217',
      email: 'mohan.lal@rediffmail.com',
      address: 'Kavi Nagar, Ghaziabad, UP - 201002'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Machines' },
    { id: 'tractor', name: 'Tractors' },
    { id: 'harvester', name: 'Harvesters' },
    { id: 'tillage', name: 'Tillage Equipment' },
    { id: 'seeding', name: 'Seeding' },
    { id: 'spraying', name: 'Spraying' }
  ];

  const filteredMachines = selectedCategory === 'all' 
    ? machines 
    : machines.filter(machine => machine.category === selectedCategory);

  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100 px-6 py-10 pt-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-700 text-center mb-8">
            🚜 Agricultural Machine Rental
          </h1>

          <p className="text-lg text-gray-600 text-center mb-8">
            Rent farm machinery from local owners in Ghaziabad region
          </p>

          {/* Category Filter */}
          <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Machines Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMachines.map((machine) => (
              <div
                key={machine.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{machine.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Owner: {machine.owner}</p>
                  <p className="text-sm text-gray-600 mb-1">📍 {machine.location}</p>
                  <p className="text-sm text-gray-600 mb-1">📞 {machine.contact}</p>
                  <p className="text-sm text-gray-600 mb-1">✉️ {machine.email}</p>
                  <p className="text-xs text-gray-500 mb-3">🏠 {machine.address}</p>
                  
                  <div className="bg-orange-50 p-3 rounded-lg mb-4">
                    <p className="text-lg font-bold text-orange-700">{machine.hourlyRate}</p>
                    <p className="text-sm text-orange-600">{machine.dailyRate}</p>
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={`tel:${machine.contact}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold text-center"
                    >
                      📞 Call Owner
                    </a>
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-xs font-semibold">
                      📅 Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/main-dashboard">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg">
                ← Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MachineRental;