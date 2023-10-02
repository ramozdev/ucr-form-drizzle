import { z } from "zod";

const removeTasksSchema = z
  .string()
  .nonempty()
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeTasksSchema };

type RemoveTasksInput = z.input<typeof removeTasksSchema>;

export type { RemoveTasksInput };
