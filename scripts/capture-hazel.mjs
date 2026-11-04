import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "public", "work", "hazel-india");
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
});

await page.goto("https://www.hazelindia.com/", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});

await page.waitForFunction(
  () => {
    const text = document.body?.innerText || "";
    const hasHero = /Smarter facilities/i.test(text);
    const audit = [...document.querySelectorAll("a,button")].some((el) =>
      /free audit/i.test(el.textContent || "")
    );
    const bigPercent = [...document.querySelectorAll("body *")].some((el) => {
      if (el.children.length > 0) return false;
      const t = (el.textContent || "").trim();
      if (!/^\d{2,3}%$/.test(t)) return false;
      return el.getBoundingClientRect().height > 80;
    });
    return hasHero && audit && !bigPercent;
  },
  { timeout: 90000 }
);

await page.waitForTimeout(1800);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({
  path: path.join(out, "01-hero.png"),
  type: "png",
});
console.log("hero ok");

let found = false;
for (let y = 700; y <= 3600; y += 350) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(350);
  found = await page.evaluate(
    () =>
      /housekeeping|landscaping|waste management|non-technical|soft services/i.test(
        document.body.innerText
      )
  );
  if (found) break;
}
await page.waitForTimeout(900);
await page.screenshot({
  path: path.join(out, "02-services.png"),
  type: "png",
});
console.log("services ok", { found });

await browser.close();
