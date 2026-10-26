import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const landingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vendored = path.join(landingRoot, "app-source");
const sibling = path.resolve(landingRoot, "..", "agentrank");

export function resolveAppRoot() {
  if (existsSync(path.join(sibling, "src", "index.css"))) return sibling;
  if (existsSync(path.join(vendored, "src", "index.css"))) return vendored;
  throw new Error(
    "App source missing. Run npm run predev or set ../agentrank next to this repo.",
  );
}
