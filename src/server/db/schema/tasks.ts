import { todos } from "@/server/db/schema/todos";
import { relations } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  index,
  bigint,
  boolean,
  varchar,
} from "drizzle-orm/mysql-core";

const tasks = mysqlTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 110 }),
    completed: boolean("completed").default(false).notNull(),
    todoId: bigint("todoId", { mode: "number" }),
  },
  ({ todoId }) => ({
    todoIdIdx: index("todoId_idx").on(todoId),
  }),
);

const tasksRelations = relations(tasks, ({ one }) => ({
  todo: one(todos, {
    fields: [tasks.todoId],
    references: [todos.id],
  }),
}));

export { tasks, tasksRelations };
