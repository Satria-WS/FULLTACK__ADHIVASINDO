import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
const ProtectRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
export default ProtectRoute;
