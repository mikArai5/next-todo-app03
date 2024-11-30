import Image from "next/image";
import Link from "next/link";
import IconImage from "../../../public/icon_01.png";
import { getTodo } from "./actions";
import CommentAdd from "./components/CommentAdd";

type Props = {
    params: Promise<{
        id: number;
        title: string;
        detail: string;
        status: string;
        limit: Date | string;
    }>;
};


export default async function Detail ({ params }: { params: Promise <{ id: number, title: string, detail: string, status: string, limit:  Date | string }>}) {
    const { id } = await params;
    const todo = await getTodo(id);

    return (
        <div className="mt-10 mb-10">
            <main className="">
                <div>
                    <section className="flex justify-center items-start h-screen">
                        <div className="text-center mb-2 text-2xl font-medium mt-10 w400">
                            <div className="flex justify-between items-center">
                                <h2 className="heading02 mb-0">
                                    <Image src={IconImage} className="mr-3" alt="アイコン" width={30} height={30}/>
                                    <p>{todo?.id}</p>
                                </h2>
                                <Link className="link_btn" href="../../todos">一覧</Link>
                            </div>
                            <div className="flex list rounded-md mt-2 mb-2 p-2 justify-between relative">
                                <div className="flex justify-between items-center w100p">
                                    <div className="w80p">
                                        <p className="status">{todo?.status}</p>
                                        <p className="title">{todo?.title}</p>
                                        <p className="detail">{todo?.detail}</p>
                                        <p className="limit">{todo?.limit?.toString().slice(0, 10)}</p>
                                    </div>
                                    <Link href={`../todos/${todo?.id}/edit`} className="cursor-pointer box_style update_btn">更新</Link>
                                </div>
                            </div>
                            <CommentAdd id={todo?.id} />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};