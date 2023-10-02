import { z } from "zod";

const updateTodosSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .partial()
  .extend({
    todoId: z
      .string()
      .nonempty()
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateTodosSchema };

type UpdateTodosInput = z.input<typeof updateTodosSchema>;

export type { UpdateTodosInput };
