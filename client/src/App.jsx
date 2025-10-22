import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideMenuProvider } from "./context/SideMenuContext";
import { LanguageProvider } from "./context/LanguageContext";
import { initializeModels } from "./utils/modelLoader";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route path="/location-selection" element={<ProtectedRoute><><Navbar /><LocationSelection /></></ProtectedRoute>} />
        <Route path="/soil-rainfall" element={<ProtectedRoute><><Navbar /><SoilRainfall /></></ProtectedRoute>} />
        <Route path="/crop-info" element={<ProtectedRoute><><Navbar /><CropInfo /></></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><><Navbar /><Recommendations /></></ProtectedRoute>} />
        <Route path="/main-dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
        <Route path="/crop-history" element={<ProtectedRoute><><Navbar /><CropHistory /></></ProtectedRoute>} />
        <Route path="/crop-yield" element={<ProtectedRoute><><Navbar /><CropYield /></></ProtectedRoute>} />
        <Route path="/farm-size" element={<ProtectedRoute><><Navbar /><FarmSize /></></ProtectedRoute>} />
        <Route path="/soil-test" element={<ProtectedRoute><><Navbar /><SoilTest /></></ProtectedRoute>} />
        <Route path="/schemes" element={<ProtectedRoute><><Navbar /><GovernmentSchemes /></></ProtectedRoute>} />
        <Route path="/expert" element={<ProtectedRoute><><Navbar /><TalkToExpert /></></ProtectedRoute>} />
        <Route path="/insurance" element={<ProtectedRoute><><Navbar /><CropInsurance /></></ProtectedRoute>} />
        <Route path="/emergency" element={<ProtectedRoute><><Navbar /><EmergencyAlerts /></></ProtectedRoute>} />
        <Route path="/market-prices" element={<ProtectedRoute><><Navbar /><MarketPrices /></></ProtectedRoute>} />
        <Route path="/rental" element={<ProtectedRoute><><Navbar /><MachineRental /></></ProtectedRoute>} />
        <Route path="/training" element={<ProtectedRoute><><Navbar /><TrainingVideos /></></ProtectedRoute>} />
        <Route path="/irrigation-source" element={<ProtectedRoute><><Navbar /><IrrigationSource /></></ProtectedRoute>} />
        </Routes>
        <VoiceToggle />
        </Router>
      </SideMenuProvider>
    </LanguageProvider>
  );
}
