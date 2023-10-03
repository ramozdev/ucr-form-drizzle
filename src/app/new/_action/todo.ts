"use server";

import { type CreateTodoInput } from "@/app/new/validation";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";

export async function createTodo(data: CreateTodoInput["todo"]) {
  const response = await db.insert(todos).values(data);

  return Number(response.insertId);
}
