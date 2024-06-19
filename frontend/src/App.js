import { useEffect } from 'react';
import './App.css';

import { onAuthStateChanged } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from './component/Navbar';
import LandingPage from './component/landingpage/LandingPage';
import LoginPage from './component/loginpage/LoginPage';
import AddCredentialsPage from './component/signuppage/AddCredentialsPage';
import SignupGooglePage from './component/signuppage/SignupGoogle';
import SignupPage from './component/signuppage/SignupPage';
import AddFile from './component/user-student/drop-file-submission/AddFile';
import HomepageStudent from './component/user-student/homepage/HomepageStudent';
import CreateAssignmentPage from './component/user-teacher/create-assignment-page/CreateAssignmentPage';
import DropFile from './component/user-teacher/drop-file-instruction/DropFile';
import HomepageTeacher from './component/user-teacher/homepage/HomepageTeacher';
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
                <Route path="/loginpage" element={<LoginPage />} />
                <Route path="/signuppage" element={<SignupPage/>} />
                <Route path="/signupgooglepage" element={<SignupGooglePage/>}/>
                <Route path="/signuppage/:accountType" element={<AddCredentialsPage/>}/>
                <Route path="/signuppage/:accountType" element={<AddCredentialsPage/>}/>
                <Route path="/homepage/teacher/:useruid" element={<TeaProtected><HomepageTeacher/></TeaProtected>}/>
                <Route path="/teacher/upload-instructions" element={<TeaProtected><DropFile/></TeaProtected>}/>
                {/*Placeholder page*/}
                <Route path="/teacher/create-assignment" element={<TeaProtected><CreateAssignmentPage/></TeaProtected>}/>
                <Route path="/homepage/student/:useruid" element={<StuProtected><HomepageStudent/></StuProtected>}/>
                <Route path="/student/upload-submission" element={<StuProtected><AddFile /></StuProtected>}/>



            </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App;