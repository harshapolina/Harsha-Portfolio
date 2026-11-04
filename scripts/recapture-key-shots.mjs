import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "work");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
});

async function shot(page, filePath) {
  await page.screenshot({ path: filePath, type: "png", fullPage: false });
  console.log("OK", filePath);
}

// --- Hazel: wait out splash, capture hero + services ---
{
  const dir = path.join(outDir, "hazel-india");
  await mkdir(dir, { recursive: true });
  const page = await context.newPage();
  await page.goto("https://www.hazelindia.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page
    .getByRole("heading", { name: /Smarter facilities/i })
    .waitFor({ timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await shot(page, path.join(dir, "01-hero.png"));

  // Scroll to services / non-technical section
  const services = page.getByText(/housekeeping|IFM|facility services|Our Services/i).first();
  try {
    await services.scrollIntoViewIfNeeded({ timeout: 8000 });
    await page.waitForTimeout(900);
  } catch {
    await page.evaluate(() => window.scrollTo(0, 1100));
    await page.waitForTimeout(900);
  }
  await shot(page, path.join(dir, "02-services.png"));
  await page.close();
}

// --- Editco: hero + below fold ---
{
  const dir = path.join(outDir, "editco");
  await mkdir(dir, { recursive: true });
  const page = await context.newPage();
  await page.goto("https://www.editcomedia.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await shot(page, path.join(dir, "01-hero.png"));
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(900);
  await shot(page, path.join(dir, "02-services.png"));
  await page.close();
}

// --- Dentin: hero + services ---
{
  const dir = path.join(outDir, "dentin");
  await mkdir(dir, { recursive: true });
  const page = await context.newPage();
  await page.goto("https://www.dentinoralexperts.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await shot(page, path.join(dir, "01-hero.png"));
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(900);
  await shot(page, path.join(dir, "02-services.png"));
  await page.close();
}

// --- Cubic landing (better product preview) ---
{
  const dir = path.join(outDir, "cubic-pms");
  await mkdir(dir, { recursive: true });
  const page = await context.newPage();
  await page.goto("https://pms-cubic.vercel.app/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await shot(page, path.join(dir, "01-login.png"));
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(900);
  await shot(page, path.join(dir, "02-login.png"));
  await page.close();
}

await browser.close();
console.log("done");
