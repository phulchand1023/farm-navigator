import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');
  
  // Allow access if user is authenticated or is a guest
  if (authToken || userType === 'guest') {
    return children;
  }
  
  // Redirect to login if not authenticated
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;