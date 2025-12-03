import { createSlice, nanoid } from "@reduxjs/toolkit";

interface todoType {
    id: string;
    text: string;
}

interface todoState {
    todos: todoType[];
}

// Load todos from localStorage
const loadTodos = () => {
    try {
        const stored = localStorage.getItem("todos");
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.log(e);
        return [];
    }
};

// Helper function to save todos to localStorage
const saveTodos = (todos: todoType[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState: todoState = {
    todos: loadTodos(),
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload,
            };
            state.todos.push(newTodo);

            saveTodos(state.todos);
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);

            saveTodos(state.todos);
        },

        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );

            saveTodos(state.todos); 
        },
    },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
