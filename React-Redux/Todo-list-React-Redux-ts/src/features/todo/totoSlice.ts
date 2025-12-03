import { createSlice, nanoid } from "@reduxjs/toolkit";

interface todoType {
    id: string;
    text: string;
}

interface todoState {
    todos: todoType[];
}

// load totods from localStorage
const loadTodos = () => {
    try {
        const stored = localStorage.getItem("todos");
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.log(e);
        return [];
    }
};

const initialState: todoState = {
    todos: loadTodos(),
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    // reducers take properties and functions
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            };

            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },

        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
        },
    },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
