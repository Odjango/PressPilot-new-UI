import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { defaultProject } from "../data/sampleProjects";
import { BusinessDetailsWorkspace } from "./BusinessDetailsWorkspace";

test("collects the complete business brief with seven exact languages", () => {
  render(<BusinessDetailsWorkspace project={defaultProject} onChange={vi.fn()} onContinue={vi.fn()} />);
  expect(screen.getByRole("heading", { name: "Tell us about the business" })).toBeInTheDocument();
  expect(screen.getByLabelText("Business name")).toHaveValue("Amigo Store");
  expect(screen.getByLabelText("Business description")).toHaveValue(defaultProject.description);
  expect(screen.getByText("Logo attached")).toBeInTheDocument();
  for (const language of ["English", "French", "Spanish", "German", "BR-Portuguese", "Italian", "Arabic"]) {
    expect(screen.getByRole("radio", { name: language })).toBeInTheDocument();
  }
  expect(screen.getByText("Arabic includes full right-to-left support.")).toBeInTheDocument();
});

test("updates the brief, reveals optional contact fields, and continues", () => {
  const onChange = vi.fn();
  const onContinue = vi.fn();
  render(<BusinessDetailsWorkspace project={defaultProject} onChange={onChange} onContinue={onContinue} />);
  fireEvent.change(screen.getByLabelText("Business name"), { target: { value: "Northline Studio" } });
  expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ name: "Northline Studio" }));
  fireEvent.click(screen.getByText("Optional contact details"));
  expect(screen.getByLabelText("Business email")).toBeInTheDocument();
  expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Continue to layouts" }));
  expect(onContinue).toHaveBeenCalledOnce();
});
