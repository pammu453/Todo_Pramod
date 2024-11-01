import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { TodoContext } from '../context/todoContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditModel = ({ open, setOpen, text, id }) => {
    const [editedText, setEditedText] = useState(text);
    const { editTodo } = useContext(TodoContext)

    const handleEdit = () => {
        editTodo(id, editedText)
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField
                    label="Edit To-Do"
                    variant="outlined"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    sx={{ width: "100%" }}
                />
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Button variant="contained" color="success" onClick={handleEdit}>Save</Button>
                    <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditModel