import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/totoSlice";
import { useState } from "react";

function Todos() {
    const todos = useSelector((state: any) => state.todos);
    const dispatch = useDispatch();

    const [editId, setEditId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>("");

    const startEdit = (todo: any) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    const saveEdit = () => {
        dispatch(updateTodo({ id: editId, text: editText }));
        setEditId(null);
        setEditText("");
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Todos</h2>

            <ul className="space-y-3">
                {todos.map((todo: any) => (
                    <li
                        key={todo.id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                    >
                        {editId === todo.id ? (
                            <>
                                {/* Editing Mode */}
                                <input
                                    className="px-2 py-1 border rounded w-full mr-2"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />

                                <button
                                    onClick={saveEdit}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition mr-2"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditId(null)}
                                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Normal View */}
                                <span className="text-lg">{todo.text}</span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(todo)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => dispatch(removeTodo(todo.id))}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        X
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todos;
