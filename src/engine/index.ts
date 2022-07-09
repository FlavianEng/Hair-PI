import { Engine } from "./engine.ts";
import { fr_paths } from "./engineSettings/fr.engineSettings.ts";
import { EOL } from "./models/engine.model.ts";

const engine = new Engine(EOL.LF);

engine.generateOneWordPuns(fr_paths.fr_words_txt);

// TODO Idioms
// TODO Define an allowed idiom length
// TODO Filter the file to keep only the words included in the phonetic expression list
// TODO Copy utils.ts file from old repo
// const wordPhoneticArray = engine.createWordListFromPlainText(
//   fr_paths.fr_idioms_txt);
// const wordPhoneticObject = engine.createWordPhoneticObject(wordPhoneticArray);
// await engine.createJsonFile("./files/fr_idioms.json", wordPhoneticObject);
