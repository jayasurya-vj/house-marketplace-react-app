// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8t-C8Tr95lu0WE5yW_vZ26US7zgHghvc",
  authDomain: "house-marketplace-react-3ffb3.firebaseapp.com",
  projectId: "house-marketplace-react-3ffb3",
  storageBucket: "house-marketplace-react-3ffb3.appspot.com",
  messagingSenderId: "177547435272",
  appId: "1:177547435272:web:0fa6570fd020ba67cce0bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();