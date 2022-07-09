import { Context, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as punService from "../services/pun.service.ts";

export const getWord = (ctx: Context) => {
  const message = punService.getWord();

  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.status = Status.OK;
  ctx.response.body = message;
};
