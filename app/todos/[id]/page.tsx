import { prisma } from "@/prisma/client";

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

export default async function Detail ({ params }: { params: { id: number, title: string, detail: string, status: string } }) {
    const todo = await getTodo(params.id);

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