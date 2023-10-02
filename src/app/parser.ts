import { todoModelParser } from "@/app/_parser/todos";
import { taskModelParser } from "@/app/_parser/tasks";
import type { z } from "zod";

const todoParser = todoModelParser
  .pick({
    id: true,
    description: true,
    name: true,
  })
  .extend({
    tasks: taskModelParser
      .pick({
        completed: true,
        id: true,
        name: true,
      })
      .array(),
  });

type TodoParser = z.output<typeof todoParser>;

export { todoParser };

export type { TodoParser };
