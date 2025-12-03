// step -1
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/totoSlice";

export const store = configureStore({ reducer: todoReducer });
