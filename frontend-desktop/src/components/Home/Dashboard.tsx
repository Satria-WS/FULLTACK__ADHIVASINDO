import React from 'react';
import { useAuth } from '../Auth/AuthContext';
const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Dashboard