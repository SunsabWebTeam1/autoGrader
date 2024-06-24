import { Fade } from "@mui/material";
import React from "react";
import CreateAssignmentInfo from "./CreateAssignmentInfo";
import TeacherHeader from "./TeacherHeader";
function HomepageTeacher() {
    return (
        <Fade in={true} timeout={1000}>
            <div className="App">
                <TeacherHeader/>
                <CreateAssignmentInfo/>
            </div>
        </Fade>

    )
}

export default HomepageTeacher