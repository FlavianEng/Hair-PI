import {
  Application,
  isHttpError,
  Router,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

export const app = new Application();

// TASK Find a solution to separate properly the middlewares

// Logger
app.use(async (ctx, next) => {
  await next();
  const statusCode = await ctx.response.status;
  console.log(`${statusCode} ${ctx.request.method} ${ctx.request.url}`);
});

// TASK Finish the setup of the error handler
// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          // handle NotFound
          break;
        default:
          // handle other statuses
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

const globalRouter = new Router();
globalRouter.use("/api", router.routes());

app.use(globalRouter.routes());
