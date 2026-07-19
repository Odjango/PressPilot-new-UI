import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { defaultProject } from "../data/sampleProjects";
import { LayoutChooserWorkspace } from "./LayoutChooserWorkspace";

test("offers four meaningful homepage directions with one selected layout", () => {
  render(<LayoutChooserWorkspace project={defaultProject} onChange={vi.fn()} onBack={vi.fn()} onContinue={vi.fn()} />);
  expect(screen.getByRole("heading", { name: "Choose a homepage direction" })).toBeInTheDocument();
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
  render(<LayoutChooserWorkspace project={defaultProject} onChange={onChange} onBack={onBack} onContinue={onContinue} />);
  fireEvent.click(screen.getByRole("radio", { name: /Full-Bleed Hero/ }));
  expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ layout: expect.objectContaining({ name: "Full-Bleed Hero" }) }));
  fireEvent.click(screen.getByRole("button", { name: "Back to business details" }));
  fireEvent.click(screen.getByRole("button", { name: "Continue to customize" }));
  expect(onBack).toHaveBeenCalledOnce();
  expect(onContinue).toHaveBeenCalledOnce();
});
