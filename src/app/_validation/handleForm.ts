import { createTasksSchema } from "@/app/_validation/tasks/create";
import { removeTasksSchema } from "@/app/_validation/tasks/remove";
import { updateTasksSchema } from "@/app/_validation/tasks/update";
import { updateTodosSchema } from "@/app/_validation/todo/update";
import { z } from "zod";

const handleFormSchema = z.object({
  create: z.object({
    tasks: createTasksSchema,
  }),
  update: z.object({
    todos: updateTodosSchema,
    tasks: updateTasksSchema,
  }),
  remove: z.object({
    tasks: removeTasksSchema,
  }),
});

export { handleFormSchema };

type HandleFormSchema = z.input<typeof handleFormSchema>;
type HandleFormOuput = z.output<typeof handleFormSchema>;

export type { HandleFormSchema, HandleFormOuput };
