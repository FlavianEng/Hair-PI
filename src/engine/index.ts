import { Engine } from "./engine.ts";
import { EOL } from "./models/engine.model.ts";

const paths = {
  fr_idioms_txt: "./files/fr_idioms.txt",
};

const engine = new Engine();

const wordPhoneticArray = engine.createWordListFromPlainText(
  paths.fr_idioms_txt,
  EOL.LF,
);

const wordPhoneticObject = engine.createWordPhoneticObject(wordPhoneticArray);

// await engine.createJsonFile("./files/fr_idioms.json", wordPhoneticObject);

// TASK Define an allowed idiom length
// TASK Filter the file to keep only the words included in the phonetic expression list
// TASK Copy utils.ts file from old repo
