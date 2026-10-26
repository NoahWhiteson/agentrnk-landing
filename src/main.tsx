import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArcProvider } from "@/components/arc/lib/arc-provider";
import "@/components/arc/foundation.css";
import "@/index.css";
import { LandingPage } from "./LandingPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArcProvider>
      <LandingPage />
    </ArcProvider>
  </StrictMode>,
);
