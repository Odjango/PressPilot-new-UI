import { defaultProject } from "./sampleProjects";

test("defines a coherent five-step Studio sample", () => {
  expect(defaultProject.name).toBe("Amigo Store");
  expect(defaultProject.description).toMatch(/curated menswear/i);
  expect(defaultProject.steps).toHaveLength(5);
  expect(defaultProject.steps[2]).toMatchObject({ label: "Customize", status: "current" });
  expect(defaultProject.palette.swatches).toHaveLength(4);
  expect(defaultProject.direction).toBe("ltr");
  expect(defaultProject.heroAsset).toMatch(/^\/samples\//);
});
