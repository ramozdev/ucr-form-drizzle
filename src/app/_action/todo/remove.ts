"use server";

import {
  type RemoveTodosInput,
  removeTodosSchema,
} from "@/app/_validation/todo/remove";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeTodos(data: RemoveTodosInput) {
  const parsedData = removeTodosSchema.parse(data);

  for (const id of parsedData) {
    await db.delete(todos).where(eq(todos.id, id));
  }
}
