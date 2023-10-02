import { z } from "zod";

const removeTodosSchema = z
  .string()
  .nonempty()
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeTodosSchema };

type RemoveTodosInput = z.input<typeof removeTodosSchema>;

export type { RemoveTodosInput };
