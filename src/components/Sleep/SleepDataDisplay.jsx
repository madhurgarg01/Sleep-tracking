// src/components/Sleep/SleepDataDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRecentSleepLogs } from '../../services/sleepService';
import { motion, AnimatePresence } from 'framer-motion';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const SleepDataDisplay = ({ refreshTrigger }) => {
  const { currentUser } = useAuth();
  const [sleepLogs, setSleepLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageSleep, setAverageSleep] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      if (currentUser) {
        setLoading(true);
        const logs = await getRecentSleepLogs(currentUser.uid, 7); // Get last 7 logs
        setSleepLogs(logs);

        if (logs.length > 0) {
          const totalMinutes = logs.reduce((sum, log) => sum + log.durationMinutes, 0);
          setAverageSleep(totalMinutes / logs.length);
        } else {
          setAverageSleep(0);
        }
        setLoading(false);
      }
    };
    fetchLogs();
  }, [currentUser, refreshTrigger]); // Re-fetch when refreshTrigger changes

  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  if (loading) return <div className="card"><p>Loading sleep data...</p></div>;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Recent Sleep (Last 7 Entries)</h3>
      {sleepLogs.length > 0 ? (
        <>
          <p><strong>Average Sleep Duration:</strong> {formatDuration(Math.round(averageSleep))}</p>
          <motion.ul variants={listVariants} initial="hidden" animate="visible" style={{ listStyle: 'none', padding: 0 }}>
            <AnimatePresence>
              {sleepLogs.map(log => (
                // <motion.li
                //   key={log.id}
                //   className="sleep-log-item"
                //   variants={itemVariants}
                //   initial="hidden"
                //   animate="visible"
                //   exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                // >
                //   <p><strong>Date:</strong> {new Date(log.startTime).toLocaleDateString()}</p>
                //   <p><strong>Slept:</strong> {new Date(log.startTime).toLocaleTimeString()} - {new Date(log.endTime).toLocaleTimeString()}</p>
                //   <p><strong>Duration:</strong> {formatDuration(log.durationMinutes)}</p>
                // </motion.li>
                <motion.li
  key={log.id}
  className="sleep-log-item"
  layout // Important for reordering animations if the list changes dynamically
  initial={{ opacity: 0, y: 50, scale: 0.3 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>
  {/* ... content ... */}
</motion.li>

              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      ) : (
        <p>No sleep data logged yet for the past 7 entries.</p>
      )}
    </motion.div>
  );
};

export default SleepDataDisplay;