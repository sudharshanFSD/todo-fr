import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { Button, Typography, List, ListItem, ListItemText, Container, Paper, Alert } from '@mui/material';

const UserManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Access token not found.');
                // Clear error message after 1000ms
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
                return;
            }

            const response = await axios.get("https://todo-backend-wwai.onrender.com/apiProduct/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSaveTask = async (taskData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Access token not found.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
                return;
            }

            // Check for required fields
            if (!taskData.task || !taskData.description) {
                throw new Error('Task and description fields are required.');
            }

            const dataToSend = {
                task: taskData.task,
                description: taskData.description
            };

            if (currentTask) {
                await axios.put(`https://todo-backend-wwai.onrender.com/apiProduct/products/${currentTask._id}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.post("https://todo-backend-wwai.onrender.com/apiProduct/products", dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            fetchTasks();
            handleCloseForm();
        } catch (error) {
            console.error('Error saving task:', error.message);
        }
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setIsEditing(true);
    };

    const handleDeleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Access token not found.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
                return;
            }

            await axios.delete(`https://todo-backend-wwai.onrender.com/apiProduct/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setCurrentTask(null);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>Task Management</Typography>

            {errorMessage && (
                <Alert severity="error" style={{ marginBottom: '20px' }}>
                    {errorMessage}
                </Alert>
            )}

            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>Add Task</Button>
            </Paper>

            <List>
                {tasks.map(task => (
                    <ListItem key={task._id} secondaryAction={
                        <>
                            <Button onClick={() => handleEditTask(task)} color="primary">Edit</Button>
                            <Button onClick={() => handleDeleteTask(task._id)} color="secondary">Delete</Button>
                        </>
                    }>
                        <ListItemText 
                            primary={<Typography variant="h6">{task.name}</Typography>}
                            secondary={<Typography variant="body2">{task.description}</Typography>}
                        />
                    </ListItem>
                ))}
            </List>

            {isEditing && (
                <UserForm task={currentTask} onSave={handleSaveTask} onCancel={handleCloseForm} />
            )}
        </Container>
    );
};

export default UserManagement;
