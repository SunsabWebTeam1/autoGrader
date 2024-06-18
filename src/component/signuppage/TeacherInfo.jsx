import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import TeacherIcon from "../../icons/Teacher.svg";

function TeacherInfo({ onTeacherClick, selected }) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    onTeacherClick();
  };

  return (
    <div id="teacherinfo" className="teacherinfo">
      <div className="row">
        <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
          Instructor Account
        </Typography>
        <div className="content">
          <div className="text">
            <p>
              Instructors can create and manage assignments. They can grade student submissions and monitor student progress. 
              Additionally, instructors can communicate with students regarding assignments and course materials.
            </p>
          </div>
          <div className="section-1">
            <img src={TeacherIcon} alt="Teacher Icon" className="teacher-icon" />
            <Button
              variant="contained"
              style={{
                backgroundColor: selected === "teacher" ? "#DDA960" : "#BEBEBE",
                color: "white",
                width: "50%",
                height: "7vh",
                marginTop: "7.5%",
                borderRadius: '10px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onClick={handleButtonClick}
            >
              I am a Teacher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
