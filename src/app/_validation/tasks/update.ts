import { z } from "zod";

const updateTasksSchema = z
  .object({
    name: z.string(),
    completed: z.boolean(),
  })
  .partial()
  .extend({
    taskId: z
      .string()
      .nonempty()
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateTasksSchema };

type UpdateTasksInput = z.input<typeof updateTasksSchema>;

export type { UpdateTasksInput };
