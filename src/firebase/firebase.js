// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWgWNbEbe3IeGO9z9iVOKGltwUUWcDLj4",
  authDomain: "autod-328f7.firebaseapp.com",
  projectId: "autod-328f7",
  storageBucket: "autod-328f7.appspot.com",
  messagingSenderId: "425723980665",
  appId: "1:425723980665:web:00d9a288353b94c5a69da8",
  measurementId: "G-78LRLZLL2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
