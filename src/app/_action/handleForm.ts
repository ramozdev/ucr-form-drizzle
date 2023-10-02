"use server";

import { createTasks } from "@/app/_action/tasks/create";
import { removeTasks } from "@/app/_action/tasks/remove";
import { updateTasks } from "@/app/_action/tasks/update";
import { updateTodos } from "@/app/_action/todo/update";
import { handleFormSchema } from "@/app/_validation/handleForm";

export async function handleForm(formData: unknown) {
  const { create, remove, update } = handleFormSchema.parse(formData);

  await removeTasks(remove.tasks);
  await updateTasks(update.tasks);
  await createTasks(create.tasks);
  await updateTodos(update.todos);
}
