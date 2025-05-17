// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Core/Navbar';
import PrivateRoute from './components/Core/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage'; // Example, you can expand this

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <AnimatePresence mode="wait"> {/* mode="wait" ensures one page animates out before next animates in */}
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" /> : <SignupPage />} />

            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            {/* Add more private routes as needed */}

            <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;