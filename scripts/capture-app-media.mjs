/**
 * Records short app cuts for the marketing site (WebM + GIF + poster PNG).
 *
 *   APP_URL=https://agentrnk.xyz INVITE_URL='https://agentrnk.xyz/auth/invite?t=…' npm run capture:media
 *
 * INVITE_URL: one-time staff sign-in link (single use — re-run needs a fresh link).
 */
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src/assets/cuts");
const APP = (process.env.APP_URL ?? "https://agentrnk.xyz").replace(/\/$/, "");
const INVITE_URL = process.env.INVITE_URL?.trim();
const PROFILE_HANDLE = process.env.PROFILE_HANDLE?.trim();
const VIEWPORT = { width: 1440, height: 900 };

fs.mkdirSync(outDir, { recursive: true });

function hasFfmpeg() {
  return spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
}

async function toGif(webmPath, gifPath) {
  if (!hasFfmpeg()) {
    console.warn("[capture] ffmpeg not found — skipping GIF (WebM still usable)");
    return;
  }
  execSync(
    `ffmpeg -y -i "${webmPath}" -vf "fps=12,scale=1280:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" -loop 0 "${gifPath}"`,
    { stdio: "inherit" },
  );
}

/** @param {import('playwright').Browser} browser */
async function recordCut(browser, name, url, run, storageState) {
  const videoDir = path.join(outDir, ".tmp-video");
  fs.mkdirSync(videoDir, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
    storageState,
    recordVideo: { dir: videoDir, size: { width: VIEWPORT.width, height: VIEWPORT.height } },
  });
  const page = await context.newPage();
  console.log(`[capture] ${name}: ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);
  await run(page);
  await page.waitForTimeout(800);

  const posterPath = path.join(outDir, `${name}-poster.png`);
  await page.screenshot({ path: posterPath, type: "png" });

  await context.close();

  const webmPath = path.join(outDir, `${name}.webm`);
  const entries = fs.readdirSync(videoDir).filter((f) => f.endsWith(".webm"));
  const latest = entries
    .map((f) => ({ f, m: fs.statSync(path.join(videoDir, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m)[0]?.f;
  if (!latest) throw new Error(`No video recorded for ${name}`);
  fs.renameSync(path.join(videoDir, latest), webmPath);
  await toGif(webmPath, path.join(outDir, `${name}.gif`));
  console.log(`[capture] wrote ${name}.webm (+ poster + gif)`);
}

async function authStorageState(browser) {
  if (!INVITE_URL) return undefined;

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  console.log("[capture] signing in via invite link…");
  await page.goto(INVITE_URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(2500);
  if (page.url().includes("/auth/invite")) {
    throw new Error("Invite sign-in did not complete — link may be expired or already used.");
  }
  const state = await context.storageState();
  await context.close();
  return state;
}

async function resolveProfileHandle(browser, storageState) {
  if (PROFILE_HANDLE) return PROFILE_HANDLE;
  if (!storageState) {
    throw new Error("Set INVITE_URL or PROFILE_HANDLE for capture.");
  }
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: "dark",
    storageState,
  });
  const page = await context.newPage();
  await page.goto(`${APP}/`, { waitUntil: "networkidle", timeout: 120_000 });
  const me = await page.evaluate(async () => {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.user?.username ?? null;
  });
  await context.close();
  if (!me) throw new Error("Could not read signed-in username from /api/auth/me.");
  console.log(`[capture] profile handle @${me}`);
  fs.writeFileSync(path.join(outDir, "profile-handle.txt"), `${me}\n`, "utf8");
  return me;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const storageState = await authStorageState(browser);
  const handle = await resolveProfileHandle(browser, storageState);

  await recordCut(browser, "profile", `${APP}/${handle}`, async (page) => {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo({ top: 320, behavior: "smooth" }));
    await page.waitForTimeout(1200);
    const focus = page.getByRole("tab", { name: /Focus/i });
    if ((await focus.count()) > 0) {
      await focus.first().click();
      await page.waitForTimeout(900);
    }
    await page.evaluate(() => window.scrollTo({ top: 720, behavior: "smooth" }));
    await page.waitForTimeout(1200);
  }, storageState);

  await recordCut(browser, "leaderboard", `${APP}/leaderboard`, async (page) => {
    if (page.url().includes("/auth")) {
      throw new Error("Leaderboard redirected to auth — invite session missing or expired.");
    }
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo({ top: 280, behavior: "smooth" }));
    await page.waitForTimeout(1500);
  }, storageState);

  await browser.close();
  console.log("[capture] Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
