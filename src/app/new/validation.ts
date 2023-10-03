import { z } from "zod";

const createTodoSchema = z.object({
  todo: z.object({
    name: z.string().nonempty(),
    description: z
      .string()
      .transform((val) => (val === "" ? null : val))
      .nullish(),
  }),
  tasks: z
    .object({
      name: z.string().nonempty(),
      completed: z.boolean(),
    })
    .array(),
});

export { createTodoSchema };

type CreateTodoInput = z.input<typeof createTodoSchema>;

export type { CreateTodoInput };
