import { EOL } from "./models/engine.model.ts";

export class Engine {
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

  createWordListFromPlainText(path: string, eol: EOL): string[] {
    const fileAsString: string = Deno.readTextFileSync(path);
    return fileAsString.split(eol);
  }

  async createJsonFile(
    path: string,
    data: Record<string, string>,
  ): Promise<void> {
    Deno.open(path, { create: true, write: true });
    await Deno.writeTextFile(path, JSON.stringify(data));
    console.info(`💾  .json file created to path: ${path}`);
  }
}
