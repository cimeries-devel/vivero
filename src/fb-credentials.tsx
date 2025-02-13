// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH-qT8g_DQhqWTmZbUXunD21j9sPBLGA0",
  authDomain: "vivero-39508.firebaseapp.com",
  databaseURL: "https://vivero-39508-default-rtdb.firebaseio.com",
  projectId: "vivero-39508",
  storageBucket: "vivero-39508.firebasestorage.app",
  messagingSenderId: "65647885855",
  appId: "1:65647885855:web:f2e3e7a5e77ef2629d1f2a",
  measurementId: "G-5WD5F3FHXM"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
