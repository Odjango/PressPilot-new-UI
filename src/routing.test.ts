import { resolveAppRoute, resolveStudioStep } from "./routing";

test.each([
  ["/", "home"],
  ["/pricing", "pricing"],
  ["/signin", "signin"],
  ["/projects", "projects"],
  ["/studio", "studio"],
  ["/not-a-page", "home"],
])("resolves %s to %s", (pathname, route) => {
  expect(resolveAppRoute(pathname)).toBe(route);
});

test.each(["details", "layout", "customize", "review", "building", "download"])(
  "accepts the %s Studio state",
  (step) => expect(resolveStudioStep(`?step=${step}`)).toBe(step),
);

test("keeps the approved customize view as the Studio default", () => {
  expect(resolveStudioStep("")).toBe("customize");
  expect(resolveStudioStep("?step=unknown")).toBe("customize");
});
