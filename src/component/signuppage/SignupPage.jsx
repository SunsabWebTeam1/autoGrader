import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import TeacherInfo from "./TeacherInfo";
import StudentInfo from "./StudentInfo";
import { Button } from "@mui/material";

function SignupPage() 
{
  const { accountType } = useParams();
  // State to keep track of selected account type
  const [selectedAccountType, setSelectedAccountType] = useState("");
  

  const handleStudentClick = () => {
    setSelectedAccountType("student");
  };

  const handleTeacherClick = () => {
    setSelectedAccountType("teacher");
  };

  useEffect(() => {
    setSelectedAccountType(accountType);
    console.log("Account Type:", accountType);
  }, [accountType]);

  const handleProceed = () => {
    if (selectedAccountType === "teacher") {
      // Redirect to teacher signup page with selectedAccountType parameter
      window.location.href = `/signuppage/${selectedAccountType}`;
    } else if (selectedAccountType === "student") {
      // Redirect to student signup page with selectedAccountType parameter
      window.location.href = `/signuppage/${selectedAccountType}`;
    }
  };
  

  return (
    <div className="App">
      <div className="signup">
        <div className="section-1">
          <h1 className="title">Choose Account Type</h1>
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
            }}
            onClick={handleProceed}
          >
            {selectedAccountType ? `Proceed as ${selectedAccountType}` : "Choose Account Type"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
