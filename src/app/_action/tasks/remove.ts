"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeTasks(data: HandleFormOuput["remove"]["tasks"]) {
  for (const id of data) {
    await db.delete(tasks).where(eq(tasks.id, id));
  }
}
