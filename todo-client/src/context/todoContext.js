import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const TodoContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return action.payload;

        case "ADD_TODO":
            return [...state, action.payload];

        case "TOGGLE_TODO":
            return state.map((todo) =>
                todo._id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );

        case "DELETE_TODO":
            return state.filter((todo) => todo._id !== action.payload);

        case "EDIT_TODO":
            return state.map((todo) =>
                todo._id === action.payload.id ? { ...todo, title: action.payload.editedText } : todo
            );

        default:
            return state;
    }
};

const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(reducer, initialState);

    // Load initial todos from the API
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api");
                dispatch({ type: "SET_TODOS", payload: response.data });
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);

    // API call for adding a new todo
    const addTodo = async (title) => {
        try {
            const response = await axios.post("http://localhost:5000/api", { title });
            dispatch({ type: "ADD_TODO", payload: response.data });
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // API call for toggling a todo's completion
    const toggleTodo = async (id) => {
        console.log(id)
        try {
            await axios.put(`http://localhost:5000/api/toggle/${id}`);
            dispatch({ type: "TOGGLE_TODO", payload: id });
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    // API call for deleting a todo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/${id}`);
            dispatch({ type: "DELETE_TODO", payload: id });
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // API call for editing a todo
    const editTodo = async (id, editedText) => {
        try {
            await axios.put(`http://localhost:5000/api/edit/${id}`, { title: editedText });
            dispatch({ type: "EDIT_TODO", payload: { id, editedText } });
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
