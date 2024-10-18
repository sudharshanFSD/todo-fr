import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://todo-backend-wwai.onrender.com/apiUser/register', { name, email, password });
            setSnackbar({ open: true, message: "User registered successfully", severity: 'success' });
            setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error("Registration error:", error);
            setSnackbar({ open: true, message: "Registration failed: " + (error.response?.data || "Unexpected error"), severity: 'error' });
        }
    };
    

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="sm" style={{marginTop:'100px'}}>
            <Typography variant='h4' gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Name" 
                    fullWidth 
                    margin='normal' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <TextField 
                    label="Email" 
                    fullWidth 
                    margin='normal' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    label="Password" 
                    type='password' 
                    fullWidth 
                    margin='normal' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type='submit' variant='contained' color='primary' fullWidth>
                    Register
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

export default Register;
