"use client";

import { type CudTodoInput, cudTodoSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import {
  processArrayCreate,
  processArrayRemove,
  processArrayUpdate,
  processObjectUpdate,
} from "@/lib/cud";
import { handleForm } from "@/app/_action/handleForm";

type Props = {
  defaultData?: CudTodoInput;
};

export default function Form({ defaultData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { defaultValues },
  } = useForm<CudTodoInput>({
    defaultValues: defaultData,
    resolver: zodResolver(cudTodoSchema, undefined, { raw: true }),
  });

  const debugPayload = {
    update: {
      todos: processObjectUpdate(watch("todo")),
      tasks: processArrayUpdate(watch("tasks")),
    },
    remove: {
      tasks: processArrayRemove(watch("tasks")),
    },
    create: {
      tasks: processArrayCreate(watch("tasks")),
    },
  };

  const onSubmit = handleSubmit(({ todo, tasks }) => {
    startTransition(() => {
      const payload = {
        update: {
          todos: processObjectUpdate(todo),
          tasks: processArrayUpdate(tasks),
        },
        remove: {
          tasks: processArrayRemove(tasks),
        },
        create: {
          tasks: processArrayCreate(tasks),
        },
      };

      handleForm(payload).catch((err) => {
        if (err instanceof Error) {
          console.error(err.message);
        }
      });
    });
  });

  const _tasks = useFieldArray({ control, name: "tasks", keyName: "_id" });

  return (
    <main className="mx-auto max-w-screen-md">
      <form onSubmit={(e) => void onSubmit(e)} className="grid">
        <label>TODOS</label>
        <input
          {...register("todo.name.value", {
            onChange: ({ target }) => {
              const { value } = target as HTMLInputElement;
              setValue(`todo.name.value`, value);
              if (value !== defaultValues?.todo?.name?.value) {
                setValue(`todo.name.action`, `UPDATE`);
                return;
              }
              setValue(`todo.name.action`, "");
            },
          })}
        />

        <div className="mb-4">
          {_tasks.fields.map((field, index) => {
            if (field.name.action === "REMOVE") return null;

            return (
              <div key={field._id}>
                <div className="flex gap-2">
                  <div>
                    <label htmlFor={`tasks.${index}.name.value`}>Name</label>
                    <input
                      {...register(`tasks.${index}.name.value`, {
                        onChange: ({ target }) => {
                          const { value } = target as HTMLInputElement;
                          setValue(`tasks.${index}.name.value`, value);
                          if (field.taskId.action !== "CREATE") {
                            if (
                              value ===
                              defaultValues?.tasks?.[index]?.name?.value
                            ) {
                              setValue(`tasks.${index}.name.action`, "");
                              return;
                            }
                            setValue(`tasks.${index}.name.action`, `UPDATE`);
                          }
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor={`tasks.${index}.completed.value`}>
                      Completed
                    </label>
                    <input
                      type="checkbox"
                      {...register(`tasks.${index}.completed.value`, {
                        onChange: ({ target }) => {
                          const { checked } = target as HTMLInputElement;
                          setValue(`tasks.${index}.completed.value`, checked);
                          if (field.taskId.action !== "CREATE") {
                            if (
                              checked ===
                              defaultValues?.tasks?.[index]?.completed?.value
                            ) {
                              setValue(`tasks.${index}.completed.action`, "");
                              return;
                            }
                            setValue(
                              `tasks.${index}.completed.action`,
                              `UPDATE`,
                            );
                          }
                        },
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => {
                      if (field.taskId.value === "") {
                        _tasks.remove(index);
                        return;
                      }
                      _tasks.update(index, {
                        ...field,
                        name: {
                          ...field.name,
                          action: "REMOVE",
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              type="button"
              className="mb-8"
              onClick={() => {
                _tasks.append({
                  name: { value: "", action: "CREATE" },
                  taskId: { value: "", action: "CREATE" },
                  completed: { value: false, action: "CREATE" },
                });
              }}
            >
              Añadir tarea
            </button>
          </div>
        </div>

        <button>Save changes</button>
      </form>

      <pre>{JSON.stringify(debugPayload, null, 2)}</pre>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
