import { render, screen } from "@testing-library/react";
import { defaultProject } from "../data/sampleProjects";
import { StepProgress } from "./StepProgress";

test("announces the current Studio step and all five labels", () => {
  render(<StepProgress steps={defaultProject.steps} />);
  for (const label of ["Business details", "Choose layout", "Customize", "Review", "Download & install"]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
  expect(screen.getByText("Step 3 of 5 — Customize")).toBeInTheDocument();
  expect(screen.getByText("Customize").closest("li")).toHaveAttribute("aria-current", "step");
  expect(screen.getAllByText("Complete")).toHaveLength(2);
});
