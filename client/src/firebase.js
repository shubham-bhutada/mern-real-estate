// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-439fb.firebaseapp.com",
  projectId: "mern-real-estate-439fb",
  storageBucket: "mern-real-estate-439fb.appspot.com",
  messagingSenderId: "276354581495",
  appId: "1:276354581495:web:9f40816a91da54ab30a4f2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);