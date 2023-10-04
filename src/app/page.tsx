import Form from "@/app/form";
import { getTodo } from "@/app/query";
import type { UcrTodoInput } from "@/app/validation";

export default async function Home() {
  const { tasks, ...todo } = await getTodo();

  const defaultData: UcrTodoInput = {
    todo: {
      todoId: {
        action: "ID",
        value: todo.id,
      },
      name: {
        action: "",
        value: todo.name,
      },
      description: {
        action: "",
        value: todo.description,
      },
    },

    tasks: tasks.map(({ completed, id, name }) => ({
      taskId: {
        action: "ID",
        value: id,
      },
      name: {
        action: "",
        value: name,
      },
      completed: {
        action: "",
        value: completed,
      },
    })),
  };

  return (
    <main className="mx-auto max-w-screen-md">
      <Form defaultData={defaultData} />
    </main>
  );
}
