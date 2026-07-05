import {
  getMainPage,
  launchChaoxingContext,
  saveJson,
  waitForLogin
} from "./browser-utils.mjs";

const LOGIN_URL = "https://i.chaoxing.com/";
const timeoutMs = Number(process.env.CHAOXING_LOGIN_TIMEOUT_MS ?? 10 * 60 * 1000);

const context = await launchChaoxingContext();
const page = await getMainPage(context);

console.log("Opening Chaoxing login page...");
await page.goto(LOGIN_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });

console.log("Please log in manually in the opened browser window.");
console.log(`Waiting up to ${Math.round(timeoutMs / 1000)} seconds for a logged-in page...`);

const loggedIn = await waitForLogin(page, timeoutMs);

const result = {
  loggedIn,
  url: page.url(),
  checkedAt: new Date().toISOString(),
  profileDir: "automation/chaoxing/browser-profile"
};

const target = await saveJson("login-state.json", result);
console.log(`Login state saved: ${target}`);

if (loggedIn) {
  console.log("Chaoxing login appears ready. You can now run: npm run chaoxing:courses");
} else {
  console.log("Login was not confirmed before timeout. Re-run npm run chaoxing:login after signing in.");
}

await context.close();
process.exit(loggedIn ? 0 : 2);
