import { Context, Middleware } from "https://deno.land/x/oak/mod.ts";

export const logger: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  await next();
  const statusCode = await ctx.response.status;
  const { emoji, style } = getLogStyle(statusCode);
  console.log(
    `${emoji} %c${statusCode} ${ctx.request.method} ${ctx.request.url}`,
    style,
  );
};

const getLogStyle = (statusCode: number) => {
  let logColor;
  let emoji;
  if (statusCode >= 200 && statusCode < 300) {
    logColor = "#9AE66E";
    emoji = "🟢";
  } else if (statusCode >= 300 && statusCode < 400) {
    logColor = "#FFCC1D";
    emoji = "🟡";
  } else {
    logColor = "#FF7878";
    emoji = "🔴";
  }

  return { emoji, style: `color:${logColor}` };
};
