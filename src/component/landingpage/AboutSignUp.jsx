import { Button, Container, Typography } from "@mui/material";

function AboutSignUp() {

    const handleLoginRedirect = async () => {
        try {
            window.location.href = '/loginpage';
        } catch (error) {
            console.error('Cannot find page', error);
        }
    };

    const handleSignUpRedirect = async () => {
        try {
            window.location.href = '/signuppage';
        } catch (error) {
            console.error('Cannot find page', error);
        }
    };

    return (
        <section id="about" className="about">
            <Container>
                <div className="row">
                    <Typography variant="h3" sx={{ fontFamily: 'Montserrat, sans-serif' }} className="title">
                        Try it yourself
                    </Typography>
                    <div className="content">
                        <p>
                            To try out the autograder, create an account on the [registration page/portal] using your [email address/school ID]. 
                            Log in with your credentials, then access the submission portal to upload your assignment files according to the [submission guidelines]. 
                            Submit your files to receive detailed feedback from the autograder.
                        </p>
                    </div>
                </div>
                <div id="about-signup" className="about-signup">
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#00989B', color: 'white', marginRight: '2%', width: '25%', height: '7vh', borderRadius: '10px', fontFamily: 'Montserrat, sans-serif' }}
                        onClick={handleSignUpRedirect}
                    >
                        Sign Up
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#00989B', color: 'white', width: '25%', height: '7vh', borderRadius: '10px', fontFamily: 'Montserrat, sans-serif' }}
                        onClick={handleLoginRedirect}
                    >
                        Log In
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export default AboutSignUp;
