import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { defaultProject } from "../data/sampleProjects";
import { CustomizationPanel } from "./CustomizationPanel";
import type { StudioProjectSample } from "../types/studio";

function StatefulPanel() {
  const [project, setProject] = useState<StudioProjectSample>(defaultProject);
  return <CustomizationPanel project={project} onChange={setProject} />;
}

test("provides accessible customization controls", async () => {
  const user = userEvent.setup();
  render(<StatefulPanel />);

  expect(screen.getByRole("group", { name: "Typography" })).toBeInTheDocument();
  expect(screen.getByRole("group", { name: "Color palette" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Hero headline" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Change layout" })).toBeInTheDocument();
  expect(screen.getByText(/connect WooCommerce after installation/i)).toBeInTheDocument();
  await user.click(screen.getByRole("radio", { name: "Editorial Serif" }));
  expect(screen.getByRole("radio", { name: "Editorial Serif" })).toBeChecked();
  await user.click(screen.getByRole("radio", { name: "Gallery Warm" }));
  expect(screen.getByRole("radio", { name: "Gallery Warm" })).toBeChecked();
});
