import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as punController from "../controllers/pun.controller.ts";

const router = new Router();

router.all("/", punController.getWord);

export default router;
