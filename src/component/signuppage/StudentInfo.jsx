import React, { useState } from "react";
import StudentIcon from "../../icons/Children.svg";
import { Button } from "@mui/material";

function StudentInfo({ onStudentClick, selected }) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    onStudentClick();
  };

  return (
    <div id="studentinfo" className="studentinfo">
      <div className="row">
        <h3 className="title">Student Account</h3>
        <div className="content">
            <div className="text">
                <p>
                    Students can view and submit assignments, track their progress, and
                    receive feedback from instructors. They can access course
                    materials, participate in discussions, and stay updated with
                    announcements. Students can also manage their profiles and
                    communicate with instructors and peers.
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
                marginTop: "4vh"
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
