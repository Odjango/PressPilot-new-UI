import { expect, test } from "@playwright/test";

const viewports = {
  desktop: { width: 1440, height: 1100 },
  laptop: { width: 1280, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

for (const [name, viewport] of Object.entries(viewports)) {
  test(`${name} keeps the Studio workspace readable without page overflow`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.getByRole("heading", { name: "Customize the website" }).waitFor();

    const controls = await page.locator(".customization-panel").boundingBox();
    const preview = await page.locator(".website-preview").boundingBox();
    expect(controls).not.toBeNull();
    expect(preview).not.toBeNull();

    if (name === "desktop" || name === "laptop") {
      expect(preview!.x).toBeGreaterThan(controls!.x + controls!.width - 2);
    } else {
      expect(preview!.y).toBeGreaterThan(controls!.y + controls!.height - 2);
    }

    if (name === "mobile") {
      await expect(page.getByText("Step 3 of 5 — Customize")).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Review website" })).toBeVisible();
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasOverflow).toBe(false);
  });
}

test("Arabic mode applies RTL direction to the complete Studio surface", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await page.goto("/?dir=rtl");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("Arabic · RTL")).toBeVisible();

  const controls = await page.locator(".customization-panel").boundingBox();
  const preview = await page.locator(".website-preview").boundingBox();
  expect(controls!.x).toBeGreaterThan(preview!.x);
  await expect(page.locator(".action-bar .primary-action svg")).toHaveCSS("transform", /matrix\(-1|none/);
});
