// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // You can keep this if you plan to use Analytics
import { getAuth } from "firebase/auth";           // <--- ADD THIS
import { getFirestore } from "firebase/firestore"; // <--- ADD THIS

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4pOLDMM5fJNqX7mf3czRxCSeDThBKqps", // Consider using environment variables for this
  authDomain: "sleep-management.firebaseapp.com",
  projectId: "sleep-management",
  storageBucket: "sleep-management.appspot.com", // Corrected: .appspot.com is typical for storageBucket
  messagingSenderId: "200288668700",
  appId: "1:200288668700:web:1cd2222146a5a55abe63d9",
  measurementId: "G-GYF0XZ4TS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services that you need
const analytics = getAnalytics(app); // Keep if needed
export const auth = getAuth(app);    // <--- INITIALIZE AND EXPORT AUTH
export const db = getFirestore(app); // <--- INITIALIZE AND EXPORT FIRESTORE (db)

export default app; // You can still default export the app instance if needed elsewhere