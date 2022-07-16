import { store } from "../../../server.ts";
import { Language, StoreCollectionType } from "../store/store.ts";

export const getOneWord = (language: Language) => {
  return store.getOne(language, StoreCollectionType.words);
};
