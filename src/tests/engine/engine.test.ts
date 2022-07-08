import {
  assertEquals,
  assertExists,
  assertThrows,
} from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { Engine } from "../../engine/engine.ts";
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.142.0/testing/bdd.ts";
import { EOL } from "../../engine/models/engine.model.ts";

describe("Engine", () => {
  let engine: Engine;

  beforeEach(() => {
    engine = new Engine(EOL.LF);
  });

  it("Should create the engine instance", () => {
    assertExists(engine);
  });

  it("Should throw and error because the length is not even", () => {
    const array = ["1", "2", "3"];
    assertThrows(
      () => engine.createWordPhoneticObject(array),
      undefined,
      "Length must be even",
    );
  });

  it("Should create a word-phonetic object", () => {
    const array = ["1", "2", "3", "4"];
    const object = engine.createWordPhoneticObject(array);

    assertEquals(object, { 1: "2", 3: "4" });
  });

  it("Should create a unique list of words", () => {
    const array = ["apple", "orange", "orange"];
    const uniqueWordList = engine.createUniqueWordList(array);

    assertEquals(uniqueWordList, ["apple", "orange"]);
  });

  it("Should stringify a word list", () => {
    const array = ["apple", "orange"];
    const stringifiedWordList = engine.createStringifiedWordList(array);

    assertEquals(
      stringifiedWordList,
      `apple
orange`,
    );
  });

  it("Should filter object by phonetic", () => {
    const arrayOfPhonetic = ["ɛr", "ɛɾ"];
    const dataPairObject = {
      "hits": "i",
      "amerrir": "amɛriɾ",
      "hélicoptère": "elikɔptɛɾə",
    };

    const filteredObject = engine.filterObjectByPhonetics(
      arrayOfPhonetic,
      dataPairObject,
    );

    assertEquals(filteredObject, {
      amerrir: "amɛriɾ",
      "hélicoptère": "elikɔptɛɾə",
    });
  });

  it("Should get a regex for verbs", () => {
    const arrayOfTerminations = ["ent", "ait"];
    const verbRegex = engine.getVerbRegex(arrayOfTerminations);

    assertEquals(verbRegex, /(ent$)|(ait$)/);
  });

  it("Should filter array by verbTerminations", () => {
    const arrayOfTerminations = ["ent", "ait"];
    const arrayOfWords = ["Voler", "Volent", "Volait"];
    const filteredArray = engine.filterArrayByVerbTerminations(
      arrayOfTerminations,
      arrayOfWords,
    );

    assertEquals(filteredArray, ["Voler"]);
  });

  it("Should filter dataPairObject by verbTerminations", () => {
    const arrayOfTerminations = ["ent", "ait"];
    const dataPairObject = {
      "Voler": "voler",
      "Volent": "volent",
      "Volait": "volait",
    };
    const filteredArray = engine.filterObjectByVerbTerminations(
      arrayOfTerminations,
      dataPairObject,
    );

    assertEquals(filteredArray, { "Voler": "voler" });
  });

  it("Should find one occurrence in word", () => {
    const numberOfOccurrence = engine.findNumberOfOccurrenceInWord(
      "tif",
      "hâtif",
    );
    assertEquals(numberOfOccurrence, 1);
  });

  it("Should find two occurrence in word", () => {
    const numberOfOccurrence = engine.findNumberOfOccurrenceInWord(
      "tif",
      "justificatif",
    );
    assertEquals(numberOfOccurrence, 2);
  });

  it("Should remove dash quotation", () => {
    const newWord = engine.removeDashQuotation("ap-'Hair-o");

    assertEquals(newWord, "ap'Hair-o");
  });

  it("Should capitalize first letter", () => {
    const wordParts = "hâtif".split("tif");
    const capitalizedWordParts = engine.capitalize(wordParts);

    assertEquals(capitalizedWordParts, "Hâ");
  });

  it("Should replaceWordSegment", () => {
    const wordParts1 = "hâtif".split("tif");
    const replacingWord= 'Tif';
    const newWord1 = engine.replaceWordSegment(wordParts1, replacingWord, false);

    const wordParts2 = "apéritife".split("tif");
    const newWord2 = engine.replaceWordSegment(wordParts2, replacingWord, true);

    assertEquals(newWord1, "hâ'Tif");
    assertEquals(newWord2, "apéri'Tif");
  });
});
