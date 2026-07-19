import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { defaultProject } from "../data/sampleProjects";
import { DownloadWorkspace } from "./DownloadWorkspace";

test("presents the reviewed website as a distinct Step 5 delivery", async () => {
  const user = userEvent.setup();
  const onBack = vi.fn();
  const onRestart = vi.fn();

  render(<DownloadWorkspace project={defaultProject} onBack={onBack} onRestart={onRestart} />);

  expect(screen.getByRole("heading", { name: "Your website is ready" })).toBeInTheDocument();
  expect(screen.getByText("Step 5 of 5")).toBeInTheDocument();
  expect(screen.getByText("WordPress website")).toBeInTheDocument();
  expect(screen.getByText(/complete website ZIP/i)).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /amigo store website preview/i })).toHaveAttribute("src", defaultProject.heroAsset);

  const downloadButton = screen.getByRole("button", { name: "Download website" });
  expect(downloadButton).toHaveClass("primary-action");
  expect(screen.getByText("How to install your website")).toBeInTheDocument();
  expect(screen.queryByText(/theme ZIP|download theme|your theme/i)).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Back to review" }));
  expect(onBack).toHaveBeenCalledOnce();
  await user.click(screen.getByRole("button", { name: "Create another design" }));
  expect(onRestart).toHaveBeenCalledOnce();
});
