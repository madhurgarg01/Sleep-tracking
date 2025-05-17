// src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AnimatedPage from '../components/Core/AnimatedPage';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <AnimatedPage>
      <div className="container">
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2>User Profile</h2>
          {currentUser && (
            <>
              <p><strong>Display Name:</strong> {currentUser.displayName || 'Not set'}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>User ID:</strong> {currentUser.uid}</p>
              {/* Add forms for updating profile, password, etc. here */}
              <p style={{marginTop: '1rem', color: '#a0a0c0'}}>
                <em>More profile management features coming soon!</em>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default ProfilePage;