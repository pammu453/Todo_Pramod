import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { List, Checkbox, ListItemText, ListItem, IconButton, Box } from '@mui/material';
import { TodoContext } from '../context/todoContext';
import EditModel from './EditModel';

const TodoItem = ({ text, completed, onDelete, id }) => {
  const { toggleTodo } = useContext(TodoContext)
  const [open, setOpen] = useState(false);

  return <Box>
    <List sx={{
      backgroundColor: '#d1e0f0',
      borderRadius: 2,
      padding: 2,
      width: 500,
      border: 2
    }}>
      <ListItem>
        <Checkbox style={{ color: "green" }} checked={completed} onClick={() => toggleTodo(id)} />
        <ListItemText primary={text} />
        <IconButton style={{ color: "red" }} edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton style={{ color: "green" }} edge="end" aria-label="edit" onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </ListItem>
    </List>
    {
      open && <EditModel open={open} setOpen={setOpen} text={text} id={id} />
    }
  </Box>
};

export default TodoItem;
