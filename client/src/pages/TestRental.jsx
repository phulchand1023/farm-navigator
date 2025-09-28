import React from 'react';
import SideMenu from '../components/SideMenu';

const TestRental = () => {
  return (
    <>
      <SideMenu />
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-100 px-6 py-10 pt-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-700 text-center mb-8">
            🚜 Machine Rental Test Page
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            This is a test page to verify the rental functionality works.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Available Machines</h2>
            <div className="grid gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold">🚜 Tractor (50 HP)</h3>
                <p>Owner: Ramesh Kumar</p>
                <p>Rate: ₹400/hour</p>
                <p>Location: Muradnagar, Ghaziabad</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold">🌾 Combine Harvester</h3>
                <p>Owner: Suresh Singh</p>
                <p>Rate: ₹800/hour</p>
                <p>Location: Ghaziabad Mandi Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestRental;