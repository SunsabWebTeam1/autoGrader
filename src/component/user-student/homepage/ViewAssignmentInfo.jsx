import { Button, Container, Typography } from "@mui/material";
import React from "react";

function SubmitAssignment() {
    const redirectCreateAssignment = async (e) => {
        window.location.href = `/student/upload-submission`;
    };

    return (
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <Typography variant="h3" className="title" sx={{ fontFamily: 'Montserrat, sans-serif'}}>
                        Submit Assignment
                    </Typography>
                    <div className="content">
                        {/* Placeholder text */}
                        <p>
                            To access an assignment, obtain the assignment code from your instructor. 
                            Once you have the code, you can view the assignment on its dedicated page. 
                            There, you'll find all the assignment details and can download any related content. 
                            To submit your assignment, upload your file and include the JUNIT test code provided by your instructor.
                            Your grade will be determined based on the test results.
                        </p>
                    </div>
                </div>
                <div id="about-createassignment" className="about-createassignment">
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#00989B',
                            color: 'white',
                            marginRight: '2%',
                            width: '25%',
                            height: '7vh',
                            borderRadius: '10px',
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={redirectCreateAssignment}
                    >
                        Go to Assignment
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export default SubmitAssignment;
