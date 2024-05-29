import { useEffect } from 'react';
import './App.css';

import { onAuthStateChanged } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from './component/Navbar';
import AddFile from './component/drop-file-input/AddFile';
import DropFile from './component/drop-file-input/DropFile';
import LandingPage from './component/landingpage/LandingPage';
import LoginPage from './component/loginpage/LoginPage';
import AddCredentialsPage from './component/signuppage/AddCredentialsPage';
import SignupGooglePage from './component/signuppage/SignupGoogle';
import SignupPage from './component/signuppage/SignupPage';
import HomepageStudent from './component/user-student/homepage/HomepageStudent';
import HomepageTeacher from './component/user-teacher/homepage/HomepageTeacher';
import UploadAssignment from './component/user-teacher/upload-assignment/UploadAssignmentpage';
import { StuProtected } from './context/StudentRoutes';
import { TeaProtected } from './context/TeacherRoutes';
import { auth } from './firebase';
import "./styling/style.css";

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
                <Route path="/DropFile" element={<DropFile />} />
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