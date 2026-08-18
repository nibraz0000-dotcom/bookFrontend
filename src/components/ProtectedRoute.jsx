import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If admin-only route and user is not admin, redirect to home
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};