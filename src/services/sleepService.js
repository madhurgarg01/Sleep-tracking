// src/services/sleepService.js
import { db } from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

// --- Sleep Schedule ---
export const setSleepSchedule = async (userId, scheduleData) => {
  // scheduleData: { bedtime: "HH:MM", wakeupTime: "HH:MM" }
  const scheduleRef = doc(db, 'schedules', userId);
  await setDoc(scheduleRef, scheduleData, { merge: true }); // merge:true to update if exists
};

export const getSleepSchedule = async (userId) => {
  const scheduleRef = doc(db, 'schedules', userId);
  const docSnap = await getDoc(scheduleRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null; // Or default schedule
  }
};

// --- Sleep Logging ---
export const logSleep = async (userId, sleepLogData) => {
  // sleepLogData: { startTime: Date object, endTime: Date object }
  const logsCollectionRef = collection(db, 'sleepLogs', userId, 'logs');

  const startTimestamp = Timestamp.fromDate(sleepLogData.startTime);
  const endTimestamp = Timestamp.fromDate(sleepLogData.endTime);

  const durationMs = sleepLogData.endTime.getTime() - sleepLogData.startTime.getTime();
  const durationMinutes = Math.round(durationMs / (1000 * 60));

  await addDoc(logsCollectionRef, {
    startTime: startTimestamp,
    endTime: endTimestamp,
    durationMinutes: durationMinutes,
    loggedAt: serverTimestamp() // Automatically set server-side timestamp
  });
};

export const getRecentSleepLogs = async (userId, count = 7) => {
  const logsCollectionRef = collection(db, 'sleepLogs', userId, 'logs');
  const q = query(logsCollectionRef, orderBy('startTime', 'desc'), limit(count));

  const querySnapshot = await getDocs(q);
  const logs = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    logs.push({
      id: doc.id,
      ...data,
      // Convert Timestamps back to JS Date objects for easier use in components
      startTime: data.startTime.toDate(),
      endTime: data.endTime.toDate(),
      loggedAt: data.loggedAt ? data.loggedAt.toDate() : new Date() // Handle potential null
    });
  });
  return logs;
};