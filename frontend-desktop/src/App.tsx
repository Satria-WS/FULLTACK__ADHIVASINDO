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
import Test from './components/Home/Test';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/test" element={<Test/>} />
            {/* Protected routes */}
            <Route element={<ProtectRoute />}>
              <Route path="/dashboard" element={<DashboardHome />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
