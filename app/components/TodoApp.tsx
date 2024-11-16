'use client';
import React, { useState, useEffect } from "react";
import { addTodo, getAllTodos } from "../../utils/supabaseFunctions";
import TodoList from "./TodoList";
import Image from "next/image";
import IconImage from "../../public/icon_01.png";

const TodoApp = () => {
    const [ todos, setTodos ] = useState<any>([]);
    const [ title, setTitle ] = useState<string>("");
    const [ detail, setDetail ] = useState<string>("");
    const [ filter, setFilter ] = useState("未着手");

    useEffect(() => {
        const getTodos = async () => {
            const todos = await getAllTodos();
            setTodos(todos);
        };
        getTodos();
    },[]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "" || detail === "") return;
        
        await addTodo(title, detail);
        const todos = await getAllTodos();
        setTodos(todos);
        setTitle("");
        setDetail("");
    }

    return (
        <div className="text-center mb-2 text-2xl font-medium mt-10">
            <h2 className="heading02">
                <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                TodoApp
            </h2>
            <form className="add_area" onSubmit={(e) => handleSubmit(e)}>
                <p className="item_title">タイトル</p>
                <input
                    type="text"
                    className="add_form w400"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <p className="item_title">詳細</p>
                <textarea
                    className="add_detail w400"
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                >
                </textarea>
                <button
                    className="add_btn w400"
                >
                    追加
                </button>
            </form>
            <div className="flex mt-2 font14 justify-between">
                <label htmlFor="" className="mr-10">
                    <select className="box_style" name="" id="">
                        <option value=""></option>
                        <option value="">id</option>
                        <option value="">期限</option>
                    </select>
                </label>
                <div className="flex">
                    <div className="mr-3">
                        <input className="mr-2" type="radio" name="sort"/>
                        <label htmlFor="">昇順</label>
                    </div>
                    <div>
                        <input className="mr-2" type="radio" name="sort" />
                        <label htmlFor="">降順</label>
                    </div>
                </div>
                <select
                    className="box_style"
                    name="status"
                    id=""
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="全て">全て</option>
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了">完了</option>
                </select>
            </div>
            <TodoList todos={todos} setTodos={setTodos} filter={filter} />
        </div>
    )
}

export default TodoApp;