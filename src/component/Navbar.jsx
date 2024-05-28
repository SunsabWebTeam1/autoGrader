import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { findStudent, findTeacher } from "../services/AccountService";

function Navbar() {
  const { logOut, user } = UserAuth();
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userId = user.uid;

          const studentResult = await findStudent(userId);
          if (studentResult.found) {
            setIsStudent(true);
          } else {
            const teacherResult = await findTeacher(userId);
            if (teacherResult.found) {
              setIsTeacher(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#212322" }}>
      <Toolbar>
        <img alt="Logo" style={{ height: "50px", marginRight: "auto" }} />
        {!user && (
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
        )}
        {user && (
          <>
            {isStudent && (
              <Typography variant="h6" sx={{ marginLeft: "20px" }}>
                <Link to={`/homepage/student/${user.uid}`} style={{ textDecoration: "none", color: "inherit" }}>Homepage</Link>
              </Typography>
            )}
            {isTeacher && (
              <Typography variant="h6" sx={{ marginLeft: "20px" }}>
                <Link to={`/homepage/teacher/${user.uid}`} style={{ textDecoration: "none", color: "inherit" }}>Homepage</Link>
              </Typography>
            )}
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={logOut}>Logout</Link>
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
