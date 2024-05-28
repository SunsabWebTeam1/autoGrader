import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { findStudent, findTeacher } from "../services/AccountService";

function Navbar() {
  const { logOut, user } = UserAuth();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userId = user.uid;

          const studentResult = await findStudent(userId);
          if (studentResult.found) {
            setUserType("student");
          } else {
            const teacherResult = await findTeacher(userId);
            if (teacherResult.found) {
              setUserType("teacher");
            } else {
              setUserType("authenticated");
            }
          }
        } else {
          setUserType("unauthenticated");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const renderNavbar = () => {
    if (!user) {
      return (
        <>
          <Typography variant="h6" sx={{ marginLeft: "20px" }}>
            <Link to="/landingpage" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
          </Typography>
          <Typography variant="h6" sx={{ marginLeft: "20px" }}>
            <Link to="/loginpage" style={{ textDecoration: "none", color: "inherit" }}>Log In</Link>
          </Typography>
          <Typography variant="h6" sx={{ marginLeft: "20px" }}>
            <Link to="/signuppage" style={{ textDecoration: "none", color: "inherit" }}>Sign Up</Link>
          </Typography>
        </>
      );
    }
  
    switch (userType) {
      case "student":
        return (
          <>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <Link to={`/homepage/student/${user.uid}`} style={{ textDecoration: "none", color: "inherit" }}>Homepage</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        );
      case "teacher":
        return (
          <>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <Link to={`/homepage/teacher/${user.uid}`} style={{ textDecoration: "none", color: "inherit" }}>Homepage</Link>
            </Typography>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        );
      case "authenticated":
        return (
          <>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        );
      default:
        return null; // Return null for unknown userType
    }
  };
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "#212322" }}>
      <Toolbar>
        <img alt="Logo" style={{ height: "50px", marginRight: "auto" }} />
        {renderNavbar()}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
