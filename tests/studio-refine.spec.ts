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
      const stage = await page.locator(".preview-stage").boundingBox();
      const site = await page.locator(".site-frame").boundingBox();
      expect(site!.width).toBeLessThanOrEqual(stage!.width + 1);
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
  await expect(page.getByRole("heading", { name: "أناقة تبقى معك." })).toBeVisible();
  await expect(page.getByText("متجر أميغو", { exact: true }).first()).toBeVisible();

  const controls = await page.locator(".customization-panel").boundingBox();
  const preview = await page.locator(".website-preview").boundingBox();
  expect(controls!.x).toBeGreaterThan(preview!.x);
  await expect(page.locator(".action-bar .primary-action svg")).toHaveCSS("transform", /matrix\(-1|none/);
});

test("keyboard, focus, selection, and live updates meet the Studio quality gate", async ({ page }) => {
  await page.setViewportSize(viewports.desktop);
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to Studio workspace" });
  await expect(skipLink).toBeFocused();
  const focusStyle = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { width: style.outlineWidth, style: style.outlineStyle };
  });
  expect(focusStyle.width).toBe("3px");
  expect(focusStyle.style).not.toBe("none");

  await skipLink.press("Enter");
  await expect(page.locator("#studio-workspace")).toBeFocused();

  await expect(page.getByRole("radio", { name: "Clean Sans" })).toBeChecked();
  await expect(page.locator('[aria-live="polite"]')).toHaveCount(1);

  for (const name of ["Change layout", "Back to layout", "Review website"]) {
    const box = await page.getByRole("button", { name }).boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("reduced motion removes ambient and preview transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const motion = await page.locator(".preview-stage").evaluate((element) => {
    const style = getComputedStyle(element);
    return { animation: style.animationName, transition: style.transitionDuration };
  });
  expect(motion.animation).toBe("none");
  expect(Number.parseFloat(motion.transition)).toBeLessThanOrEqual(0.00001);
});
