import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, IconButton, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import StudentIcon from "../../icons/Children.svg";
import { addAccount } from "../../services/AccountService";

function AddCredentialsPageStudent() {
  const { userId } = useParams();
  const accountType = "student";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Selected Account Type:", accountType);
  }, [accountType, userId]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProceed = async (event) => {
    event.preventDefault(); 
    
    if (accountType) {
      if (!firstName || !lastName || !email || !password) {
        console.error("Please fill in all fields.");
        setError("Please fill in all fields.");
        return; 
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
  
        await signInWithEmailAndPassword(auth, email, password);
  
        const currentUser = auth.currentUser;
        console.log("Current User:", currentUser);
  
        const account = {
          firstName,
          lastName,
          accountType,
        };
  
        await addAccount(userId, account, accountType);
  
        console.log(`Account created for ${accountType}`);
        window.location.href = `/homepage/student/${userId}`; 
      } catch (error) {
        console.error("Error creating account:", error);
        setError("Error creating account. Please try again.");
      }
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      <div className="add-credentials">
        <div className="section-1">
          <Typography variant="h1" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
            Add Credentials
            <img src={StudentIcon} alt="Student Icon" className="icon" />
          </Typography>
        </div>
        <div className="content">
          <div className="section-2">
            <div className="section-2-1">
              <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
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
              <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
                Last Name
              </Typography>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                sx={{ mt: 2, mb: 1, width: "100%" }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="section-3">
            <div className="section-3-1">
              <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
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
              <Typography variant="h5" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
                Password
              </Typography>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                sx={{ mt: 2, mb: 1, width: "100%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
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
              borderRadius: '10px',
              fontFamily: 'Montserrat, sans-serif',
            }}
            onClick={handleProceed}
          >
            Proceed
          </Button>
          <div className="error-alert" 
            style={{
              marginTop: "5%",
              width: "40%",
              borderRadius: '10px',
            }}>
            {error && (
              <Alert severity="error" onClose={clearError}>
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCredentialsPageStudent;
