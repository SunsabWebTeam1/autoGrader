import { Container } from '@mui/material';
import imgDemo from '../../images/LP-Demo.png';
function About(){
    return(
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <h3 className="title">How it works</h3>
                    <div className="content">
                        {/*Placeholder text*/}
                        <p>
                        An autograder automates the grading of programming assignments by running predefined tests on submitted files. 
                        Students upload their files through a submission portal, where each file is tagged with metadata like student ID and timestamp. 
                        The autograder sets up the necessary environment and runs various tests, including unit, integration, and functional tests, 
                        in a controlled sandbox. Based on the test results, 
                        it calculates scores considering factors like correctness, efficiency, and code quality. Detailed feedback is generated, 
                        providing pass/fail outcomes, specific error messages, performance metrics, and comments on code style and best practices.  
                        </p>
                    </div>
                </div>
                <img src={imgDemo} alt="Demo" />
            </Container>
        </section>
    )
}

export default About;
