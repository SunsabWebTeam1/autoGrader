import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import ErrorIcon from '../../icons/Error.svg'; // Ensure this path is correct

const ErrorComponent = ({ message }) => {
  return (
    <div className='App'>
        <Container>
            <div className="error-container">
                <div className="error-icon">
                    <img src={ErrorIcon} alt="Error Icon" width="50" height="50" />
                </div>
                <Typography variant="h2" className="error-message" sx={{fontFamily: 'Montserrat, sans-serif'}}>
                    {message}
                </Typography>
            </div>
        </Container>
    </div>
  );
};

export default ErrorComponent;
