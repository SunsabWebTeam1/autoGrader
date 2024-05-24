import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import LandingPage from './component/landingpage/LandingPage';
import AddFile from './component/drop-file-input/AddFile';
import LoginPage from './component/loginpage/LoginPage';
import SignupPage from './component/signuppage/SignupPage';
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import "./styling/style.css"
import Signup from './SignupAuth';
import Login from './Login';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
 

//firebase
function App() {
     
const Home = () => {
 
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])
 
}
    const location = useLocation();
    return(
        <div className="App">
            <Navbar/>
            <AnimatePresence mode="wait">
            <Routes location={location} key={location.path}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/landingpage" element={<LandingPage />} />
                <Route path="/addfile" element={<AddFile />} />
                <Route path="/loginpage" element={<LoginPage />} />
                <Route path="/signuppage" element={<SignupPage/>} />
            </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App;