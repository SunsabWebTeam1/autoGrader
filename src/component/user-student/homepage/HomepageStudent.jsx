import Fade from '@mui/material/Fade';
import React from "react";
import StudentHeader from "./StudentHeader";
import SubmitAssignment from "./ViewAssignmentInfo";

function HomepageStudent() {
    return (
        <Fade in={true} timeout={1000}>
            <div className="App">
                <StudentHeader />
                <SubmitAssignment />
            </div>
        </Fade>
    );
}

export default HomepageStudent;
