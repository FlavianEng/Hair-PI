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
}
