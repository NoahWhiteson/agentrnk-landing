import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolveAppRoot } from "./scripts/app-root.mjs";

const landingDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = resolveAppRoot();

export default defineConfig({
  root: landingDir,
  publicDir: path.join(appRoot, "public"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(appRoot, "src"),
      react: path.join(landingDir, "node_modules/react"),
      "react-dom": path.join(landingDir, "node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: path.join(landingDir, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5174,
  },
});
