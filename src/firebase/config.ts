// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//TODO: Get the code on Firebase console and paste it here
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);