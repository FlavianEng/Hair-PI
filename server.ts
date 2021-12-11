import { config as env } from "https://deno.land/x/dotenv/mod.ts";
import { app } from "./app.ts";

const port = parseInt(env().PORT) || 8000;

app.addEventListener("listen", ({ hostname, port, secure: protocol }) => {
  console.log(
    `⚡ Listening on: ${protocol ? "https://" : "http://"}${
      hostname ??
        "localhost"
    }:${port} ⚡`,
  );
});

await app.listen({ port: port });
