import React, { useState } from 'react';
import { Todo } from '@/utils/interface';
import { deleteTodo, getAllTodos, updateTodo } from '@/utils/supabaseFunctions';


type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<any>;
}

type EditTodo = {
    id: number;
    title: string;
    status: string;
    detail: string;
}

const TodoList = (props: Props) => {
    const { todos, setTodos } = props;
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
        console.log(findTodo);
    }

    const onUpdateSubmit = async (id:number, title: string, status: string, detail: string) => {
        await updateTodo(id, title, status, detail);
        const todos = await getAllTodos();
        setTodos(todos);
        window.location.reload();
    }

    return (
        <div className='w400 mAuto0'>
            <ul className="mx-auto">
                {todos.map((todo) => (
                    <div key={todo.id} className="flex list rounded-md mt-2 mb-2 p-2 justify-between relative">
                        <li 
                            className='w80p'
                            key={todo.id}
                        >
                            {todo.id === editTodo.id ? 
                                <>
                                    <select
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
                                        className='editForm'
                                        onChange={handleTitleEdit}
                                    />
                                    <textarea
                                        value={editTodo.detail}
                                        onChange={handleDetailEdit}
                                    />
                                </>
                                :
                                <>
                                    <p className='status'>{todo.status}</p>
                                    <p className='title'>{todo.title}</p>
                                    <p className='detail'>{todo.detail}</p>
                                </>
                            }
                        </li>
                        <span className="cursor-pointer delete_btn" onClick={() => handleDelete(todo.id)}>✖️</span>
                        {todo.id === editTodo.id ? 
                            <span className="cursor-pointer box_style update_btn" onClick={() => onUpdateSubmit( editTodo.id ,editTodo.title, editTodo.detail, editTodo.status)}>確定</span>
                            :
                            <span className="cursor-pointer box_style update_btn" onClick={() => onEdit(todo.id)}>更新</span>
                        }
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default TodoList