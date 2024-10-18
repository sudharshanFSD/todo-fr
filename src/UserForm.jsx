import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserForm = ({ task, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // UseEffect to set fields based on the incoming task prop
    useEffect(() => {
        if (task) {
            setName(task.task); // Ensure this matches your backend
            setDescription(task.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that both fields are filled
        if (!name || !description) {
            alert('Task and description fields are required.');
            return; // Prevent submission if validation fails
        }

        // Call onSave with the correct field names
        onSave({ task: name, description }); // Ensure you are sending task and description
    };

    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
