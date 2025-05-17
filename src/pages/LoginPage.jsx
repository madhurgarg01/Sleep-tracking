// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import AnimatedPage from '../components/Core/AnimatedPage';

const LoginPage = () => {
  return (
    <AnimatedPage>
      <div className="container">
        <LoginForm />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Need an account? <Link to="/signup" className="link-text">Sign Up</Link>
        </p>
      </div>
    </AnimatedPage>
  );
};

export default LoginPage;