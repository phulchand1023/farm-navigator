import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideMenuProvider } from "./context/SideMenuContext";
import { LanguageProvider } from "./context/LanguageContext";
import { initializeModels } from "./utils/modelLoader";
import Navbar from "./components/Navbar";
import VoiceToggle from "./components/VoiceToggle";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Farms from "./pages/Farms";
import Decisions from "./pages/Decisions";
import FarmerProfile from "./pages/FarmerProfile";
import LanguageSelection from "./pages/LanguageSelection";
import LocationSelection from "./pages/LocationSelection";
import CropInfo from "./pages/CropInfo";
import Recommendations from "./pages/Recommendations";
import MainDashboard from "./pages/MainDashboard";
import SoilTest from "./pages/SoilTest";
import MarketPrices from "./pages/MarketPrices";
import CropHistory from "./pages/CropHistory";
import CropYield from "./pages/CropYield";
import SoilRainfall from "./pages/SoilRainfall";
import FarmSize from "./pages/FarmSize";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import TalkToExpert from "./pages/TalkToExpert";
import CropInsurance from "./pages/CropInsurance";
import EmergencyAlerts from "./pages/EmergencyAlerts";
import MachineRental from "./pages/MachineRental";
import TestRental from "./pages/TestRental";
import TrainingVideos from "./pages/TrainingVideos";
import IrrigationSource from "./pages/IrrigationSource";
import "./i18n";

export default function App() {
  useEffect(() => {
    // Initialize ML models on app start
    initializeModels();
  }, []);

  return (
    <LanguageProvider>
      <SideMenuProvider>
        <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Dashboard /></>} /> 
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/farms" element={<><Navbar /><Farms /></>} />
        <Route path="/decisions" element={<><Navbar /><Decisions /></>} />
        <Route path="/farmer-profile" element={<><Navbar /><FarmerProfile /></>} />
        <Route path="/language-selection" element={<><Navbar /><LanguageSelection /></>} />
        <Route path="/location-selection" element={<><Navbar /><LocationSelection /></>} />
        <Route path="/soil-rainfall" element={<><Navbar /><SoilRainfall /></>} />
        <Route path="/crop-info" element={<><Navbar /><CropInfo /></>} />
        <Route path="/recommendations" element={<><Navbar /><Recommendations /></>} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/crop-history" element={<><Navbar /><CropHistory /></>} />
        <Route path="/crop-yield" element={<><Navbar /><CropYield /></>} />
        <Route path="/farm-size" element={<><Navbar /><FarmSize /></>} />
        <Route path="/soil-test" element={<><Navbar /><SoilTest /></>} />
        <Route path="/schemes" element={<><Navbar /><GovernmentSchemes /></>} />
        <Route path="/expert" element={<><Navbar /><TalkToExpert /></>} />
        <Route path="/insurance" element={<><Navbar /><CropInsurance /></>} />
        <Route path="/emergency" element={<><Navbar /><EmergencyAlerts /></>} />
        <Route path="/market-prices" element={<><Navbar /><MarketPrices /></>} />
        <Route path="/rental" element={<><Navbar /><MachineRental /></>} />
        <Route path="/training" element={<><Navbar /><TrainingVideos /></>} />
        <Route path="/irrigation-source" element={<><Navbar /><IrrigationSource /></>} />
        </Routes>
        <VoiceToggle />
        </Router>
      </SideMenuProvider>
    </LanguageProvider>
  );
}
