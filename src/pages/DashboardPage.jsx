// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AnimatedPage from '../components/Core/AnimatedPage';
import SleepScheduleForm from '../components/Sleep/SleepScheduleForm';
import SleepLogForm from '../components/Sleep/SleepLogForm';
import SleepDataDisplay from '../components/Sleep/SleepDataDisplay';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation of child components
      delayChildren: 0.3,
    }
  }
};

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger data refresh

  const handleLogAdded = () => {
    setRefreshKey(prevKey => prevKey + 1); // Increment key to trigger useEffect in SleepDataDisplay
  };

  return (
    <AnimatedPage>
      <div className="container">
        <motion.h1
          style={{ color: '#61dafb', marginBottom: '2rem', fontWeight: 300, letterSpacing: '1px' }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          Welcome, {currentUser?.displayName || currentUser?.email}!
        </motion.h1>

        <motion.div
          className="dashboard-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SleepScheduleForm />
          <SleepLogForm onLogAdded={handleLogAdded} />
        </motion.div>

        <motion.div
          variants={containerVariants} // You can use same or different variants
          initial="hidden"
          animate="visible"
          style={{ marginTop: '2rem' }}
        >
          <SleepDataDisplay refreshTrigger={refreshKey} />
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default DashboardPage;