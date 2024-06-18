import { Button, Container, Typography } from "@mui/material";
import React from "react";

function CreateAssignmentInfo() {
    const redirectCreateAssignment = async (e) => {
        window.location.href = `/teacher/upload-instructions`;
    };

    return (
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
                        Uploading Assignment 
                    </Typography>
                    <div className="content">
                        <p>
                            To upload an assignment, go to the upload assignment page and provide a description of the assignment, 
                            any content related to the assignment and a JUNIT test to be used to grade assignments. 
                            Uploaded content would be saved in firestore storage.                         
                        </p>
                    </div>
                </div>
                <div id="about-createassignment" className="about-createassignment">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#00989B', color: 'white', marginRight: '2%', width: '25%', height: '7vh', borderRadius: '10px', fontFamily: 'Montserrat, sans-serif' }}
                        onClick={redirectCreateAssignment}
                    >
                        Upload Assignment
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export default CreateAssignmentInfo;
