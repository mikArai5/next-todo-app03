
'use client'
import Image from "next/image";
import Link from "next/link";
import IconImage from "../../../../public/icon_01.png";
import { getTodo } from "./actions";
import { useState } from "react";

type Props = {
    params: Promise<{
        id: number;
        title: string;
        detail: string;
        status: string;
    }>;
};

type EditTodo = {
    id: number;
    title: string;
    status: string;
    detail: string;
}

export default async function EditPage ({ params }: { params: Promise <{ id: number, title: string, detail: string, status: string }>}) {
    const { id } = await params;
    const todo = await getTodo(id);

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

    return (
        <div className="mt-10 mb-10">
            <main className="">
                <div>
                    <section className="flex justify-center items-start h-screen">
                        <div className="text-center mb-2 text-2xl font-medium mt-10 w400">
                            <div className="flex justify-between items-center">
                                <h2 className="heading02 mb-0">
                                    <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                                    <p>{todo.id}</p>
                                </h2>
                                <Link className="link_btn" href="../../../todos">一覧</Link>
                            </div>
                            <div className="flex list rounded-md mt-2 mb-2 p-2 justify-between relative">
                                <div className="flex justify-between items-center w100p">
                                    <div className="w80p flex-start direction-column">
                                        <select
                                        className='select_status box_style02'
                                        value={todo.status}
                                        onChange={handleStatusChange}
                                        >
                                        <option value="未着手">未着手</option>
                                        <option value="進行中">進行中</option>
                                        <option value="完了">完了</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={todo.title}
                                            autoFocus
                                            className='editForm w100p pl-1 mt-1 mb-1'
                                            onChange={handleTitleEdit}
                                            />
                                        <textarea
                                            value={todo.detail}
                                            className='w100p pl-1'
                                            onChange={handleDetailEdit}
                                            />
                                    </div>
                                    <span className="cursor-pointer box_style update_btn">確定</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};