"use server";

import {
  type CreateTodosInput,
  createTodosSchema,
} from "@/app/_validation/todo/create";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";

export async function createTodos(formData: CreateTodosInput) {
  const parsedData = createTodosSchema.parse(formData);

  await db.insert(todos).values(parsedData);
}
