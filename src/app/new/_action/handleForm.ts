"use server";

import { createTasks } from "@/app/new/_action/task";
import { createTodo } from "@/app/new/_action/todo";
import { createTodoSchema } from "@/app/new/validation";

export async function handleForm(formData: unknown) {
  const { tasks, todo } = createTodoSchema.parse(formData);

  const todoId = await createTodo(todo);
  await createTasks(tasks, todoId);
}
