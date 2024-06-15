import { Button, Container } from "@mui/material";
import React from "react";

function CreateAssignmentInfo() {
    const redirectCreateAssignment = async (e) => {
        window.location.href = `/teacher/upload-instructions`;
    }

    return (
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <h3 className="title">How it works</h3>
                    <div className="content">
                        {/*Placeholder text*/}
                        <p>
                        To create an assignment for her students, 
                        a teacher can begin by clearly defining the learning objectives and the skills the 
                        assignment is intended to assess. Next, she should design tasks that align with these objectives, 
                        ensuring they are appropriately challenging and engaging. The assignment should include detailed instructions, 
                        a rubric for evaluation, and any necessary resources or materials. Additionally, the teacher can set a timeline 
                        for completion, including milestones for drafts or checkpoints to monitor progress. Providing opportunities for 
                        feedback and revision can also help enhance student learning and performance.
                        </p>
                    </div>
                </div>
                <div id="about-createassignment" className="about-createassignment">
                    <Button variant="contained" 
                    style={{ backgroundColor: '#00989B', 
                    color: 'white', 
                    marginRight: '2%', 
                    width: '25%', 
                    height: '7vh', 
                    borderRadius: '10px' }}
                    onClick={redirectCreateAssignment}>Upload Assignment</Button>
                </div>
            </Container>
        </section>
    )
}

export default  CreateAssignmentInfo