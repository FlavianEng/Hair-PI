import { pingResponse } from "../dtos/ping.dto.ts";

export const get = () => {
  const message: pingResponse = { message: "🏓 Pong" };
  return message;
};
