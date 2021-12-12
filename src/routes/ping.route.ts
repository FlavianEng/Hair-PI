import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

// TASK Add a controller and a service for this
// TASK Add some test
// TASK Use HttpStatus instead of the code
router.all("/", ({ response }) => {
  response.status = 200;
  response.headers.set("Content-Type", "application/json");
  response.body = { message: "🎾 Pong" };
});

export default router;
