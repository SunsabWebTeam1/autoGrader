import { Button, Fade, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { addAccount } from "../../services/AccountService";
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";

function SignupGooglePage() {
  const { accountType } = useParams();
  const { user } = UserAuth(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState("");

  useEffect(() => {
    setSelectedAccountType(accountType);
    console.log("Account Type:", accountType);

    // Set the first and last name from displayName
    if (user && user.displayName) {
      const displayNameWords = user.displayName.split(' ');
      setFirstName(displayNameWords[0]);
      setLastName(displayNameWords.slice(1).join(' '));
    }
  }, [accountType, user]);

  const handleStudentClick = () => {
    setSelectedAccountType("student");
  };

  const handleTeacherClick = () => {
    setSelectedAccountType("teacher");
  };

  const handleProceed = async () => {
    if (selectedAccountType === "teacher" || selectedAccountType === "student") {
        
        if (!user) {
          console.error("User not authenticated.");
          return;
        }

        // Construct account object with first name, last name, and account type
        const userId = user.uid;
        const account = {
            firstName: firstName,
            lastName: lastName,
            accountType: selectedAccountType,
        };
        
        // Run the addAccount function with the constructed account object
        try {
            await addAccount(userId, account, selectedAccountType);
            // Redirect to homepage based on selected account type
            window.location.href = `/homepage/${selectedAccountType}/${userId}`;
        } catch (error) {
            console.error("Error adding account:", error);
            // Handle error accordingly
        }
    }
  };


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

export default SignupGooglePage;
