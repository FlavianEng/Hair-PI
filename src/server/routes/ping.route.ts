import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as pingController from "../controllers/ping.controller.ts";

const router = new Router();

router.all("/", pingController.sendPong);

export default router;
