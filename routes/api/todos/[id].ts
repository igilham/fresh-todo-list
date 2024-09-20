import { Handlers } from "$fresh/server.ts";
import { ITodo } from "../../../store/types.ts";
import * as db from "../../../store/db.ts";

export const handler: Handlers<ITodo> = {
  async GET(_req, ctx) {
    const todo = await db.getTodo(ctx.params.id);
    return new Response(JSON.stringify(todo));
  },
  async PUT(req, ctx) {
    const found = await db.getTodo(ctx.params.id);
    if (!found) {
      return new Response(
        JSON.stringify({
          message: "Todo does not exist",
        }),
        { status: 404 }
      );
    }

    const body = await req.json();
    const res = await db.setTodo(body.name, ctx.params.id);
    return new Response(JSON.stringify(res));
  },
  async DELETE(_req, ctx) {
    const found = await db.getTodo(ctx.params.id);
    if (!found) {
      return new Response(
        JSON.stringify({
          message: "Todo does not exist",
        }),
        { status: 404 }
      );
    }

    await db.deleteTodo(ctx.params.id);
    return new Response(JSON.stringify({ success: true }));
  },
};
