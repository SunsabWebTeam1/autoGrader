import { CardCover } from "@mui/joy";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import imgLogin from '../../images/LI-Image.jpg';
import { findStudent, findTeacher } from "../../services/AccountService";

function LoginPage() {
    const { onLogin, googleSignIn, user } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onLogin(email, password);
        try {
            const teacherResult = await findTeacher(user.uid);
            if (teacherResult.found) {
                window.location.href = `/homepage/teacher/${user.uid}`;
                return;
            }

            const studentResult = await findStudent(user.uid);
            if (studentResult.found) {
                window.location.href = `/homepage/student/${user.uid}`;
                return;
            }

            console.log('User is neither a teacher nor a student.');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleGoogleSubmit = async () => {
        await googleSignIn();
        try {
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Google login failed', error);
        }
    };

    useEffect(() => {
        const checkUserRole = async () => {
            if (isAuthenticated && user) {
                try {
                    const teacherResult = await findTeacher(user.uid);
                    if (teacherResult.found) {
                        window.location.href = `/homepage/teacher/${user.uid}`;
                        return;
                    }

                    const studentResult = await findStudent(user.uid);
                    if (studentResult.found) {
                        window.location.href = `/homepage/student/${user.uid}`;
                        return;
                    }

                    window.location.href = `/signupgooglepage`;
                } catch (error) {
                    console.error('Error checking user role:', error);
                }
            }
        };

        checkUserRole();
    }, [isAuthenticated]);

    console.log("User:", user);

    return (
        <div className="App">
            <div className="login">
                <div className="loginCard">
                    <Card sx={{ display: 'flex', position: 'relative', width: '100%', height: '80vh' }}>
                        <CardCover sx={{ flex: '1 0 50%', position: 'relative' }}>
                            <img src={imgLogin} alt="Login Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <Box sx={{ 
                                position: 'absolute', 
                                width: '100%', 
                                height: '100%', 
                                backgroundColor: 'rgba(36, 68, 49, 0.6)', 
                                top: 0, 
                                left: 0 
                            }} />
                            <Box sx={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: '50%', 
                                transform: 'translate(-50%, -50%)', 
                                zIndex: 1,
                                textAlign: 'left', 
                                color: 'white',
                                width: '90%', 
                            }}>
                                <Typography component="div" variant="h3" sx={{marginTop: '5%', '@media (max-width: 100vh)': { fontSize: 'calc(3.5vw + 5px)' }}}> 
                                    Welcome back
                                </Typography>
                                <br/>
                                <Typography component="div" variant="h4" sx={{marginTop: '0.23%', '@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                    Enter your username or email address
                                </Typography>
                                <br/>
                                <Typography component="div" variant="h4" sx={{marginTop: '0.10%', '@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                    New to AutoGrader? Create an account
                                </Typography>
                                <div className="buttons-1">
                                    <Button variant="contained"
                                     style={{ backgroundColor: '#00989B', 
                                     color: 'white', 
                                     marginTop: '10%', 
                                     width: '50%', 
                                     height: '7vh',
                                     borderRadius: '10px'  }}>Sign Up</Button>
                                </div>
                            </Box>
                        </CardCover>
                        <CardContent sx={{ flex: '1 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign:"left" }}>
                            <div className="section-1">
                                <Typography component="div" variant="h5" sx={{'@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                    Email 
                                </Typography>
                                <TextField 
                                id="outlined-basic" 
                                label="Username or Email" 
                                variant="outlined" 
                                sx={{ mt: 2, mb: 1, width: '100%' }} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="section-2">
                                <Typography component="div" variant="h5" sx={{'@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                    Password 
                                </Typography>
                                <TextField 
                                id="outlined-basic" 
                                label="Password"  
                                variant="outlined" 
                                sx={{ mt: 2, mb: 1, width: '100%' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="buttons-2">
                                <Button variant="contained" 
                                style={{ backgroundColor: '#00989B', 
                                color: 'white', 
                                marginTop: '10%', 
                                marginRight: '10%', 
                                width: '50%', 
                                height: '7vh',
                                borderRadius: '10px' }}
                                onClick={handleGoogleSubmit}>Log In with Google</Button>
                                
                                <Button variant="contained" 
                                style={{ backgroundColor: '#00989B', 
                                color: 'white', 
                                marginTop: '10%', 
                                width: '50%', 
                                height: '7vh',
                                borderRadius: '10px'  }}
                                onClick={handleSubmit}>Log In
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

