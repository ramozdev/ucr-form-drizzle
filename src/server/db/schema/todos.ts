import { tasks } from "@/server/db/schema/tasks";
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const todos = mysqlTable("todos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 110 }).notNull(),
  description: varchar("description", { length: 256 }),
});

const todosRelations = relations(todos, ({ many }) => ({
  tasks: many(tasks),
}));

export { todos, todosRelations };
