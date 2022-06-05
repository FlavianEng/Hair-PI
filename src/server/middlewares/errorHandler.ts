import {
  Context,
  isHttpError,
  Middleware,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

export const errorHandler: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      ctx.response.status = err.status;
      ctx.response.body = { status: err.status, message: err.message };
    } else {
      throw err;
    }
  }
};
