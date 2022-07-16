import { Context, Middleware } from "https://deno.land/x/oak@v10.6.0/mod.ts";

export const successHandler: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  await next();
  const body = ctx.response.body;
  ctx.response.body = { status: ctx.response.status, data: body };
};
