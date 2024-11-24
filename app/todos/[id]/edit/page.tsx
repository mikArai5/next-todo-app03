import Image from "next/image";
import Link from "next/link";
import IconImage from "../../../../public/icon_01.png";
import { getTodo } from "./actions";
import TodoEdit from "./components/TodoEdit";


type Props = {
    params: Promise<{
        id: number;
        title: string;
        detail: string;
        status: string;
    }>;
};

export default async function EditPage ({ params }: { params: Promise <{ id: number, title: string, detail: string, status: string }>}) {
    const { id } = await params;
    const todo = await getTodo(id);

    return (
        <>
            <div className="mt-10 mb-10">
                <main className="">
                    <div>
                        <section className="flex justify-center items-start h-screen">
                            <TodoEdit todo={todo} />
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};