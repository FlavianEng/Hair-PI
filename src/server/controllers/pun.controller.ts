import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts";
import { Context, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import * as punService from "../services/pun.service.ts";
import { Language } from "../store/store.ts";

export const getWord = (ctx: Context) => {
  let language: Language = Language.FR;
  const { lang } = getQuery(ctx);

  if (lang && Object.values(Language).includes(lang as Language)) {
    language = lang as Language;
  }

  const message = punService.getOneWord(language);

  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.status = Status.OK;
  ctx.response.body = message;
};
