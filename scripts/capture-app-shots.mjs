/**
 * PNG product shots for the marketing site (2× retina clips + full viewport).
 *
 *   APP_URL=https://www.agentrnk.xyz PROFILE_HANDLE=cursor npm run capture:shots
 *
 * Optional auth (leaderboard when gated):
 *   INVITE_URL='https://agentrnk.xyz/auth/invite?t=…' npm run capture:shots
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src/assets/shots");
const APP = (process.env.APP_URL ?? "https://www.agentrnk.xyz").replace(/\/$/, "");
const INVITE_URL = process.env.INVITE_URL?.trim();
const handleFile = path.join(root, "src/assets/cuts/profile-handle.txt");
const PROFILE_HANDLE =
  process.env.PROFILE_HANDLE?.trim() ||
  (fs.existsSync(handleFile) ? fs.readFileSync(handleFile, "utf8").trim() : "") ||
  "cursor";

const VIEWPORT = { width: 1440, height: 900 };

fs.mkdirSync(outDir, { recursive: true });

/** @param {import('playwright').Page} page */
async function png(page, name, options = {}) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, type: "png", animations: "disabled", ...options });
  console.log(`[shots] ${name}.png`);
}

async function authStorageState(browser) {
  if (!INVITE_URL) return undefined;
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, colorScheme: "dark" });
  const page = await context.newPage();
  console.log("[shots] signing in via invite…");
  await page.goto(INVITE_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(2500);
  const state = await context.storageState();
  await context.close();
  return state;
}

/** @param {import('playwright').Browser} browser */
async function captureProfile(browser, storageState) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
    storageState,
  });
  const page = await context.newPage();
  const url = `${APP}/${PROFILE_HANDLE}`;
  console.log(`[shots] profile ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  await png(page, "hero");

  await png(page, "profile-header", {
    clip: { x: 248, y: 64, width: 944, height: 420 },
  });

  const activityTab = page.getByRole("tab", { name: /^Activity$/i });
  if ((await activityTab.count()) > 0) {
    await activityTab.first().click();
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo({ top: 360, behavior: "instant" }));
    await page.waitForTimeout(400);
    await png(page, "profile-usage", {
      clip: { x: 72, y: 100, width: 1296, height: 580 },
    });
  }

  const focusTab = page.getByRole("tab", { name: /^Focus$/i });
  if ((await focusTab.count()) > 0) {
    await focusTab.first().click();
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
    await page.waitForTimeout(400);
    await png(page, "profile-focus", {
      clip: { x: 72, y: 80, width: 1296, height: 580 },
    });
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
  await png(page, "profile-agents", {
    clip: { x: 248, y: 268, width: 944, height: 220 },
  });

  await context.close();
}

/** @param {import('playwright').Browser} browser */
async function captureLeaderboard(browser, storageState) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
    storageState,
  });
  const page = await context.newPage();
  console.log(`[shots] leaderboard ${APP}/leaderboard`);
  await page.goto(`${APP}/leaderboard`, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);

  if (page.url().includes("/auth")) {
    console.warn("[shots] leaderboard needs auth — reusing prior poster if present");
    const poster = path.join(root, "src/assets/cuts/leaderboard-poster.png");
    if (fs.existsSync(poster)) {
      for (const name of ["leaderboard", "leaderboard-table"]) {
        fs.copyFileSync(poster, path.join(outDir, `${name}.png`));
        console.log(`[shots] ${name}.png (from cuts poster)`);
      }
    }
    await context.close();
    return;
  }

  await png(page, "leaderboard");
  await png(page, "leaderboard-table", {
    clip: { x: 160, y: 240, width: 1120, height: 520 },
  });
  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const storageState = await authStorageState(browser);
  await captureProfile(browser, storageState);
  await captureLeaderboard(browser, storageState);
  await browser.close();
  fs.writeFileSync(path.join(outDir, "profile-handle.txt"), `${PROFILE_HANDLE}\n`, "utf8");
  console.log("[shots] Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
