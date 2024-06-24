import { Container, Typography } from '@mui/material';
import autograderDemo from '../../demo/LP-demo.mp4';

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
                <div className="demo">
                    <video controls width="100%" style={{ borderRadius: '8px' }}>
                        <source src={autograderDemo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </Container>
        </section>
    );
}

export default About;
