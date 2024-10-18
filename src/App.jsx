import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import path as necessary
import Login from './Login'; // Your Login component
import Register from './Register'; // Your Register component
import UserManagement from './UserManagement'; // Your User Management component

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token on logout
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} />
            <Routes>
                {/* Set UserManagement as the homepage */}
                <Route path="/" element={<UserManagement />} /> 

                {/* Other routes */}
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
