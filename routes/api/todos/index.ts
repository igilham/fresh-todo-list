import { Handlers } from "$fresh/server.ts";
import { ITodo } from "../../../store/types.ts";
import * as db from "../../../store/db.ts";

export const handler: Handlers<ITodo[]> = {
  async GET() {
    const todos = await db.getTodos();
    return new Response(JSON.stringify(todos));
  },
  async POST(req) {
    const body = await req.json();
    const todo = await db.setTodo(body.name);
    return new Response(JSON.stringify(todo));
  },
};
