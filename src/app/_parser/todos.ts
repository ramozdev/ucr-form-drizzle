import * as z from "zod";

export const todoModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  name: z.string(),
  description: z.string(),
});
