import { Button } from "@mui/material";

function AboutSignUp(){
    return (
        <section id="about" className="about">
            <div className="row">
                <h3 className="title">Try it yourself</h3>
                <div className="content">
                    {/*Placeholder text*/}
                    <p>
                    To try out the autograder, create an account on the [registration page/portal] using your [email address/school ID]. 
                    Log in with your credentials, then access the submission portal to upload your assignment files according to the [submission guidelines]. Submit your 
                    files to receive detailed feedback from the autograder
                    </p>
                </div>
            </div>
            <div id="about-signup" className="about-signup">
                <Button variant="contained" style={{ backgroundColor: '#00989B', color: 'white', marginTop: '10px', marginRight: '10px', width: '25%', height: '7vh' }}>Sign Up</Button>
                <Button variant="contained" style={{ backgroundColor: '#00989B', color: 'white', marginTop: '10px', width: '25%', height: '7vh'  }}>Log In</Button>
            </div>
        </section>
    )
}

export default AboutSignUp;
