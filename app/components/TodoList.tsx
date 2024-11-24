import React, { useState, useEffect } from 'react';
import { Todo } from '@/utils/interface';
import { deleteTodo, getAllTodos, updateTodo } from '@/utils/supabaseFunctions';
import Link from 'next/link';


type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<any>;
    filter: string;
}

type Todos = {
    id: number;
    title: string;
    status: string;
    detail: string;
}

type EditTodo = {
    id: number;
    title: string;
    status: string;
    detail: string;
}

const TodoList = (props: Props) => {
    const { todos, setTodos, filter } = props;
    const [filteredTodos, setFilteredTodos] = useState<Todos[]>([]);
    const [ editTodo, setEditTodo ] = useState<EditTodo>({
        id: 0,
        title: "",
        status: "",
        detail: "",
    });

    const handleTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedEditTodo = { ...editTodo, title: e.target.value }
        setEditTodo(changedEditTodo);
    }

    const handleDetailEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const changedEditTodo = { ...editTodo, detail: e.target.value }
        setEditTodo(changedEditTodo);
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedEditTodo = { ...editTodo, status: e.target.value }
        setEditTodo(changedEditTodo);
    }

    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        const todos = await getAllTodos();
        setTodos(todos);
    }

    const onEdit = async (id: number) => {
        const findTodo = todos.find(todo => todo.id === id);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        findTodo && setEditTodo(findTodo);
    }

    const onUpdateSubmit = async (id:number, title: string, status: string, detail: string) => {
        await updateTodo(id, title, status, detail);
        const todos = await getAllTodos();
        setTodos(todos);

        setEditTodo({
            id: 0,
            title: "",
            status: "",
            detail: "",
        })
    }

    useEffect(() => {
        const filteringTodos = () => {
        switch (filter) {
        case "未着手":
            setFilteredTodos(
            todos.filter((todo) => todo.status === "未着手")
            );
            break;
        case "進行中":
            setFilteredTodos(
            todos.filter((todo) => todo.status === "進行中")
            );
            break;
        case "完了":
            setFilteredTodos(
            todos.filter((todo) => todo.status === "完了")
            );
            break;
        case "全て":
            setFilteredTodos(todos);
            break;
        default:
            setFilteredTodos(todos);
        }
    };
    filteringTodos();
    }, [filter, todos]);

    return (
        <div className='w400 mAuto0'>
            <ul className="mx-auto">
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className="flex list rounded-md mt-2 mb-2 p-2 justify-between relative">
                        <li 
                            className='flex justify-between items-center w100p'
                            key={todo.id}
                        >
                            {todo.id === editTodo.id ? 
                                <div className='w80p edit_todo'>
                                    <select
                                        className='select_status box_style02'
                                        value={editTodo.status}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="未着手">未着手</option>
                                        <option value="進行中">進行中</option>
                                        <option value="完了">完了</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={editTodo.title}
                                        autoFocus
                                        className='editForm w100p pl-1 mt-1 mb-1'
                                        onChange={handleTitleEdit}
                                    />
                                    <textarea
                                        value={editTodo.detail}
                                        onChange={handleDetailEdit}
                                        className='w100p pl-1'
                                    />
                                </div>
                                :
                                <div className='w80p'>
                                    <p className='status'>{todo.status}</p>
                                    <p className='title'>{todo.title}</p>
                                    <p className='detail'>{todo.detail}</p>
                                </div>
                            }
                            <Link className='cursor-pointer box_style update_btn' href={`../todos/${todo.id}`}>詳細</Link>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default TodoList