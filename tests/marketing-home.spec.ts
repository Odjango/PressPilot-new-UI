import { expect, test } from "@playwright/test";

const viewports = {
  desktop: { width: 1440, height: 1000 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

for (const [name, viewport] of Object.entries(viewports)) {
  test(`${name} presents the homepage without page overflow`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Your business, turned into a complete WordPress website." })).toBeVisible();

    const copy = await page.locator(".home-hero__copy").boundingBox();
    const preview = await page.locator(".transformation-preview").boundingBox();
    expect(copy).not.toBeNull();
    expect(preview).not.toBeNull();
    if (name === "desktop") expect(preview!.x).toBeGreaterThan(copy!.x + copy!.width - 2);
    else expect(preview!.y).toBeGreaterThan(copy!.y + copy!.height - 2);

    if (name === "mobile") {
      const demoBody = await page.locator(".demo-placeholder__body").boundingBox();
      const demoWebsite = await page.locator(".demo-placeholder__body > strong").boundingBox();
      expect(demoWebsite!.width).toBeGreaterThanOrEqual(demoBody!.width * .9);
    }

    const primaryAction = page.locator(".home-hero__actions").getByRole("link", { name: "Start in Studio" });
    expect((await primaryAction.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await expect(page.locator(".ambient__star")).toHaveCount(0);
  });
}

test("keyboard users can skip directly to the homepage content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to homepage content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#homepage-content")).toBeFocused();
});

test("reduced motion removes homepage transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page.locator(".marketing-button").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
});
