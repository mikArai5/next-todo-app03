import { prisma } from "@/prisma/client";

type Props = {
    params: Promise<{
            id: number;
            title: string;
            detail: string;
            status: string;
        }>;
    };


export const generateStaticParams = async () => {
    const todos = await prisma.todo.findMany();

    return todos.map((todo: any) => ({
        id: todo.id.toString()
    }));
};

export const getTodo = async (id: number) => {
    const todo = await prisma.todo.findUnique({
            where: { id },
        });
        return todo;
    };

export default async function Detail ({ params }: { params: Promise <{ id: number, title: string, detail: string, status: string }>}) {
    const { id } = await params;
    const todo = await getTodo(id);

    return (
        <div className="mt-10 mb-10">
            <main className="">
                <div>
                    <section className="flex justify-center items-start h-screen">
                        <div className="text-center mb-2 text-2xl font-medium mt-10">
                            <p>{todo.id}</p>
                            <h1>{todo.title}</h1>
                            <p>{todo.detail}</p>
                            <p>{todo.status}</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};