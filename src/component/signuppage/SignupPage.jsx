import React, { useState, useEffect } from "react";
import TeacherInfo from "./TeacherInfo";
import StudentInfo from "./StudentInfo";
import { Button } from "@mui/material";

function SignupPage() {
  const [accountType, setAccountType] = useState("");

  const handleStudentClick = () => {
    setAccountType("student");
  };

  const handleTeacherClick = () => {
    setAccountType("teacher");
  };

  useEffect(() => {
    console.log("Account Type:", accountType);
  }, [accountType]);

  return (
    <div className="App">
      <div className="signup">
        <div className="section-1">
          <h1 className="title">Choose Account Type</h1>
        </div>
        <div className="section-2">
          <div className="signup-teacher">
            <TeacherInfo
              onTeacherClick={handleTeacherClick}
              selected={accountType}
            />
          </div>
          <div className="signup-student">
            <StudentInfo
              onStudentClick={handleStudentClick}
              selected={accountType}
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
            }}
          >
            {accountType ? `Proceed as ${accountType}` : "Choose Account Type"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
