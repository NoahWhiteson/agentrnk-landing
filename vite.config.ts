import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolveAppRoot } from "./scripts/app-root.mjs";

const landingDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = resolveAppRoot();

export default defineConfig({
  root: landingDir,
  publicDir: path.join(appRoot, "public"),
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.join(appRoot, "src"),
      react: path.join(landingDir, "node_modules/react"),
      "react-dom": path.join(landingDir, "node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom", "react-aria-components", "motion"],
  },
  build: {
    outDir: path.join(landingDir, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5174,
  },
});
