import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWgWNbEbe3IeGO9z9iVOKGltwUUWcDLj4",
    authDomain: "autod-328f7.firebaseapp.com",
    projectId: "autod-328f7",
    storageBucket: "autod-328f7.appspot.com",
    messagingSenderId: "425723980665",
    appId: "1:425723980665:web:00d9a288353b94c5a69da8",
    measurementId: "G-78LRLZLL2Q"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app)