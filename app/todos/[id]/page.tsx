import { prisma } from "@/prisma/client";

export const generateStaticParams = async () => {
    const todos = await prisma.todo.findMany();
    console.log(prisma);

    return todos.map((todo: any) => ({
        id: todo.id,
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
        <div>
            <h1>{todo.title}</h1>
        </div>
    );
};