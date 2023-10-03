"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { type CreateTodoInput, createTodoSchema } from "@/app/new/validation";
import { handleForm } from "@/app/new/_action/handleForm";

export default function Form() {
  const { register, handleSubmit, control, watch } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema, undefined, { raw: true }),
  });

  const onSubmit = handleSubmit((payload) => {
    startTransition(() => {
      handleForm(payload)
        .then(() => alert("Todo created"))
        .catch((err) => {
          if (err instanceof Error) {
            console.error(err.message);
          }
        });
    });
  });

  const _tasks = useFieldArray({ control, name: "tasks", keyName: "_id" });

  return (
    <main className="mx-auto max-w-screen-md">
      <form onSubmit={(e) => void onSubmit(e)} className="mt-4 grid">
        <div className="mb-4 font-semibold">ToDo</div>
        <div className="mb-4 grid gap-1">
          <label>Name</label>
          <input className="ring-1" {...register("todo.name")} />
        </div>
        <div className="mb-4 grid gap-1">
          <label>Description</label>
          <textarea
            className="ring-1"
            {...register("todo.description")}
          ></textarea>
        </div>

        <div className="mb-4 font-semibold">Tasks</div>
        <div className="mb-4">
          {_tasks.fields.map((field, index) => {
            return (
              <div key={field._id}>
                <div className="flex items-start gap-4">
                  <div className="grid gap-1">
                    <label htmlFor={`tasks.${index}.name`}>Name</label>
                    <input
                      className="ring-1"
                      {...register(`tasks.${index}.name`)}
                    />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor={`tasks.${index}.completed`}>
                      Completed
                    </label>
                    <input
                      type="checkbox"
                      {...register(`tasks.${index}.completed`)}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => _tasks.remove(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button
            type="button"
            className="mb-8 ring-1"
            onClick={() => {
              _tasks.append({
                name: "",
                completed: false,
              });
            }}
          >
            Añadir tarea
          </button>
        </div>

        <button className="ring-1">Save changes</button>
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
