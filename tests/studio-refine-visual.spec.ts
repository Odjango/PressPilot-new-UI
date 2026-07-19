import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDirectory = "artifacts/screenshots";

const captures = [
  { name: "desktop", width: 1440, height: 1100, url: "/" },
  { name: "laptop", width: 1280, height: 900, url: "/" },
  { name: "tablet", width: 834, height: 1112, url: "/" },
  { name: "mobile", width: 390, height: 844, url: "/" },
  { name: "rtl", width: 1440, height: 1100, url: "/?dir=rtl" },
] as const;

test.beforeAll(async () => mkdir(outputDirectory, { recursive: true }));

for (const capture of captures) {
  test(`captures the ${capture.name} Studio state`, async ({ page }) => {
    await page.setViewportSize({ width: capture.width, height: capture.height });
    await page.goto(capture.url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
    await expect(page.getByRole("heading", { name: "Customize the website" })).toBeVisible();
    await page.screenshot({ path: `${outputDirectory}/studio-refine-${capture.name}.png`, fullPage: true });
  });
}

test("captures the reduced-motion Studio state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${outputDirectory}/studio-refine-reduced-motion.png`, fullPage: true });
});
