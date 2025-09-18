import React, { useEffect } from 'react';
import './App.css';


import HeroSection from './components/HeroSection';
import GetAppSoon from './components/GetAppSoon';
import SignUpPage from './components/signup_page';
import LoginPage from './components/login_page';
import ForgotPasswordPage from './components/forgot_password';
import ProfilePage from './components/ProfilePage'; // your protected page
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import api from './api';

function App() {
  const location = useLocation();
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken && refreshToken) {
      api.refresh(refreshToken)
        .then((res) => {
          if (res?.accessToken) {
            sessionStorage.setItem('accessToken', res.accessToken);
          }
        })
        .catch(() => {
          // ignore
        });
    }
  }, []);

  // Hide Navbar on login and signup pages
  const hideNavbar = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/getappsoon" element={<GetAppSoon />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
