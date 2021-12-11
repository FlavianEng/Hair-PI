import { Router } from "https://deno.land/x/oak/mod.ts";
import pingRouter from "./src/routes/ping.route.ts";

const router = new Router();

router.use("/ping", pingRouter.routes(), pingRouter.allowedMethods());

export default router;
