import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDirectory = "artifacts/screenshots";
const captures = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
] as const;

test.beforeAll(async () => mkdir(outputDirectory, { recursive: true }));

for (const capture of captures) {
  test(`captures the PressPilot homepage at ${capture.name} size`, async ({ page }) => {
    await page.setViewportSize({ width: capture.width, height: capture.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
    await expect(page.getByRole("heading", { name: "Your business, turned into a complete WordPress website." })).toBeVisible();
    await page.screenshot({ path: `${outputDirectory}/presspilot-home-${capture.name}.png`, fullPage: true });
  });
}
