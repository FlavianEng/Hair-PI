import {
  arrayOfTerminations,
  searchedPhonetics,
} from "./engineSettings/fr.engineSettings.ts";
import { EOL } from "./models/engine.model.ts";

export class Engine {
  eol: EOL;

  constructor(eol: EOL) {
    this.eol = eol;
  }

  createWordPhoneticObject(data: string[]): Record<string, string> {
    if (data.length % 2) {
      throw new Error("Length must be even");
    }

    const wordPhoneticObject: Record<string, string> = {};
    let lastItem = "";

    for (let index = 0; index < data.length; index++) {
      const item = data[index];

      if (!(index % 2)) {
        wordPhoneticObject[item] = "";
        lastItem = item;
      } else {
        wordPhoneticObject[lastItem] = item;
      }
    }

    return wordPhoneticObject;
  }

  createWordListFromPlainText(path: string): string[] {
    const fileAsString: string = Deno.readTextFileSync(path);
    return fileAsString.split(this.eol);
  }

  async createJsonFile(
    path: string,
    data: Record<string, string>,
  ): Promise<void> {
    Deno.open(path, { create: true, write: true });
    await Deno.writeTextFile(path, JSON.stringify(data));
    console.info(`💾  .json file created to path: ${path}`);
  }

  async createTextFile(
    path: string,
    data: string,
  ): Promise<void> {
    await Deno.open(path, { create: true, write: true });
    await Deno.writeTextFile(path, data);
    console.info(`📁 .txt File created to ${path}`);
  }

  readJsonFile(path: string): Record<string, string> {
    const decoder = new TextDecoder("utf-8");
    const data = Deno.readFileSync(path);
    const decodedData = decoder.decode(data);
    return JSON.parse(decodedData);
  }

  createUniqueWordList(arrayOfStrings: string[]): string[] {
    return [...new Set(arrayOfStrings)];
  }

  createStringifiedWordList(array: string[]): string {
    return array.join(this.eol);
  }

  filterObjectByPhonetics(
    arrayOfPhonetics: Array<string>,
    dataPairObject: Record<string, string>,
  ) {
    let filteredObject: Record<string, string> = {};
    const dataPair = Object.entries(dataPairObject);

    arrayOfPhonetics.forEach((phonetic: string) => {
      const filtered = dataPair.filter(([_key, value]: [string, string]) =>
        value.includes(phonetic) && phonetic !== value
      );
      const results = Object.fromEntries(filtered);

      filteredObject = { ...filteredObject, ...results };
    });

    return filteredObject;
  }

  getVerbRegex(arrayOfTerminations: string[]) {
    const setOfTerminations = [...new Set(arrayOfTerminations)];
    let regex = "";

    setOfTerminations.forEach((termination, index) => {
      let str = `(${termination}$)|`;

      if (index === setOfTerminations.length - 1) {
        str = `(${termination}$)`;
      }

      regex += str;
    });

    return new RegExp(regex);
  }

  filterArrayByVerbTerminations(
    arrayOfVerbTerminations: string[],
    arrayOfWords: string[],
  ): string[] {
    const verbRegex: RegExp = this.getVerbRegex(arrayOfVerbTerminations);

    const filteredArray = arrayOfWords.filter((word) => {
      const isMatching = word.match(verbRegex) ? false : true;
      return isMatching;
    });

    return filteredArray;
  }

  filterObjectByVerbTerminations(
    arrayOfVerbTerminations: string[],
    dataPairObject: Record<string, string>,
  ): Record<string, string> {
    const verbRegex: RegExp = this.getVerbRegex(arrayOfVerbTerminations);
    const dataPair = Object.entries(dataPairObject);

    const filtered = dataPair.filter(([key]) => {
      const isMatching = key.match(verbRegex) ? false : true;
      return isMatching;
    });

    const filteredObject = Object.fromEntries(filtered);

    return { ...filteredObject };
  }

  findNumberOfOccurrenceInWord = (occurrence: string, word: string): number => {
    return word.split(occurrence).length - 1;
  };

  removeDashQuotation = (word: string): string => {
    const indexNum = word.indexOf("-");
    return `${word.slice(0, indexNum)}${word.slice(indexNum + 1)}`;
  };

  capitalize = (wordParts: string[]): string => {
    return `${wordParts[0].slice(0, 1).toUpperCase()}${wordParts[0].slice(1)}`;
  };

  replaceWordSegment = (
    wordParts: string[],
    replacingWord: string,
    hasOneLetterAtEnd: boolean,
  ): string => {
    const hasAnEmptyPart = wordParts.some((part) => part === "");

    if (hasAnEmptyPart) {
      const emptyPart = wordParts.indexOf("");
      wordParts[emptyPart] = replacingWord;
      return wordParts.join("'");
    }

    return `${wordParts[0]}'${replacingWord}${hasOneLetterAtEnd ? "" : "'"}${
      hasOneLetterAtEnd ? "" : wordParts[1]
    }`;
  };

  generateOneWordPuns = (plainTextFilePath: string): string[] => {
    const arrayOfWordPhon = this.createWordListFromPlainText(plainTextFilePath);
    const dataPairObject = this.createWordPhoneticObject(arrayOfWordPhon);

    const arrayOfPhonetics = searchedPhonetics.flatMap((item) => item.phonetic);
    const objectFilteredByPhonetics: Record<string, string> = this
      .filterObjectByPhonetics(
        arrayOfPhonetics,
        dataPairObject,
      );

    const objectFilteredByVerbTerminations: Record<string, string> = this
      .filterObjectByVerbTerminations(
        arrayOfTerminations,
        objectFilteredByPhonetics,
      );

    const allWords = Object.keys(objectFilteredByVerbTerminations);
    const wordSegments = searchedPhonetics.flatMap((item) => item.keySegment);
    const result: string[] = [];

    allWords.forEach((word) => {
      for (let i = 0; i < wordSegments.length; i++) {
        const wordSegment = wordSegments[i];

        if (word.includes(wordSegment)) {
          const searchedPhoneticsItem = searchedPhonetics.find((el) =>
            el.keySegment.includes(wordSegment)
          );

          const numberOfOccurrenceInWord = this.findNumberOfOccurrenceInWord(
            wordSegment,
            word,
          );
          const replacingWord = searchedPhoneticsItem?.word;

          if (replacingWord && numberOfOccurrenceInWord === 1) {
            // Replace the detected occurrence by the word segment
            let newWord: string;
            const wordParts = word.split(wordSegment);
            const lastLength = wordParts.length - 1;
            const hasOneLetterAtEnd = wordParts[lastLength].length === 1;

            if (hasOneLetterAtEnd) {
              wordParts.pop();
            }

            wordParts[0] = this.capitalize(wordParts);

            newWord = this.replaceWordSegment(
              wordParts,
              replacingWord,
              hasOneLetterAtEnd,
            );

            if (newWord.includes("'-") || newWord.includes("-'")) {
              newWord = this.removeDashQuotation(newWord);
            }

            result.push(newWord);
          }
        }
      }
    });

    return result;
  };
}
