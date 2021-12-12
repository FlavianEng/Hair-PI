import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";
import { errorHandler } from "./src/middlewares/errorHandler.ts";
import { logger } from "./src/middlewares/logger.ts";

export const app = new Application();

app.use(logger);
app.use(errorHandler);

const globalRouter = new Router();
globalRouter.use("/api", router.routes());

app.use(globalRouter.routes());
