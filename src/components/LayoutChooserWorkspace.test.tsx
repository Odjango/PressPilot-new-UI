import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { defaultProject } from "../data/sampleProjects";
import { LayoutChooserWorkspace } from "./LayoutChooserWorkspace";

test("offers four meaningful homepage directions with one selected layout", () => {
  render(<LayoutChooserWorkspace project={defaultProject} heroState="generating" heroProgress={42} onChange={vi.fn()} onBack={vi.fn()} onContinue={vi.fn()} />);
  expect(screen.getByRole("heading", { name: "Choose a homepage direction" })).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Generating your hero image");
  expect(screen.getByRole("progressbar", { name: "Hero image generation" })).toHaveAttribute("value", "42");
  expect(screen.getAllByText("PressPilot image preview")).toHaveLength(3);
  for (const name of ["Split Hero", "Full-Bleed Hero", "Editorial Band", "Minimal Focus"]) {
    expect(screen.getByRole("radio", { name: new RegExp(name) })).toBeInTheDocument();
  }
  expect(screen.getByRole("radio", { name: /Split Hero/ })).toBeChecked();
  expect(screen.getByText("Selected layout: Split Hero")).toBeInTheDocument();
});

test("updates the selected layout and exposes the expected navigation", () => {
  const onChange = vi.fn();
  const onBack = vi.fn();
  const onContinue = vi.fn();
  render(<LayoutChooserWorkspace project={defaultProject} heroState="ready" heroProgress={100} onChange={onChange} onBack={onBack} onContinue={onContinue} />);
  expect(screen.getByRole("status")).toHaveTextContent("Hero image ready");
  expect(screen.queryByText("PressPilot image preview")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("radio", { name: /Full-Bleed Hero/ }));
  expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ layout: expect.objectContaining({ name: "Full-Bleed Hero" }) }));
  fireEvent.click(screen.getByRole("button", { name: "Back to business details" }));
  fireEvent.click(screen.getByRole("button", { name: "Continue to customize" }));
  expect(onBack).toHaveBeenCalledOnce();
  expect(onContinue).toHaveBeenCalledOnce();
});
