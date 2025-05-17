// src/components/Auth/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';
import { motion } from 'framer-motion';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password, displayName);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please check your details.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="form-container"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Create Account</h2>
      {error && <motion.p variants={itemVariants} className="error-message">{error}</motion.p>}
      <form onSubmit={handleSubmit}>
        <motion.div variants={itemVariants} className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </motion.div>
        <motion.div variants={itemVariants} className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>
        <motion.div variants={itemVariants} className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </motion.div>
        <motion.button
          variants={itemVariants}
          type="submit"
          className="button"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SignupForm;