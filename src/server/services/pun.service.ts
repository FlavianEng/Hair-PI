import * as punRepository from "../repositories/pun.repository.ts";

export const getWord = () => {
  const message: string = punRepository.getOne();
  return message;
};
