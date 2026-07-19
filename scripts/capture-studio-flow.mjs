import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDirectory = "artifacts/screenshots";
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });

await page.goto("http://127.0.0.1:4174", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.getByRole("button", { name: "Review website" }).click();
await page.getByRole("heading", { name: "Review the website" }).waitFor();
await page.screenshot({ path: `${outputDirectory}/studio-review-direction-01.png`, fullPage: true });

await page.getByRole("button", { name: "Create website" }).click();
await page.getByRole("heading", { name: "Creating your website" }).waitFor();
await page.waitForTimeout(820);
await page.screenshot({ path: `${outputDirectory}/studio-building-direction-01.png`, fullPage: true });

await page.getByRole("heading", { name: "Your website is ready" }).waitFor({ timeout: 6000 });
await page.screenshot({ path: `${outputDirectory}/studio-download-direction-01.png`, fullPage: true });

await browser.close();
