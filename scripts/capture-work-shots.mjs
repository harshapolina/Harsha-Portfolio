import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "work");

const shots = [
  {
    id: "hazel-india",
    url: "https://www.hazelindia.com/",
    files: [
      { name: "01-hero.png", scrollY: 0 },
      { name: "02-services.png", scrollY: 900 },
    ],
  },
  {
    id: "editco",
    url: "https://www.editcomedia.com/",
    files: [
      { name: "01-hero.png", scrollY: 0 },
      { name: "02-services.png", scrollY: 900 },
    ],
  },
  {
    id: "dentin",
    url: "https://www.dentinoralexperts.com/",
    files: [
      { name: "01-hero.png", scrollY: 0 },
      { name: "02-services.png", scrollY: 900 },
    ],
  },
  {
    id: "agency-erp",
    url: "https://dashboards.editcomedia.com/dashboard",
    files: [
      { name: "01-dashboard.png", scrollY: 0 },
      { name: "02-dashboard.png", scrollY: 700 },
    ],
  },
  {
    id: "cubic-pms",
    url: "https://pms-cubic.vercel.app/login",
    files: [
      { name: "01-login.png", scrollY: 0 },
      { name: "02-login.png", scrollY: 400 },
    ],
  },
  {
    id: "spark",
    url: "https://spark.editcomedia.com/admin-dashboard",
    files: [
      { name: "01-dashboard.png", scrollY: 0 },
      { name: "02-dashboard.png", scrollY: 700 },
    ],
  },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
});

const results = [];

for (const shot of shots) {
  const dir = path.join(outDir, shot.id);
  await mkdir(dir, { recursive: true });
  const page = await context.newPage();
  page.setDefaultTimeout(45000);

  try {
    const response = await page.goto(shot.url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await page.waitForTimeout(2500);
    // Settle network a bit without hanging forever
    await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});

    for (const file of shot.files) {
      if (file.scrollY > 0) {
        await page.evaluate((y) => window.scrollTo(0, y), file.scrollY);
        await page.waitForTimeout(800);
      } else {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);
      }

      const filePath = path.join(dir, file.name);
      await page.screenshot({
        path: filePath,
        type: "png",
        fullPage: false,
      });
      results.push({
        id: shot.id,
        file: file.name,
        status: response?.status() ?? null,
        ok: true,
        path: filePath,
      });
      console.log(`OK ${shot.id}/${file.name} (${response?.status()})`);
    }
  } catch (err) {
    results.push({ id: shot.id, ok: false, error: String(err) });
    console.error(`FAIL ${shot.id}:`, err.message || err);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
