import { Button } from "@mui/material";
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
        <h3 className="title">Instructor Account</h3>
        <div className="content">
            <div className="text">
                <p>
                    Instructors can create and manage assignments, set deadlines, and
                    update or delete existing tasks. They can grade student
                    submissions, provide feedback, and monitor student progress.
                    Additionally, instructors can manage course enrollment, send
                    announcements, and communicate with students regarding assignments
                    and course materials.
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
                marginTop: "4vh",
                borderRadius: '10px'
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
