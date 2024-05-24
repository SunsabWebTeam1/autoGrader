import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import StudentIcon from "../../icons/Children.svg";
import TeacherIcon from "../../icons/Teacher.svg";

function AddCredentialsPage() {
  const { accountType } = useParams();

  useEffect(() => {
    console.log("Selected Account Type:", accountType);
  }, [accountType]);

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
          > Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCredentialsPage;
