import { render, screen } from "@testing-library/react";
import { defaultProject } from "../data/sampleProjects";
import { WebsitePreview } from "./WebsitePreview";

test("renders the real website preview surface", () => {
  render(<WebsitePreview project={defaultProject} isUpdating={false} />);
  expect(screen.getByRole("region", { name: "Website preview" })).toBeInTheDocument();
  expect(screen.getByText("English · LTR")).toBeInTheDocument();
  expect(screen.getAllByText("Amigo Store").length).toBeGreaterThan(0);
  expect(screen.getByRole("img", { name: /amigo store collection/i })).toHaveAttribute("src", defaultProject.heroAsset);
  expect(screen.getByText(defaultProject.layout.name)).toBeInTheDocument();
  expect(screen.getByText(defaultProject.typography.name)).toBeInTheDocument();
  expect(screen.getByText(defaultProject.palette.name)).toBeInTheDocument();
  expect(screen.queryByText(/social ad/i)).not.toBeInTheDocument();
});
