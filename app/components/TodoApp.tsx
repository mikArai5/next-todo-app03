'use client';
import React, { useState, useEffect } from "react";
import { getAllTodos, getAllTodosIdAsc, getAllTodosIdDesc, getAllTodosLimitAsc, getAllTodosLimitDesc } from "../../utils/supabaseFunctions";
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

    const showSortItems = () => {
        const sort_items = document.getElementById('sort_items')as HTMLInputElement;
        sort_items.style.display = "flex";
    }

    const sortAsc = () => {
        const sort_item = document.getElementById('sort_item')as HTMLInputElement;
        if (sort_item.value === 'id') {
            const getTodos = async () => {
                const todos = await getAllTodosIdAsc();
                setTodos(todos);
            };
            getTodos();
        } else if (sort_item.value === 'limit') {
            const getTodos = async () => {
                const todos = await getAllTodosLimitAsc();
                setTodos(todos);
            };
            getTodos();
        }
    }

    const sortDesc = () => {
        const sort_item = document.getElementById('sort_item')as HTMLInputElement;
        if (sort_item.value === 'id') {
            const getTodos = async () => {
                const todos = await getAllTodosIdDesc();
                setTodos(todos);
            };
            getTodos();
        } else if (sort_item.value === 'limit') {
            const getTodos = async () => {
                const todos = await getAllTodosLimitDesc();
                setTodos(todos);
            };
            getTodos();
        }
    }


    return (
        <div className="text-center mb-2 text-2xl font-medium mt-10 inner">
            <div className="flex justify-between items-center">
                <h2 className="heading02 mb-0">
                    <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                    Todo一覧
                </h2>
                <Link className="link_btn" href="../todos/create">作成</Link>
            </div>

            <div className="flex mt-2 font14 justify-between">
                <label htmlFor="" className="mr-10">
                    <select className="box_style" name="sort_item" id="sort_item" onChange={showSortItems}>
                        <option value=""></option>
                        <option value="id">id</option>
                        <option value="limit">期限</option>
                    </select>
                </label>
                <div id="sort_items" className="flex sort_items">
                    <div className="mr-3">
                        <input className="mr-2" type="radio" name="sort" onChange={sortAsc}/>
                        <label htmlFor="">昇順</label>
                    </div>
                    <div>
                        <input className="mr-2" type="radio" name="sort" onChange={sortDesc} />
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