import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/totoSlice";

function AddTodo() {
    const [input, setInput] = useState<string>("");

    const dispath = useDispatch();

    const addTodoHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input) {
            alert("Filed is empty enter your todo");
            return;
        }
        dispath(addTodo(input));
        setInput("");
    };

    return (
        <div className="flex justify-center mt-10">
            <form
                onSubmit={addTodoHandler}
                className="bg-gray-200 p-4 rounded-xl flex gap-3 shadow-md"
            >
                <input
                    type="text"
                    placeholder="Enter todo....."
                    className="input px-3 py-2 rounded-lg outline-none border border-green-300"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-100 transition"
                >
                    ADD
                </button>
            </form>
        </div>
    );
}

export default AddTodo;
