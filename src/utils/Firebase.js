// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5z05rId5TVqu4_lXShlHetgafCOo6D2U",
  authDomain: "movie-matrix-80eda.firebaseapp.com",
  projectId: "movie-matrix-80eda",
  storageBucket: "movie-matrix-80eda.appspot.com",
  messagingSenderId: "904776507702",
  appId: "1:904776507702:web:6ee0a27a7767cf71485397",
  measurementId: "G-75PRP25242"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
