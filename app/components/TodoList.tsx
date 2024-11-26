import React, { useState, useEffect } from 'react';
import { Todo } from '@/utils/interface';
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
    limit: Date | string;
}

const TodoList = (props: Props) => {
    const { todos, filter } = props;
    const [filteredTodos, setFilteredTodos] = useState<Todos[]>([]);

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
                            <div className='w80p'>
                                <div className='flex justify-between'>
                                    <p className='status'>{todo.status}</p>
                                    <p className='id'>{todo.id}</p>
                                </div>
                                <p className='title'>{todo.title}</p>
                                <p className='detail'>{todo.detail}</p>
                                <p className='limit'>期限：{todo.limit}</p>
                            </div>
                            <Link className='cursor-pointer box_style update_btn' href={`../todos/${todo.id}`}>詳細</Link>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default TodoList