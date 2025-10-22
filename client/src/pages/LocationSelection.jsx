import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { qt } from '../utils/quickTranslate';
import { voiceFeedback } from '../utils/voiceAssistant';

const LocationSelection = () => {
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [location, setLocation] = useState({
    stateId: '',
    stateName: '',
    districtId: '',
    districtName: '',
    townId: '',
    townName: ''
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [soilData, setSoilData] = useState(null);
  const [rainfallData, setRainfallData] = useState(null);

  useEffect(() => {
    fetchStates();
    const welcomeMsg = qt('select_location', selectedLanguage) || 'Select your location';
    voiceFeedback.onPageLoad(welcomeMsg, selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    if (location.stateId) {
      fetchDistricts(location.stateId);
      setTowns([]);
    }
  }, [location.stateId]);

  useEffect(() => {
    if (location.districtId) {
      fetchTowns(location.districtId);
    }
  }, [location.districtId]);

  const fetchStates = () => {
    const indianStates = [
      { state_id: 1, state_name: 'Andhra Pradesh' },
      { state_id: 2, state_name: 'Arunachal Pradesh' },
      { state_id: 3, state_name: 'Assam' },
      { state_id: 4, state_name: 'Bihar' },
      { state_id: 5, state_name: 'Chhattisgarh' },
      { state_id: 6, state_name: 'Goa' },
      { state_id: 7, state_name: 'Gujarat' },
      { state_id: 8, state_name: 'Haryana' },
      { state_id: 9, state_name: 'Himachal Pradesh' },
      { state_id: 10, state_name: 'Jharkhand' },
      { state_id: 11, state_name: 'Karnataka' },
      { state_id: 12, state_name: 'Kerala' },
      { state_id: 13, state_name: 'Madhya Pradesh' },
      { state_id: 14, state_name: 'Maharashtra' },
      { state_id: 15, state_name: 'Manipur' },
      { state_id: 16, state_name: 'Meghalaya' },
      { state_id: 17, state_name: 'Mizoram' },
      { state_id: 18, state_name: 'Nagaland' },
      { state_id: 19, state_name: 'Odisha' },
      { state_id: 20, state_name: 'Punjab' },
      { state_id: 21, state_name: 'Rajasthan' },
      { state_id: 22, state_name: 'Sikkim' },
      { state_id: 23, state_name: 'Tamil Nadu' },
      { state_id: 24, state_name: 'Telangana' },
      { state_id: 25, state_name: 'Tripura' },
      { state_id: 26, state_name: 'Uttar Pradesh' },
      { state_id: 27, state_name: 'Uttarakhand' },
      { state_id: 28, state_name: 'West Bengal' }
    ];
    
    setStates(indianStates);
    setLoading(false);
  };

  const fetchDistricts = (stateId) => {
    const stateName = states.find(s => s.state_id == stateId)?.state_name;
    const predefinedDistricts = getPredefinedDistricts(stateName);
    setDistricts(predefinedDistricts);
  };
  
  const getPredefinedDistricts = (stateName) => {
    const stateDistricts = {
      'Uttar Pradesh': ['Ghaziabad', 'Agra', 'Aligarh', 'Allahabad', 'Bareilly', 'Gorakhpur', 'Kanpur', 'Lucknow', 'Meerut', 'Moradabad', 'Varanasi'],
      'Maharashtra': ['Ahmednagar', 'Aurangabad', 'Mumbai', 'Nagpur', 'Nashik', 'Pune', 'Solapur', 'Thane'],
      'Karnataka': ['Bangalore', 'Belgaum', 'Hubli', 'Mangalore', 'Mysore'],
      'Punjab': ['Amritsar', 'Bathinda', 'Jalandhar', 'Ludhiana', 'Patiala'],
      'Haryana': ['Ambala', 'Faridabad', 'Gurgaon', 'Hisar', 'Karnal', 'Panipat'],
      'Gujarat': ['Ahmedabad', 'Bharuch', 'Rajkot', 'Surat', 'Vadodara'],
      'Rajasthan': ['Ajmer', 'Alwar', 'Bikaner', 'Jaipur', 'Jodhpur', 'Kota', 'Udaipur'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
      'West Bengal': ['Asansol', 'Durgapur', 'Howrah', 'Kolkata', 'Siliguri'],
      'Andhra Pradesh': ['Guntur', 'Kakinada', 'Kurnool', 'Nellore', 'Tirupati', 'Vijayawada', 'Visakhapatnam']
    };
    
    const districts = stateDistricts[stateName] || ['District 1', 'District 2', 'District 3'];
    return districts.map((district, index) => ({
      district_id: index + 1,
      district_name: district
    }));
  };

  const fetchTowns = (districtId) => {
    const districtName = districts.find(d => d.district_id == districtId)?.district_name;
    
    const commonTowns = [
      { town_id: 1, town_name: `${districtName} City` },
      { town_id: 2, town_name: 'Muradnagar' },
      { town_id: 3, town_name: 'Main Market' },
      { town_id: 4, town_name: 'Civil Lines' },
      { town_id: 5, town_name: 'Industrial Area' }
    ];
    
    setTowns(commonTowns);
  };

  const getSoilData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://rest.isric.org/soilgrids/v2.0/properties/query`, {
        params: {
          lon: longitude,
          lat: latitude,
          property: 'clay,sand,silt,phh2o',
          depth: '0-5cm',
          value: 'mean'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching soil data:', error);
      return null;
    }
  };

  const getRainfallData = async (latitude, longitude) => {
    try {
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear - 1}0101`;
      const endDate = `${currentYear - 1}1231`;
      
      const response = await axios.get(`https://power.larc.nasa.gov/api/temporal/daily/point`, {
        params: {
          lon: longitude,
          lat: latitude,
          start: startDate,
          end: endDate,
          parameters: 'PRECTOTCORR',
          community: 'AG',
          format: 'JSON'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching rainfall data:', error);
      return null;
    }
  };

  const findBestStateMatch = (stateName) => {
    if (!stateName) return null;
    
    const normalizedInput = stateName.toLowerCase().trim();
    
    let match = states.find(state => 
      state.state_name.toLowerCase() === normalizedInput
    );
    
    if (match) return match;
    
    match = states.find(state => 
      state.state_name.toLowerCase().includes(normalizedInput) ||
      normalizedInput.includes(state.state_name.toLowerCase())
    );
    
    return match;
  };
  
  const findBestDistrictMatch = (districtName, districts) => {
    if (!districtName) return null;
    
    const normalizedInput = districtName.toLowerCase().trim();
    
    let match = districts.find(district => 
      district.district_name.toLowerCase() === normalizedInput
    );
    
    if (match) return match;
    
    match = districts.find(district => 
      district.district_name.toLowerCase().includes(normalizedInput) ||
      normalizedInput.includes(district.district_name.toLowerCase())
    );
    
    return match;
  };

  const getLocationFromCoords = async (latitude, longitude) => {
    try {
      const geocodingPromises = [
        axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`),
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`)
      ];
      
      const results = await Promise.allSettled(geocodingPromises);
      let locationData = null;
      
      if (results[0].status === 'fulfilled') {
        const data = results[0].value.data;
        locationData = {
          state: data.principalSubdivision,
          district: data.locality || data.city,
          city: data.city || data.locality,
          country: data.countryName
        };
      }
      
      if (!locationData && results[1].status === 'fulfilled') {
        const data = results[1].value.data;
        locationData = {
          state: data.address?.state,
          district: data.address?.state_district || data.address?.county,
          city: data.address?.city || data.address?.town || data.address?.village,
          country: data.address?.country
        };
      }
      
      if (!locationData || locationData.country !== 'India') {
        throw new Error('Location not in India or geocoding failed');
      }
      
      const matchedState = findBestStateMatch(locationData.state);
      
      if (matchedState) {
        const stateDistricts = getPredefinedDistricts(matchedState.state_name);
        const matchedDistrict = findBestDistrictMatch(locationData.district, stateDistricts) || stateDistricts[0];
        
        const stateTowns = [
          { town_id: 1, town_name: locationData.city || locationData.district || 'Current Location' },
          { town_id: 2, town_name: `${matchedDistrict.district_name} Rural` },
          { town_id: 3, town_name: `${matchedDistrict.district_name} Urban` },
          { town_id: 4, town_name: 'Nearby Village' },
          { town_id: 5, town_name: 'Market Area' }
        ];
        
        return {
          location: {
            stateId: matchedState.state_id.toString(),
            stateName: matchedState.state_name,
            districtId: matchedDistrict.district_id.toString(),
            districtName: matchedDistrict.district_name,
            townId: '1',
            townName: locationData.city || locationData.district || 'Current Location'
          },
          districts: stateDistricts,
          towns: stateTowns
        };
      }
      
      throw new Error('State not found in supported list');
      
    } catch (error) {
      console.error('Enhanced geocoding failed:', error);
      const upDistricts = getPredefinedDistricts('Uttar Pradesh');
      const ghaziabadDistrict = upDistricts.find(d => d.district_name === 'Ghaziabad');
      
      return {
        location: {
          stateId: '26',
          stateName: 'Uttar Pradesh',
          districtId: ghaziabadDistrict.district_id.toString(),
          districtName: 'Ghaziabad',
          townId: '2',
          townName: 'Muradnagar'
        },
        districts: upDistricts,
        towns: [
          { town_id: 1, town_name: 'Ghaziabad City' },
          { town_id: 2, town_name: 'Muradnagar' },
          { town_id: 3, town_name: 'Main Market' }
        ]
      };
    }
  };

  const handleAutoLocation = () => {
    setGettingLocation(true);
    voiceFeedback.onSelect(qt('getting_location', selectedLanguage) || 'Getting your location', selectedLanguage);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const locationData = await getLocationFromCoords(latitude, longitude);
          
          if (locationData) {
            setLocation(locationData.location);
            setDistricts(locationData.districts);
            setTowns(locationData.towns);
          }
          
          Promise.all([
            getSoilData(latitude, longitude),
            getRainfallData(latitude, longitude)
          ]).then(([soil, rainfall]) => {
            setSoilData(soil);
            setRainfallData(rainfall);
          }).catch(error => {
            console.error('Error fetching environmental data:', error);
          });
          
        } catch (error) {
          console.error('Error getting location details:', error);
          alert('Could not determine your location. Please select manually.');
        }
        
        setGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location. Please select manually.');
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('farmerLocation', JSON.stringify(location));
    if (soilData) localStorage.setItem('soilData', JSON.stringify(soilData));
    if (rainfallData) localStorage.setItem('rainfallData', JSON.stringify(rainfallData));
    
    const successMsg = `${qt('location_selected', selectedLanguage) || 'Location selected'}: ${location.stateName}, ${location.districtName}, ${location.townName}`;
    voiceFeedback.onSuccess(successMsg, selectedLanguage);
    
    navigate('/soil-rainfall');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex items-center justify-center px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          📍 {qt('select_location', selectedLanguage) || 'Select Location'}
        </h2>
        
        <div className="text-center mb-6">
          <motion.button
            type="button"
            onClick={handleAutoLocation}
            disabled={gettingLocation}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            {gettingLocation ? `🔄 ${qt('getting_location', selectedLanguage) || 'Getting Location...'}` : `📍 ${qt('use_my_location', selectedLanguage) || 'Use My Location'}`}
          </motion.button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🔄</div>
            <p>{qt('loading_locations', selectedLanguage) || 'Loading locations...'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={location.stateId}
            onChange={(e) => {
              const selectedState = states.find(s => s.state_id == e.target.value);
              setLocation({
                stateId: e.target.value,
                stateName: selectedState?.state_name || '',
                districtId: '',
                districtName: '',
                townId: '',
                townName: ''
              });
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">{qt('select_state', selectedLanguage) || 'Select State'}</option>
            {states.map(state => (
              <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
            ))}
          </select>

          <select
            value={location.districtId}
            onChange={(e) => {
              const selectedDistrict = districts.find(d => d.district_id == e.target.value);
              setLocation({
                ...location,
                districtId: e.target.value,
                districtName: selectedDistrict?.district_name || '',
                townId: '',
                townName: ''
              });
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            disabled={!location.stateId}
            required
          >
            <option value="">{qt('select_district', selectedLanguage) || 'Select District'}</option>
            {districts.map(district => (
              <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
            ))}
          </select>

          <select
            value={location.townId}
            onChange={(e) => {
              const selectedTown = towns.find(t => t.town_id == e.target.value);
              setLocation({
                ...location,
                townId: e.target.value,
                townName: selectedTown?.town_name || ''
              });
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            disabled={!location.districtId}
            required
          >
            <option value="">{qt('select_town_village', selectedLanguage) || 'Select Town/Village'}</option>
            {towns.map(town => (
              <option key={town.town_id} value={town.town_id}>{town.town_name}</option>
            ))}
          </select>
          
          <motion.button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
          >
            {qt('continue', selectedLanguage) || 'Continue'}
          </motion.button>
        </form>
        )}
        
        {/* Current Location Display */}
        {location.stateName && (
          <motion.div
            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-bold text-green-700 mb-3">📍 {qt('selected_location', selectedLanguage) || 'Selected Location'}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏛️</span>
                <p className="text-sm"><strong>{qt('state', selectedLanguage) || 'State'}:</strong> {location.stateName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏘️</span>
                <p className="text-sm"><strong>{qt('district', selectedLanguage) || 'District'}:</strong> {location.districtName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏠</span>
                <p className="text-sm"><strong>{qt('town_village', selectedLanguage) || 'Town/Village'}:</strong> {location.townName}</p>
              </div>
              <div className="mt-3 p-2 bg-white rounded border">
                <p className="text-xs text-gray-600">
                  <strong>{qt('full_address', selectedLanguage) || 'Full Address'}:</strong> {location.townName}, {location.districtName}, {location.stateName}, India
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Soil and Rainfall Data Display */}
        {(soilData || rainfallData) && (
          <motion.div
            className="mt-6 p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-bold text-blue-700 mb-2">🌍 {qt('location_data', selectedLanguage) || 'Location Data'}</h3>
            {soilData && (
              <div className="mb-2">
                <p className="text-sm"><strong>{qt('soil_type', selectedLanguage) || 'Soil Type'}:</strong> {qt('detected_from_coordinates', selectedLanguage) || 'Detected from coordinates'}</p>
              </div>
            )}
            {rainfallData && (
              <div>
                <p className="text-sm"><strong>{qt('rainfall_pattern', selectedLanguage) || 'Rainfall Pattern'}:</strong> {qt('nasa_data_available', selectedLanguage) || 'NASA data available'}</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LocationSelection;