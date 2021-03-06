import { Router, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import punRouter from "./src/server/routes/pun.route.ts";

const router = new Router();

router.all("/", ({ response }) => {
  response.status = Status.OK;
});
router.use("/pun", punRouter.routes(), punRouter.allowedMethods());

router.all("/(.*)", (ctx) => {
  ctx.throw(Status.NotFound, "🚨 Sorry Cap'n, I couldn't find anything");
});

export default router;
