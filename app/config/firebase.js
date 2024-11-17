import { initializeApp } from "firebase/app"; // Firebase initialization
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDyNdNENzeCOe15f3ymwyCdZjdl5QNK-38",
  authDomain: "style-sphere-e0df3.firebaseapp.com",
  projectId: "style-sphere-e0df3",
  storageBucket: "style-sphere-e0df3.firebasestorage.app",
  messagingSenderId: "187281874841",
  appId: "1:187281874841:web:7aabb8dfcf4da2e5b6fd08",
  measurementId: "G-V1373TNS1J",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for session persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore database
const db = getFirestore(app);

// Exports
export { auth, db, app };
export default app;
