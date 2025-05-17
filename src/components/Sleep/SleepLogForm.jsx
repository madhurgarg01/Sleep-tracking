// src/components/Sleep/SleepLogForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { logSleep } from '../../services/sleepService';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const SleepLogForm = ({ onLogAdded }) => {
  const { currentUser } = useAuth();
  const [startTime, setStartTime] = useState(''); // ISO string format from datetime-local
  const [endTime, setEndTime] = useState('');   // ISO string format
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !startTime || !endTime) return;

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (endDate <= startDate) {
      setMessage('End time must be after start time.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await logSleep(currentUser.uid, { startTime: startDate, endTime: endDate });
      setMessage('Sleep logged successfully!');
      setStartTime('');
      setEndTime('');
      if(onLogAdded) onLogAdded(); // Callback to refresh data on parent
    } catch (error) {
      setMessage('Failed to log sleep.');
      console.error(error);
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <motion.div className="card" variants={itemVariants}>
      <h3>Log Your Sleep</h3>
      {message && <p style={{color: message.startsWith('Failed') ? '#ff6b6b' : '#61dafb'}}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startTime">Sleep Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">Sleep End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <motion.button
          type="submit"
          className="button"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Logging...' : 'Log Sleep'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SleepLogForm;