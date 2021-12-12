import { Router } from "https://deno.land/x/oak/mod.ts";
import * as pingController from "../controllers/ping.controller.ts";

const router = new Router();

// TASK Add some test
router.all("/", pingController.sendPong);

export default router;
