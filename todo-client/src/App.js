import React, { useContext, useState } from 'react'
import TodoItem from './components/TodoItem'
import Box from '@mui/material/Box'
import AddItem from './components/AddItem'
import Title from './components/Title'
import { TodoContext } from './context/todoContext'
import SearchInput from './components/SearchInput'

const App = () => {
  const { todos, deleteTodo } = useContext(TodoContext)
  const [searchItem, setSearchItem] = useState('');

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      alignItems: "center",
      marginTop: 10
    }}>
      <Title />
      <AddItem />
      <SearchInput searchItem={searchItem} setSearchItem={setSearchItem} />
      {filteredTodos?.map((todo) => (
        <TodoItem
          key={todo._id}
          id={todo._id}
          text={todo.title}
          completed={todo.completed}
          onDelete={() => deleteTodo(todo._id)} />
      ))
      }
    </Box>
  )
}

export default App