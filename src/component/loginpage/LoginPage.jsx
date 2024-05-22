import React from "react";
import { Card, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import { CardCover } from "@mui/joy";
import imgLogin from '../../images/LI-Image.jpg';

function LoginPage() {
    return (
        <div className="App" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                textAlign: 'left', // Align text to the left
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
                                    <Button variant="contained" style={{ backgroundColor: '#00989B', color: 'white', marginTop: '10%', width: '50%', height: '7vh'  }}>Sign Up</Button>
                                </div>
                            </Box>
                        </CardCover>
                        <CardContent sx={{ flex: '1 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign:"left" }}>
                            <div className="section-1">
                                <Typography component="div" variant="h4" sx={{'@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                    Username 
                                </Typography>
                                <TextField id="outlined-basic" label="Username or Email" variant="outlined" sx={{ mt: 2, mb: 1, width: '100%' }} />
                            </div>
                            <div className="section-2">
                                <Typography component="div" variant="h4" sx={{'@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                    Password 
                                </Typography>
                                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" sx={{ mt: 2, mb: 1, width: '100%' }} />
                            </div>
                            <div className="buttons-2">
                                <Button variant="contained" style={{ backgroundColor: '#00989B', color: 'white', marginTop: '10%', marginRight: '10%', width: '50%', height: '7vh' }}>Log In with Google</Button>
                                <Button variant="contained" style={{ backgroundColor: '#00989B', color: 'white', marginTop: '10%', width: '50%', height: '7vh'  }}>Log In</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
