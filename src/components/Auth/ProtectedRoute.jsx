import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, authenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth state initializes
  if (loading) return <div>Loading...</div>;

  // If not authenticated, go to login and keep "from" state
  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route has role restrictions, check user role (case-insensitive)
  if (allowedRoles && !allowedRoles.includes(user?.role?.toLowerCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
