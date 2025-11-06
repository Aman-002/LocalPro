import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import ProviderList from './components/customer/ProviderList';
import ProviderDetail from './components/customer/ProviderDetail';
import MyBookings from './components/customer/MyBookings';
import ProviderDashboard from './components/provider/Dashboard';
import ProfileSetup from './components/provider/ProfileSetup';

// Protected Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/providers/:id" element={<ProviderDetail />} />
        
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute allowedRoles={['CUSTOMER']}>
              <MyBookings />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/provider/dashboard"
          element={
            <PrivateRoute allowedRoles={['PROVIDER']}>
              <ProviderDashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/provider/setup"
          element={
            <PrivateRoute allowedRoles={['PROVIDER']}>
              <ProfileSetup />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;