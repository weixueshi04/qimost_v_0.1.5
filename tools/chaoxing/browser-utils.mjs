import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(__dirname, "..", "..");
export const runRoot = path.join(repoRoot, "automation", "chaoxing");
export const userDataDir = path.join(runRoot, "browser-profile");
export const downloadDir = path.join(runRoot, "downloads");
export const outputDir = path.join(runRoot, "outputs");

export function ensureRunDirs() {
  for (const dir of [runRoot, userDataDir, downloadDir, outputDir]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function findBrowserExecutable() {
  const candidates = [
    process.env.CHAOXING_BROWSER,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ].filter(Boolean);

  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(
      "No supported browser executable was found. Install Chrome/Edge or set CHAOXING_BROWSER to the browser executable path."
    );
  }
  return found;
}

export async function launchChaoxingContext() {
  ensureRunDirs();
  return chromium.launchPersistentContext(userDataDir, {
    executablePath: findBrowserExecutable(),
    headless: false,
    acceptDownloads: true,
    downloadsPath: downloadDir,
    viewport: { width: 1440, height: 920 }
  });
}

export async function getMainPage(context) {
  const pages = context.pages();
  return pages[0] ?? context.newPage();
}

export async function pageText(page) {
  return page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
}

export async function looksLoggedIn(page) {
  const url = page.url();
  const text = await pageText(page);
  const onLoginUrl = /passport|login|sso|auth/i.test(url);
  const hasCourseSignal = /课程|我的课程|空间|学习|班级|退出|账号/.test(text);
  const hasLoginPrompt = /账号登录|手机号登录|验证码|忘记密码/.test(text);
  return !onLoginUrl && hasCourseSignal && !hasLoginPrompt;
}

export async function waitForLogin(page, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await looksLoggedIn(page)) return true;
    await page.waitForTimeout(3000);
  }
  return false;
}

export async function saveJson(name, data) {
  ensureRunDirs();
  const target = path.join(outputDir, name);
  fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return target;
}

export async function saveMarkdown(name, content) {
  ensureRunDirs();
  const target = path.join(outputDir, name);
  fs.writeFileSync(target, `${content.trim()}\n`, "utf8");
  return target;
}
