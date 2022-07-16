import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import router from "./router.ts";
import { errorHandler } from "./src/server/middlewares/errorHandler.ts";
import { logger } from "./src/server/middlewares/logger.ts";
import { successHandler } from "./src/server/middlewares/successHandler.ts";

export const app = new Application();

app.use(logger);
app.use(errorHandler);
app.use(successHandler);

const globalRouter = new Router();
globalRouter.use("/api", router.routes());

app.use(globalRouter.routes());
