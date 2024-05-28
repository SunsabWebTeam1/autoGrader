import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import LandingPage from './component/landingpage/LandingPage';
import AddFile from './component/drop-file-input/AddFile';
import LoginPage from './component/loginpage/LoginPage';
import SignupPage from './component/signuppage/SignupPage';
import SignupGooglePage from './component/signuppage/SignupGoogle';
import AddCredentialsPage from './component/signuppage/AddCredentialsPage';
import HomepageStudent from './component/user-student/homepage/HomepageStudent';
import HomepageTeacher from './component/user-teacher/homepage/HomepageTeacher';
import UploadAssignment from './component/user-teacher/upload-assignment/UploadAssignmentpage';
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { TeaProtected } from './context/TeacherRoutes';
import { StuProtected } from './context/StudentRoutes';
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
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/addfile" element={<StuProtected><AddFile /></StuProtected>}/>
                <Route path="/loginpage" element={<LoginPage />} />
                <Route path="/signuppage" element={<SignupPage/>} />
                <Route path="/signupgooglepage" element={<SignupGooglePage/>}/>
                <Route path="/signuppage/:accountType" element={<AddCredentialsPage/>}/>
                <Route path="/signuppage/:accountType" element={<AddCredentialsPage/>}/>
                <Route path="/homepage/teacher/:useruid" element={<TeaProtected><HomepageTeacher/></TeaProtected>}/>
                <Route path="/homepage/teacher/uploadAssignment" element= {<UploadAssignment/>}/>
                <Route path="/homepage/student/:useruid" element={<StuProtected><HomepageStudent/></StuProtected>}/>
            </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App;