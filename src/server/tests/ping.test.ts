import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../../../app.ts"; 

Deno.test("It should to send a ping", async () => {
  const request = await superoak(app);
  const { body } = await request.get("/api/ping").expect(200);
  assertEquals(body.message, "🏓 Pong");
});

Deno.test("It should fail to send a ping", async () => {
  const request = await superoak(app);
  const { body } = await request.get("/api/pong").expect(404);
  assertEquals(body.message, "🚨 Sorry Cap'n, I couldn't find anything");
});
