'use client';
import React, { useState, useEffect } from "react";
import { getAllTodos } from "../../utils/supabaseFunctions";
import TodoList from "./TodoList";
import Image from "next/image";
import IconImage from "../../public/icon_01.png";
import Link from "next/link";

const TodoApp = () => {
    const [ todos, setTodos ] = useState<any>([]);
    const [ filter, setFilter ] = useState("未着手");

    useEffect(() => {
        const getTodos = async () => {
            const todos = await getAllTodos();
            setTodos(todos);
        };
        getTodos();
    },[]);

    return (
        <div className="text-center mb-2 text-2xl font-medium mt-10">
            <div className="flex justify-between items-center">
                <h2 className="heading02 mb-0">
                    <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                    Todo一覧
                </h2>
                <Link className="link_btn" href="../todos/create">作成</Link>
            </div>

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