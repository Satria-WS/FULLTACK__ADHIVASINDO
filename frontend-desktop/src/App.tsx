import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import Signup from './components/Auth/Signup';
import DashboardHome from './components/Home/Dashboard';
import Login from './components/Auth/Login';
import ProtectRoute from './components/Auth/ProtectRoute';

function App() {
  return (
    <>
  
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            {/* Protected routes */}
            <Route element={<ProtectRoute />}>
              <Route path="/dashboard" element={<DashboardHome />} />
            </Route>
          </Routes>
        </Router>
     
    </>
  );
}

export default App;
