"user server";

import { eq, not } from "drizzle-orm";
import { db } from "../database/drizzle";
import { todo } from "../database/schema/todo";
import { revalidatePath } from "next/cache";

export const getData = async () => {
    const data = await db.select().from(todo);
    return data;
};

export const addTodo = async (id: number, text: string) => {
    await db.insert(todo).values({
        id: id,
        text: text,
    });
};

export const deleteTodo = async (id: number) => {
    await db.delete(todo).where(eq(todo.id, id));

    revalidatePath("/");
};

export const toggleTodo = async (id: number) => {
    await db
        .update(todo)
        .set({
            done: not(todo.done),
        })
        .where(eq(todo.id, id));

    revalidatePath("/");
}

export const editTodo = async (id: number, text: string) => {
    await db
        .update(todo)
        .set({
            text: text,
        })
        .where(eq(todo.id, id));

    revalidatePath("/");
}
