"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateTodos(data: HandleFormOuput["update"]["todos"]) {
  for (const { todoId, ...todo } of data) {
    await db.update(todos).set(todo).where(eq(todos.id, todoId));
  }
}
