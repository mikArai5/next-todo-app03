import { supabase } from '../utils/supabase';

export const getAllTodos = async () => {
    const todos = await supabase
    .from("todo").select('*');
    return todos.data;
};

export const getAllTodosIdAsc = async () => {
    const todos = await supabase
    .from("todo").select('*')
    .order('id', { ascending: true });
    return todos.data;
};

export const getAllTodosIdDesc = async () => {
    const todos = await supabase
    .from("todo").select('*')
    .order('id', { ascending: false });
    return todos.data;
};

export const getAllTodosLimitAsc = async () => {
    const todos = await supabase
    .from("todo").select('*')
    .order('limit', { ascending: true });
    return todos.data;
};

export const getAllTodosLimitDesc = async () => {
    const todos = await supabase
    .from("todo").select('*')
    .order('limit', { ascending: false });
    return todos.data;
};

export const addTodo = async (title: string, detail: string, limit: Date | string ) => {
    console.log(title);
    await supabase.from("todo").insert({ title: title, detail: detail, limit: limit});
};

export const deleteTodo = async (id: number) => {
    await supabase.from("todo").delete().eq("id", id);
};

export const updateTodo = async (id: number, title: string, status: string, detail: string, limit:Date | string ) => {
    await supabase.from("todo").upsert({ 
        "id": id,
        "title": title,
        "status": status,
        "detail": detail,
        "limit": limit,
    });
};
