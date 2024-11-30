'use client'
import { useState } from 'react';
import { addComment } from '@/utils/supabaseFunctions';

type Props = {
    id: number;
    title: string;
    status: string;
    detail: string;
    limit: Date | string;
}

const CommentAdd = (props: Props) => {
    const { id } = props;
    const todo_id = id;
    const [ comment, setComment ] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment === "") return;
        await addComment(comment, todo_id);
        setComment("");
    }

    return (
        <>
            <div className="flex direction-column items-start list rounded-md mt-2 mb-2 p-2 justify-between relative">
                <form className='w100p' onSubmit={(e) => handleSubmit(e)}>
                    <p className="comment_ttl">コメント</p>
                    <input
                        id="comment"
                        type="text"
                        className="w100p comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="save_btn">保存</button>
                </form>
            </div>
        </>
    )
}

export default CommentAdd;