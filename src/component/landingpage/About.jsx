import { Container, Typography } from '@mui/material';
import imgDemo from '../../images/LP-Demo.png';

function About() {
    return (
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
                        How it works
                    </Typography>
                    <div className="content">
                        <p>
                        Autograder automates the grading of programming assignments through automated execution of JUNIT tests on submitted files. 
                        Teachers upload the assignment along with the JUNIT tests necessary for grading. Once uploaded, students can access the assignment 
                        and submit their work. Upon submission, the autograder runs the teacher's JUNIT tests to grade the student's assignment, providing pass/fail 
                        outcomes based on the results.
                        </p>
                    </div>
                </div>
                <img src={imgDemo} alt="Demo" />
            </Container>
        </section>
    );
}

export default About;
