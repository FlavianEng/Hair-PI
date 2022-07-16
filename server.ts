import { app } from "./app.ts";
import { config as env } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { Engine } from "./src/engine/engine.ts";
import { EOL } from "./src/engine/models/engine.model.ts";
import { Store } from "./src/server/store/store.ts";

const port = parseInt(env().PORT) || 8000;
export let store!: Store;

app.addEventListener("listen", ({ port, secure: protocol }) => {
  const engine = new Engine(EOL.LF);
  store = new Store(engine);

  console.log(
    `⚡ Listening on: ${
      protocol ? "https://" : "http://"
    }localhost:${port}/api ⚡`,
  );
});

await app.listen({ port });
