import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { findStudent, findTeacher } from "../services/AccountService";

import logoDefault from '../../src/icons/Logo-default.svg';
import logoStudent from '../../src/icons/Logo-Student.svg';
import logoTeacher from '../../src/icons/Logo-Teacher.svg';

function Navbar() {
  const { logOut, user } = UserAuth();
  const [userType, setUserType] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoDefault); // Default logo

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userId = user.uid;

          const studentResult = await findStudent(userId);
          if (studentResult.found) {
            setUserType("student");
            setLogoSrc(logoStudent); // Set student logo
          } else {
            const teacherResult = await findTeacher(userId);
            if (teacherResult.found) {
              setUserType("teacher");
              setLogoSrc(logoTeacher); // Set teacher logo
            } else {
              setUserType("authenticated");
              setLogoSrc(logoDefault); // Set default logo for authenticated users
            }
          }
        } else {
          setUserType("unauthenticated");
          setLogoSrc(logoDefault); // Set default logo for unauthenticated users
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    setFadeIn(true); // Trigger the fade-in effect when the component mounts
  }, []);

  const renderNavbar = () => {
    if (!user) {
      return (
        <>
          <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif'}}>
            <Link to="/landingpage" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
          </Typography>
          <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
            <Link to="/loginpage" style={{ textDecoration: "none", color: "inherit" }}>Log In</Link>
          </Typography>
          <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
            <Link to="/signuppage" style={{ textDecoration: "none", color: "inherit" }}>Sign Up</Link>
          </Typography>
        </>
      );
    }
  
    switch (userType) {
      case "student":
        return (
          <>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to={`/homepage/student/${user.uid}`} style={{ textDecoration: "none", color: "inherit" }}>Homepage</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to="/student/upload-submission" style={{ textDecoration: "none", color: "inherit" }}>Submit Assignment</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        );
      case "teacher":
        return (
          <>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to={`/homepage/teacher/${user.uid}`} style={{ textDecoration: "none", color: "inherit" }}>Homepage</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to="/teacher/upload-instructions" style={{ textDecoration: "none", color: "inherit" }}>Upload Assignment</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        );
      case "authenticated":
        return (
          <>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to="/signupgooglepage" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Choose Account</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginRight: "20px", fontFamily: 'Montserrat, sans-serif' }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        );
      default:
        return null; 
    }
  };

  return (
      <AppBar position="static" sx={{ backgroundColor: "#212322" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoSrc} alt="Logo" style={{ height: '12vh', marginRight: '20px', paddingTop: '5%' }} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            {renderNavbar()}
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar;
