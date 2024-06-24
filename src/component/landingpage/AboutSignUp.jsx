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
                            To try out Autograder, create an account through the registration page using your email address, 
                            or log in using your Google account through the login portal. New users will be prompted to 
                            choose an account type before gaining access.

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
