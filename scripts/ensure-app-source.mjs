import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vendored = path.join(root, "app-source");
const sibling = path.resolve(root, "..", "agentrank");
const repo = process.env.AGENTRNK_APP_REPO ?? "https://github.com/NoahWhiteson/agentrank.xyz.git";

function hasAppSrc(dir) {
  return existsSync(path.join(dir, "src", "index.css"));
}

if (hasAppSrc(vendored)) {
  console.log("[landing] Using app-source/");
  process.exit(0);
}

if (hasAppSrc(sibling)) {
  console.log("[landing] Using sibling ../agentrank (local dev)");
  process.exit(0);
}

console.log("[landing] Cloning app source for @/ imports…");
execSync(`git clone --depth 1 ${repo} ${JSON.stringify(vendored)}`, {
  stdio: "inherit",
});
