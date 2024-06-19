import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, Fade, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import imgLogin from '../../images/LI-Image.jpg';
import { findStudent, findTeacher } from "../../services/AccountService";

function LoginPage() {
    const { onLogin, googleSignIn, user } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);  
    const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onLogin(email, password);
            const teacherResult = await findTeacher(user.uid);
            if (teacherResult.found) {
                navigate(`/homepage/teacher/${user.uid}`);
                return;
            }
            const studentResult = await findStudent(user.uid);
            if (studentResult.found) {
                navigate(`/homepage/student/${user.uid}`);
                return;
            }
            setError('User is neither a teacher nor a student.');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password.'); 
        }
    };

    const handleGoogleSubmit = async () => {
        try {
            await googleSignIn();
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Google login error:', error);
            setError('Google login failed.');  
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signuppage');
    };

    useEffect(() => {
        const checkUserRole = async () => {
            if (isAuthenticated && user) {
                try {
                    const teacherResult = await findTeacher(user.uid);
                    if (teacherResult.found) {
                        navigate(`/homepage/teacher/${user.uid}`);
                        return;
                    }
                    const studentResult = await findStudent(user.uid);
                    if (studentResult.found) {
                        navigate(`/homepage/student/${user.uid}`);
                        return;
                    }
                    navigate(`/signupgooglepage`);
                } catch (error) {
                    console.error('Error checking user role:', error);
                }
            }
        };

        checkUserRole();
    }, [isAuthenticated, navigate, user]);

    const clearError = () => {
        setError(null);  
    };

    return (
        <Fade in={true} timeout={1000}>
            <div className="App">
                <div className="login">
                    <div className="loginCard">
                        <Card sx={{ display: 'flex', position: 'relative', width: '100%', height: '80vh' }}>
                            <Box sx={{ flex: '1 0 50%', position: 'relative' }}>
                                <img src={imgLogin} alt="Login Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <Box sx={{ 
                                    position: 'absolute', 
                                    width: '100%', 
                                    height: '100%', 
                                    backgroundColor: 'rgba(0, 48, 54, 0.8)', 
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
                                    <Typography component="div" variant="h3" sx={{ 
                                        marginTop: '5%', 
                                        fontFamily: 'Montserrat, sans-serif',
                                        '@media (max-width: 100vh)': { fontSize: 'calc(3.5vw + 5px)' }}}> 
                                        Welcome back
                                    </Typography>
                                    <br/>
                                    <Typography component="div" variant="h4" sx={{ 
                                        marginTop: '0.23%', 
                                        fontFamily: 'Montserrat, sans-serif',
                                        '@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                        Enter your username or email address
                                    </Typography>
                                    <br/>
                                    <Typography component="div" variant="h4" sx={{ 
                                        marginTop: '0.10%', 
                                        fontFamily: 'Montserrat, sans-serif',
                                        '@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                        New to AutoGrader? Create an account
                                    </Typography>
                                    <div className="buttons-1">
                                        <Button variant="contained"
                                        style={{ backgroundColor: '#00989B', 
                                        color: 'white', 
                                        width: '50%', 
                                        height: '7vh',
                                        borderRadius: '10px',
                                        fontFamily: 'Montserrat, sans-serif' }}
                                        onClick={handleSignUpRedirect}>Sign Up</Button>
                                    </div>
                                </Box>
                            </Box>
                            <CardContent sx={{ flex: '1 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign:"left" }}>
                                <div className="section-1">
                                    <Typography component="div" variant="h5" sx={{ 
                                        fontFamily: 'Montserrat, sans-serif',
                                        '@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                        Email 
                                    </Typography>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Username or Email" 
                                        variant="outlined" 
                                        sx={{ mt: 2, mb: 1, width: '100%' }} 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="section-2">
                                    <Typography component="div" variant="h5" sx={{ 
                                        fontFamily: 'Montserrat, sans-serif',
                                        '@media (max-width: 100vh)': { fontSize: 'calc(1vw + 5px)' }}}>
                                        Password 
                                    </Typography>
                                    <TextField 
                                        id="outlined-password" 
                                        label="Password"  
                                        variant="outlined" 
                                        type={showPassword ? 'text' : 'password'}
                                        sx={{ mt: 2, mb: 1, width: '100%' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handlePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className="buttons-2" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10%' }}>
                                    <Button 
                                        variant="contained" 
                                        style={{ 
                                            backgroundColor: '#00989B', 
                                            color: 'white', 
                                            width: '48%', 
                                            height: '7vh',
                                            borderRadius: '10px',
                                            fontFamily: 'Montserrat, sans-serif' 
                                        }}
                                        onClick={handleGoogleSubmit}
                                    >
                                        Log In with Google
                                    </Button>
                                    
                                    <Button 
                                        variant="contained" 
                                        style={{ 
                                            backgroundColor: '#00989B', 
                                            color: 'white', 
                                            width: '48%', 
                                            height: '7vh',
                                            borderRadius: '10px',
                                            fontFamily: 'Montserrat, sans-serif'  
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Log In
                                    </Button>
                                </div>
                                {error && (
                                    <Alert severity="error" onClose={clearError} sx={{ mt: '20px' }}>
                                        {error}
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

export default LoginPage;
