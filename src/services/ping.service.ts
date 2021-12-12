import * as pingRepository from "../repositories/ping.repository.ts";

export const getPong = () => {
  const message = pingRepository.get();
  return message;
};
