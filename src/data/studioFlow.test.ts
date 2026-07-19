import { getStepsForFlow } from "./studioFlow";

test("keeps generation inside Step 4 and activates delivery only when ready", () => {
  expect(getStepsForFlow("customize")[2].status).toBe("current");
  expect(getStepsForFlow("review")[3].status).toBe("current");
  expect(getStepsForFlow("building")[3].status).toBe("current");
  expect(getStepsForFlow("download").map((step) => step.status)).toEqual([
    "complete",
    "complete",
    "complete",
    "complete",
    "current",
  ]);
  expect(getStepsForFlow("download")[4].label).toBe("Download & install");
});
