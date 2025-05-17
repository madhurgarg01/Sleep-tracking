// src/components/Sleep/SleepScheduleForm.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { setSleepSchedule, getSleepSchedule } from '../../services/sleepService';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const SleepScheduleForm = () => {
  const { currentUser } = useAuth();
  const [bedtime, setBedtime] = useState(''); // "HH:MM"
  const [wakeupTime, setWakeupTime] = useState(''); // "HH:MM"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      if (currentUser) {
        setLoading(true);
        const schedule = await getSleepSchedule(currentUser.uid);
        if (schedule) {
          setBedtime(schedule.bedtime || '');
          setWakeupTime(schedule.wakeupTime || '');
        }
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    setMessage('');
    try {
      await setSleepSchedule(currentUser.uid, { bedtime, wakeupTime });
      setMessage('Schedule updated successfully!');
      // Basic browser notification for bedtime (can be improved)
      if (Notification.permission === "granted" && bedtime) {
        // This is a very basic example. Real reminders need more sophisticated scheduling.
        new Notification("Bedtime Reminder", {
          body: `Time to get ready for bed! Your bedtime is ${bedtime}.`,
          icon: '/vite.svg' // Replace with your app icon
        });
      } else if (Notification.permission !== "denied" && bedtime) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
             new Notification("Bedtime Reminder Set", {
              body: `We'll remind you for your bedtime at ${bedtime}.`,
              icon: '/vite.svg'
            });
          }
        });
      }

    } catch (error) {
      setMessage('Failed to update schedule.');
      console.error(error);
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000); // Clear message after 3s
  };

  return (
    <motion.div className="card" variants={itemVariants}>
      <h3>Set Your Sleep Schedule</h3>
      {message && <p style={{color: message.startsWith('Failed') ? '#ff6b6b' : '#61dafb'}}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bedtime">Preferred Bedtime</label>
          <input
            type="time"
            id="bedtime"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="wakeupTime">Preferred Wake-up Time</label>
          <input
            type="time"
            id="wakeupTime"
            value={wakeupTime}
            onChange={(e) => setWakeupTime(e.target.value)}
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
          {loading ? 'Saving...' : 'Save Schedule'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SleepScheduleForm;