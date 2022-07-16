import { assertExists } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../../../app.ts";

Deno.test("It should get a pun", async () => {
  const request = await superoak(app);
  const { body } = await request.get("/api/pun").expect(200);
  assertExists(body.data);
});

