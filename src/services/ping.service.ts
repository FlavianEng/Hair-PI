import * as pingRepository from "../repositories/ping.repository.ts";
import { pingResponse } from "../dtos/ping.dto.ts";

export const getPong = () => {
  const message: pingResponse = pingRepository.get();
  return message;
};
