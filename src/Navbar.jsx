import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/'); // Navigate to the homepage (now "Users")
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to the register page
    };

    const handleLogoutClick = () => {
        onLogout(); // Trigger logout logic
        navigate('/'); // Optionally navigate to the homepage after logout
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={handleHomeClick}>
                    Home (Users)
                </Button>

                {/* Conditionally render Login/Register or Logout based on authentication */}
                {!isAuthenticated ? (
                    <>
                        <Button color="inherit" onClick={handleLoginClick}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={handleRegisterClick}>
                            Register
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
