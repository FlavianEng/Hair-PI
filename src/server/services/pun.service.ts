import * as punRepository from "../repositories/pun.repository.ts";
import { Language } from "../store/store.ts";

export const getOneWord = (language: Language) => {
  return punRepository.getOneWord(language);
};
