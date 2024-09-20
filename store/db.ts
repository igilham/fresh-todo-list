import { ulid } from "jsr:@std/ulid";

import { ITodo } from "./types.ts";

const kv = await Deno.openKv();

export async function getTodos(): Promise<ITodo[]> {
  const entries = await kv.list<ITodo>({ prefix: ["todos"] });
  if (!entries) {
    return [];
  }
  const todos: ITodo[] = [];
  for await (const entry of entries) {
    todos.push(entry.value);
  }
  return todos;
}

export async function getTodo(id: string): Promise<ITodo | null> {
  const todo = await kv.get<ITodo>(["todos", id]);
  return todo.value;
}

export async function setTodo(
  name: string,
  id = ulid()
): Promise<ITodo | null> {
  const result = await kv.set(["todos", id], { id, name });
  if (!result.ok) {
    return null;
  }
  return { id, name };
}

export async function deleteTodo(id: string): Promise<void> {
  await kv.delete(["todos", id]);
}
