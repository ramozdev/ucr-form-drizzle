import { z } from "zod";

const createTodosSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .array();

export { createTodosSchema };

type CreateTodosInput = z.input<typeof createTodosSchema>;

export type { CreateTodosInput };
