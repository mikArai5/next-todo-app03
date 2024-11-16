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
}

const TodoList = (props: Props) => {
    const { todos, setTodos } = props;
    const [ editTodo, setEditTodo ] = useState<EditTodo>({
        id: 0,
        title: "",
    });

    const handleTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedEditTodo = { ...editTodo, title: e.target.value }
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

    const onUpdateSubmit = async (id:number, title: string) => {
        await updateTodo(id,title);
        const todos = await getAllTodos();
        setTodos(todos);
        window.location.reload();
    }

    return (
        <div>
            <ul className="mx-auto">
                {todos.map((todo) => (
                    <div key={todo.id} className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between">
                        {todo.id === editTodo.id ? 
                            <li>
                                <input
                                    type="text"
                                    value={editTodo.title}
                                    autoFocus
                                    className='editForm'
                                    onChange={handleTitleEdit}
                                    />
                            </li>
                            :
                            <li className="font-medium">✅ {todo.title}</li>
                        }
                        <span className="cursor-pointer" onClick={() => handleDelete(todo.id)}>✖️</span>
                        {todo.id === editTodo.id ? 
                            <span className="cursor-pointer" onClick={() => onUpdateSubmit( editTodo.id ,editTodo.title)}>確定</span>
                            :
                            <span className="cursor-pointer" onClick={() => onEdit(todo.id)}>更新</span>
                        }
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default TodoList