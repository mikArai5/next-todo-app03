'use client';
import React, { useState, useEffect } from "react";
import { addTodo, getAllTodos } from "../../utils/supabaseFunctions";
import TodoList from "./TodoList";

const TodoApp = () => {
    const [ todos, setTodos ] = useState<any>([]);
    const [ title, setTitle ] = useState<string>("");

    useEffect(() => {
        const getTodos = async () => {
            const todos = await getAllTodos();
            setTodos(todos);
        };
        getTodos();
    },[]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "") return;
        
        await addTodo(title);
        const todos = await getAllTodos();
        setTodos(todos);
        setTitle("");
    }

    const changeAsc = () => {
        todos.map((todo: any) => {
            const id = todo.id;
            console.log(id);
        });
    };

    return (
        <section className="text-center mb-2 text-2xl font-medium">
            <h3>TodoApp</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    className="mr-2 shadow-lg p-1 outline-none"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <button
                    className="shadow-md boredr-2 px-1 py-1 rounded-lg bg-green-200"
                >
                    追加
                </button>
            </form>
            <div className="flex mt-2">
                <label htmlFor="" className="mr-10">
                    <select name="" id="">
                        <option value=""></option>
                        <option value="">id</option>
                        <option value="">期限</option>
                    </select>
                </label>
                <div className="mr-3">
                    <input className="mr-2" type="checkbox" onChange={changeAsc} />
                    <label htmlFor="">昇順</label>
                </div>
                <div>
                    <input className="mr-2" type="checkbox" />
                    <label htmlFor="">降順</label>
                </div>
            </div>
            <TodoList todos={todos} setTodos={setTodos}/>
        </section>
    )
}

export default TodoApp;