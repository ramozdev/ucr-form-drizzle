"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";

export async function createTasks(
  data: HandleFormSchema["create"]["tasks"],
  todoId: number,
) {
  if (data.length === 0) return;
  await db.insert(tasks).values(data.map((task) => ({ ...task, todoId })));
}
