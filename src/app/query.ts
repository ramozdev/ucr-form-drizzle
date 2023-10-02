import { notFound } from "next/navigation";
import { db } from "@/server/db";
import { todoParser } from "@/app/parser";

export async function getTodo() {
  const todoPayload = await db.query.todos.findFirst({
    columns: {
      id: true,
      description: true,
      name: true,
    },
    with: {
      tasks: {
        columns: {
          id: true,
          completed: true,
          name: true,
        },
      },
    },
  });

  if (!todoPayload) notFound();

  const data = todoParser.parse(todoPayload);

  return data;
}
