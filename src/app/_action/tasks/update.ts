"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateTasks(data: HandleFormOuput["update"]["tasks"]) {
  for (const { taskId, ...task } of data) {
    await db.update(tasks).set(task).where(eq(tasks.id, taskId));
  }
}
