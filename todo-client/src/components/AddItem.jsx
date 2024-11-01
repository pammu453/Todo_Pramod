import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { TodoContext } from '../context/todoContext';

const AddItem = () => {
    const [newTodo, setNewTodo] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { addTodo } = useContext(TodoContext)

    const handleAdd = () => {
        if (newTodo.trim() === "") {
            setShowAlert(true);
            return;
        }
        addTodo(newTodo)
        setNewTodo("")
        setShowAlert(false)
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: "column" }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="New To-Do"
                    variant="outlined"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: '56px' }}
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </Box>
            {
                showAlert && <Alert severity="error">Text field can't be null</Alert>
            }
        </Box>
    );
};

export default AddItem;
