import { prisma } from "@/prisma/client";

export const getTodoAsc = async (id: number) => {
    const todo = await prisma.todo.findMany({
        orderBy: { 
            id: 'asc'
        },
    });
    return todo;
};