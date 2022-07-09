import { store } from "../../../server.ts";

export const getOne = () => {
  const message: string = store.getOne(store.fr_words);
  return message;
};
