import {
  assertEquals,
  assertExists,
  assertThrows,
} from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { Engine } from "../../engine/engine.ts";
import { EOL } from "../../engine/models/engine.model.ts";
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.142.0/testing/bdd.ts";

describe("Engine", () => {
  let engine: Engine;

  beforeEach(() => {
    engine = new Engine(EOL.LF);
  });

  it("It should create the engine instance", () => {
    assertExists(engine);
  });

  it("It should throw and error because the length is not even", () => {
    const array = ["1", "2", "3"];
    assertThrows(
      () => engine.createWordPhoneticObject(array),
      undefined,
      "Length must be even",
    );
  });

  it("It should create a word-phonetic object", () => {
    const array = ["1", "2", "3", "4"];
    const object = engine.createWordPhoneticObject(array);

    assertEquals(object, { 1: "2", 3: "4" });
  });
});
