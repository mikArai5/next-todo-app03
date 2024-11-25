'use client';
import React, { useState } from 'react';
import { deleteTodo, getAllTodos, updateTodo } from '@/utils/supabaseFunctions';
import Link from 'next/link';
import Image from 'next/image';
import IconImage from '../../../../../public/icon_01.png';
import { useRouter } from 'next/navigation';

type Props = {
    todo: any;
}

type EditTodo = {
    id: number;
    title: string;
    status: string;
    detail: string;
    limit:  Date | string;
}

export default function TodoEdit (props: Props) {
    const { todo } = props;
    const [ todos, setTodos ] = useState<any>([]);
    const [ editTodo, setEditTodo ] = useState<EditTodo>({
        id: todo.id,
        title: todo.title,
        status: todo.status,
        detail: todo.detail,
        limit: todo.limit,
    });
    const router = useRouter();

    const handleTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedEditTodo = { ...editTodo, title: e.target.value }
        setEditTodo(changedEditTodo);
    }

    const handleDetailEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const changedEditTodo = { ...editTodo, detail: e.target.value }
        setEditTodo(changedEditTodo);
    }

    const handleLimitEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedEditTodo = { ...editTodo, limit: e.target.value }
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
        router.push('../../../../todos');
    }

    const onUpdateSubmit = async (id:number, title: string, status: string, detail: string, limit:  Date | string ) => {
        await updateTodo(id, title, status, detail, limit);
        const todos = await getAllTodos();
        setTodos(todos);
        router.push(`../../../../todos/${todo.id}`);
    }

    return (
        <div className='text-center mb-2 text-2xl font-medium mt-10 w400'>
            <div className="flex justify-between items-center">
                <h2 className="heading02 mb-0">
                    <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                    <p>{todo.id}</p>
                </h2>
                <Link className="link_btn" href="../../../../todos">一覧</Link>
            </div>
            <div className="flex list rounded-md mt-2 mb-2 p-2 justify-between relative">
                <div 
                    className='flex justify-between items-center w100p'
                    key={todo.id}
                >
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
                        <input
                            type="date"
                            value={editTodo.limit.toString().slice(0, 10)}
                            autoFocus
                            className='editForm w100p pl-1 mt-1 mb-1'
                            onChange={handleLimitEdit}
                        />
                    </div>
                    <span className="cursor-pointer delete_btn" onClick={() => handleDelete(todo.id)}>✖️</span>
                    <span className="cursor-pointer box_style update_btn" onClick={() => onUpdateSubmit( editTodo.id ,editTodo.title, editTodo.status, editTodo.detail, editTodo.limit)}>確定</span>
                </div>
            </div>
        </div>
    )
}
