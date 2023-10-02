import { z } from "zod";

const createTasksSchema = z
  .object({
    name: z.string(),
    completed: z.boolean(),
  })
  .array();

export { createTasksSchema };

type CreateTasksInput = z.input<typeof createTasksSchema>;

export type { CreateTasksInput };
