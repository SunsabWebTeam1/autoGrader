import { Button, Fade, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { addAccount, findStudent, findTeacher } from "../../services/AccountService"; // Assuming these functions exist
import ErrorComponent from "../error-message/Error"; // Import the ErrorComponent
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";

function SignupGooglePage() {
  const { accountType } = useParams();
  const { user } = UserAuth(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [Render, setRender] = useState(false); // State to control rendering
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    setSelectedAccountType(accountType);
    console.log("Account Type:", accountType);

    // Check if user is authenticated
    if (user) {
      setRender(true);

      // Set the first and last name from displayName
      if (user.displayName) {
        const displayNameWords = user.displayName.split(' ');
        setFirstName(displayNameWords[0]);
        setLastName(displayNameWords.slice(1).join(' '));
      }

      // Check if user is already a student or teacher
      const checkUserType = async () => {
        try {
          const [teacherResult, studentResult] = await Promise.all([
            findTeacher(user.uid),
            findStudent(user.uid)
          ]);

          // If user is found as either, do not render the page
          if (teacherResult.found || studentResult.found) {
            setRender(false);
          }
        } catch (error) {
          console.error("Error checking user type:", error);
        }
      };

      checkUserType();
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
          setError('User not authenticated.'); // Set error state
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
            setError('Failed to add account. Please try again.'); // Set error state on failure
        }
    } else {
        setError('Please choose an account type.'); // Set error state if account type not selected
    }
  };

  if (!user || !Render) {
    return (
      <Fade in={true} timeout={1000}>
        <div className="App">
          <div className="signup">
            <ErrorComponent message="Error: Unauthorized access." />
          </div>
        </div>
      </Fade>
    );
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
            {error && <ErrorComponent message={error} />}  
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default SignupGooglePage;
