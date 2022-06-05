import { Router, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import pingRouter from "./src/server/routes/ping.route.ts";

const router = new Router();

router.all("/", ({ response }) => {
  response.status = Status.OK;
});
router.use("/ping", pingRouter.routes(), pingRouter.allowedMethods());

router.all("/(.*)", (ctx) => {
  ctx.throw(Status.NotFound, "🚨 Sorry Cap'n, I couldn't find anything");
});

export default router;
