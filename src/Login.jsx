import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://todo-backend-wwai.onrender.com/apiUser/login', { email, password });
            console.log("Response:", response); // Log the response
            localStorage.setItem('token', response.data.token); // Store token for future requests
            setSnackbar({ open: true, message: "Login successful", severity: 'success' });
            
            // Delay the navigation to allow Snackbar to show
            setTimeout(() => {
                navigate('/');
            }, 1000); // Adjust the delay as necessary
        } catch (error) {
            console.error("Login error:", error); // Log the error for debugging
            setSnackbar({ open: true, message: "Login failed: " + (error.response?.data?.message || "Unexpected error"), severity: 'error' });
        }
    };
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="sm" style={{marginTop:'100px'}}>
            <Typography variant='h4' gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" fullWidth margin='normal' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type='password' fullWidth margin='normal' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' variant='contained' color='primary' fullWidth>
                    Login
                </Button>
            </form>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Login;
