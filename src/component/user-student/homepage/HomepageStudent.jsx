import React from "react";
import AssignmentList from "./AssignmentList";
import StudentHeader from "./StudentHeader";
function HomepageStudent() {
    return (
        <div className="App">
            <StudentHeader/>
            <AssignmentList/>
        </div>
    )
}

export default HomepageStudent