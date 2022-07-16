import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../../../app.ts";


Deno.test("It should get a 200 OK response", async () => {
  const request = await superoak(app);
  const { body } = await request.get("/api/").expect(200);
  assertEquals(body.status, 200);
});

Deno.test("It should fail and get the server error", async () => {
  const request = await superoak(app);
  const { body } = await request.get("/api/crash").expect(404);
  assertEquals(body.message, "🚨 Sorry Cap'n, I couldn't find anything");
});
