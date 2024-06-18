import { Button, Container } from "@mui/material";
import React from "react";

function SubmitAssignment() {
    const redirectCreateAssignment = async (e) => {
        window.location.href = `/student/upload-submission`;
    }

    return (
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <h3 className="title">Submit Assignment</h3>
                    <div className="content">
                        {/*Placeholder text*/}
                        <p>
                        On the submission page, find and click the "Submit Code" button. A file upload dialog will appear, prompting you to choose the file containing your code from your computer. After selecting the file, click "Upload" to attach it to your submission. Make sure the correct file has been uploaded by checking the displayed file name on the page.

                        Next, scroll down to the "Test Case" section on the same page. Enter your test case data in the provided input fields, ensuring you follow the format specified in the assignment instructions. If multiple test cases are required, use the "Add Test Case" button to input additional cases. Double-check your test case data for accuracy.

                        Once you have uploaded your code and entered your test cases, review all the details to ensure everything is correct. Finally, click the "Submit Assignment" button to finalize your submission. You will receive a confirmation message indicating that your assignment has been successfully submitted.

                        Make sure your code file is named according to the assignment guidelines and that your test cases cover a range of scenarios to thoroughly test your code. If you encounter any issues during the submission process, contact technical support for assistance. Following these steps will help you efficiently submit your assignment and test cases through the system.
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
                    onClick={redirectCreateAssignment}>Go to Assignment</Button>
                </div>
            </Container>
        </section>
    )
}

export default  SubmitAssignment