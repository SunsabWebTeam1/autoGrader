import React, { useEffect, useState } from "react";
import { addAccount } from "../../services/AccountService";
import { useParams } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import StudentIcon from "../../icons/Children.svg";
import TeacherIcon from "../../icons/Teacher.svg";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
function AddCredentialsPage() {
  const { accountType } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  useEffect(() => {
    console.log("Selected Account Type:", accountType);
  }, [accountType]);

  const handleProceed = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    if (accountType) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        
        await signInWithEmailAndPassword(auth, email, password);
        
        // Check authentication state
        const currentUser = auth.currentUser;
        console.log("Current User:", currentUser);
  
        // Prepare account data
        const account = {
          firstName,
          lastName,
          accountType,
        };
  
        // Add account to Firestore
        await addAccount(userId, account);
  
        console.log(`Account created for ${accountType}`);
        // Redirect to a dashboard or confirmation page if necessary
        window.location.href = `/dashboard`; // Adjust the redirect URL as needed
      } catch (error) {
        console.error("Error creating account:", error);
      }
    }
  };
  
  
  return (
    <div className="App">
      <div className="add-credentials">
        <div className="section-1">
          <h1 className="title">
            {accountType === "teacher" ? (
              <>
                Add Credentials
                <img src={TeacherIcon} alt="Teacher Icon" className="icon" />
              </>
            ) : (
              <>
                Add Credentials
                <img src={StudentIcon} alt="Student Icon" className="icon" />
              </>
            )}
          </h1>
        </div>
        <div className="content">
          <div className="section-2">
            <div className="section-2-1">
              <Typography component="div" variant="h5" className="title">
                First Name
              </Typography>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                sx={{ mt: 2, mb: 1, width: "100%" }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}

              />
            </div>
            <div className="section-2-1">
              <Typography component="div" variant="h5" className="title">
                Sir Name
              </Typography>
              <TextField
                id="outlined-basic"
                label="Sir Name"
                variant="outlined"
                sx={{ mt: 2, mb: 1, width: "100%" }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="section-3">
            <div className="section-3-1">
              <Typography component="div" variant="h5" className="title">
                Email
              </Typography>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ mt: 2, mb: 1, width: "100%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>
            <div className="section-3-1">
              <Typography component="div" variant="h5" className="title">
                Password
              </Typography>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                sx={{ mt: 2, mb: 1, width: "100%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="section-4">
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
          > Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCredentialsPage;
