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