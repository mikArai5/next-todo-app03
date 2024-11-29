import { prisma } from "@/prisma/client";

export const generateStaticParams = async () => {
    const todos = await prisma.todo.findMany();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return todos.map((todo: any) => ({
        id: todo.id.toString()
    }));
};

export const getTodo = async (id: number) => {
    const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id)
        },
    });
    return todo;
};

