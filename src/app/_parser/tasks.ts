import * as z from "zod";

export const taskModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  name: z.string(),
  completed: z.boolean(),
  todoId: z.number().transform((id) => id.toString()),
});
