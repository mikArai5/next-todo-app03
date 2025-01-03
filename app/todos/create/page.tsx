'use client'
import { useState } from "react";
import { addTodo, getAllTodos } from "@/utils/supabaseFunctions";
import Image from "next/image";
import IconImage from "../../../public/icon_01.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const [ setTodos ] = useState<any>([]);
    const [ title, setTitle ] = useState<string>("");
    const [ detail, setDetail ] = useState<string>("");
    const [ limit, setLimit ] = useState<Date>(new Date());
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === "" || detail === "") return;
        
        await addTodo(title, detail, limit);
        const todos = await getAllTodos();
        setTodos(todos);
        setTitle("");
        setDetail("");
        setLimit(limit);
        router.push('/todos');
    }
    return (
        <>
            <section className="flex justify-center items-start h-screen">
                <div className="text-center mb-2 text-2xl font-medium mt-20">
                    <div className="flex justify-between items-center">
                        <h2 className="heading02 mb-0">
                            <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                            Todo作成
                        </h2>
                        <Link className="link_btn" href="../../todos">一覧</Link>
                    </div>
                    <form className="add_area mt-2" onSubmit={(e) => handleSubmit(e)}>
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
                        <p className="item_title mt-2">期限</p>
                        <input
                            type="date"
                            className="add_form w400"
                            value={limit.toISOString().slice(0, 10)}
                            onChange={(e) => setLimit(new Date(Date.parse(e.target.value)))}
                        />
                        <button
                            className="add_btn w400"
                        >
                            追加
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreatePage;