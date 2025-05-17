// src/pages/SignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/Auth/SignupForm';
import AnimatedPage from '../components/Core/AnimatedPage';

const SignupPage = () => {
  return (
    <AnimatedPage>
      <div className="container">
        <SignupForm />
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login" className="link-text">Log In</Link>
        </p>
      </div>
    </AnimatedPage>
  );
};

export default SignupPage;