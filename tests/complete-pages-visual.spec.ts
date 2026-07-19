import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const outputDirectory = "artifacts/screenshots";
const captures = [
  ["app-pricing-desktop", "/pricing", "One clear price. Your complete website.", 1440, 1000],
  ["app-signin-desktop", "/signin", "Welcome back", 1440, 1000],
  ["app-projects-desktop", "/projects", "Your websites", 1440, 1000],
  ["studio-step-1-business-details", "/studio?step=details", "Tell us about the business", 1440, 1100],
  ["studio-step-2-choose-layout", "/studio?step=layout", "Choose a homepage direction", 1440, 1100],
  ["studio-step-3-customize", "/studio?step=customize", "Customize the website", 1440, 1100],
  ["studio-step-4-review", "/studio?step=review", "Review the website", 1440, 1100],
  ["studio-step-4-creating", "/studio?step=building", "Creating your website", 1440, 1100],
  ["studio-step-5-download", "/studio?step=download", "Your website is ready", 1440, 1100],
  ["studio-step-1-mobile", "/studio?step=details", "Tell us about the business", 390, 844],
  ["studio-step-2-mobile", "/studio?step=layout", "Choose a homepage direction", 390, 844],
  ["studio-step-1-arabic-rtl", "/studio?step=details&dir=rtl", "Tell us about the business", 1440, 1100],
] as const;

test.beforeAll(async () => mkdir(outputDirectory, { recursive: true }));

for (const [name, url, heading, width, height] of captures) {
  test(`captures ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}" });
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    await page.screenshot({ path: `${outputDirectory}/${name}.png`, fullPage: true });
  });
}
