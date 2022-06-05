import { Engine } from "./engine.ts";
import { EOL } from "./models/engine.model.ts";

const paths = {
  fr_idioms_txt: "./files/fr_idioms.txt",
};

const engine = new Engine(EOL.LF);

const wordPhoneticArray = engine.createWordListFromPlainText(
  paths.fr_idioms_txt,
);

const wordPhoneticObject = engine.createWordPhoneticObject(wordPhoneticArray);

// TASK Define an allowed idiom length
// TASK Filter the file to keep only the words included in the phonetic expression list
// TASK Copy utils.ts file from old repo
