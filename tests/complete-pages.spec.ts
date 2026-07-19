import { expect, test } from "@playwright/test";

const routes = [
  ["pricing", "/pricing", "One clear price. Your complete website."],
  ["sign in", "/signin", "Welcome back"],
  ["projects", "/projects", "Your websites"],
  ["business details", "/studio?step=details", "Tell us about the business"],
  ["layout", "/studio?step=layout", "Choose a homepage direction"],
  ["customize", "/studio?step=customize", "Customize the website"],
  ["review", "/studio?step=review", "Review the website"],
  ["building", "/studio?step=building", "Creating your website"],
  ["download", "/studio?step=download", "Your website is ready"],
] as const;

for (const [name, route, heading] of routes) {
  test(`${name} route is directly reviewable without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await expect(page.locator(".ambient__star")).toHaveCount(0);
  });
}

test("mobile public navigation exposes real page links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pricing");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Public navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Pricing", exact: true })).toHaveAttribute("href", "/pricing");
  await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
});

test("Arabic business details applies RTL to the entire app shell", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/studio?step=details&dir=rtl");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("radio", { name: "Arabic" })).toBeChecked();
  const card = await page.locator(".business-details-card").boundingBox();
  const summary = await page.locator(".brief-readiness").boundingBox();
  expect(card!.x).toBeGreaterThan(summary!.x);
});

test("key page and Studio controls meet the 44px target gate", async ({ page }) => {
  await page.goto("/studio?step=layout");
  for (const name of ["Back to business details", "Continue to customize"]) {
    expect((await page.getByRole("button", { name }).boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await page.goto("/signin");
  expect((await page.getByRole("button", { name: "Sign in" }).boundingBox())!.height).toBeGreaterThanOrEqual(44);
});
