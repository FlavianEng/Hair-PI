import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";
import { errorHandler } from "./src/middlewares/errorHandler.ts";

export const app = new Application();

// TASK Find a solution to separate properly the middlewares

// Logger
app.use(async (ctx, next) => {
  await next();
  const statusCode = await ctx.response.status;
  console.log(`${statusCode} ${ctx.request.method} ${ctx.request.url}`);
});

app.use(errorHandler);

const globalRouter = new Router();
globalRouter.use("/api", router.routes());

app.use(globalRouter.routes());
