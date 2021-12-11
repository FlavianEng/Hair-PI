import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

// TASK Add a controller and a service for this
// TASK Add some test
router.all("/", ({ response }) => {
  response.status = 418;
  response.headers.set("Content-Type", "application/json");
  response.body = { message: "🎾 Pong" };
});

export default router;
