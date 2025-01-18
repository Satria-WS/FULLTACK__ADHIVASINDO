import React from 'react';
import { useAuth } from '../Auth/AuthContext';
const Logout = () => {
  const { logout } = useAuth();

  return (
    <>
      <div>
        <h1>Welcome to the Dashboard</h1>
        <button onClick={logout}>Logoutx</button>
      </div>
    </>
  );
};
export default Logout;
