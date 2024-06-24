import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import StudentIcon from "../../icons/Children.svg";

function StudentInfo({ onStudentClick, selected }) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    onStudentClick();
  };

  return (
    <div id="studentinfo" className="studentinfo">
      <div className="row">
        <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
          Student Account
        </Typography>
        <div className="content">
          <div className="text">
            <p>
              Students can view and submit assignments, track their progress, and receive feedback from instructors. 
              They can access course materials, participate in discussions, and stay updated with announcements. 
            </p>
          </div>
          <div className="section-1">
            <img src={StudentIcon} alt="Student Icon" className="student-icon" />
            <Button
              variant="contained"
              style={{
                backgroundColor: selected === "student" ? "#DDA960" : "#BEBEBE",
                color: "white",
                width: "50%",
                height: "7vh",
                marginTop: "7.5%",
                borderRadius: '10px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onClick={handleButtonClick}
            >
              I am a Student
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;
