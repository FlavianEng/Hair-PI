import { Context, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as pingService from "../services/ping.service.ts";

export const sendPong = (ctx: Context) => {
  const message = pingService.getPong();

  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.status = Status.OK;
  ctx.response.body = message;
};
