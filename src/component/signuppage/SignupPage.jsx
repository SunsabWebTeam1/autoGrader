import { Button, Fade, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import ErrorComponent from "../error-message/Error"; // Import the ErrorComponent
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";

function SignupPage() {
  const { user } = UserAuth(); // Use your authentication context
  const { accountType } = useParams();
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const [Render, setRender] = useState(false); // State to control rendering

  useEffect(() => {
    setSelectedAccountType(accountType);
    console.log("Account Type:", accountType);

    // Check if the user is signed in and set error accordingly
    if (user) {
      setError('You are already signed in.');
    } else {
      setRender(true);
    }
  }, [accountType, user]);

  const handleStudentClick = () => {
    setSelectedAccountType("student");
  };

  const handleTeacherClick = () => {
    setSelectedAccountType("teacher");
  };

  const handleProceed = () => {
    if (selectedAccountType === "teacher" || selectedAccountType === "student") {
      window.location.href = `/signuppage/${selectedAccountType}`;
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <ErrorComponent message={error} />
      </div>
    );
  }

  if (!Render) {
    return null;  
  }

  return (
    <Fade in={true} timeout={1000}>
      <div className="App">
        <div className="signup">
          <div className="section-1">
            <Typography variant="h1" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
              Choose Account Type
            </Typography>
          </div>
          <div className="section-2">
            <div className="section-2-teacher">
              <TeacherInfo
                onTeacherClick={handleTeacherClick}
                selected={selectedAccountType}
              />
            </div>
            <div className="section-3-student">
              <StudentInfo
                onStudentClick={handleStudentClick}
                selected={selectedAccountType}
              />
            </div>
          </div>
          <div className="section-3">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#00989B",
                color: "white",
                marginTop: "5%",
                width: "25%",
                height: "7vh",
                borderRadius: '10px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onClick={handleProceed}
            >
              {selectedAccountType ? `Proceed as ${selectedAccountType}` : "Choose Account Type"}
            </Button>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default SignupPage;
