// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "victoire-s-store.firebaseapp.com",
  projectId: "victoire-s-store",
  storageBucket: "victoire-s-store.firebasestorage.app",
  messagingSenderId: "861164312899",
  appId: "1:861164312899:web:0007ae0aa987a7384e37f6",
  measurementId: "G-L9EJ0KH6DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);