import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { defaultProject } from "../data/sampleProjects";
import { ReviewWorkspace } from "./ReviewWorkspace";

test("reviews the final website without duplicating customization controls", async () => {
  const user = userEvent.setup();
  const onCreate = vi.fn();
  const onBack = vi.fn();
  const onEdit = vi.fn();

  render(
    <ReviewWorkspace
      project={defaultProject}
      onCreate={onCreate}
      onBack={onBack}
      onEdit={onEdit}
    />,
  );

  expect(screen.getByRole("heading", { name: "Review the website" })).toBeInTheDocument();
  expect(screen.getByText(/package it as an install-ready WordPress website/i)).toBeInTheDocument();
  expect(screen.getByRole("region", { name: "Website preview" })).toBeInTheDocument();
  const summary = within(screen.getByRole("complementary", { name: "Website review summary" }));
  expect(summary.getByText("Split Hero")).toBeInTheDocument();
  expect(summary.getByText("Clean Sans")).toBeInTheDocument();
  expect(summary.getByText("Brand Kit")).toBeInTheDocument();
  expect(summary.getByText("English · LTR")).toBeInTheDocument();
  expect(summary.getByText("Home, Shop, About, Cart, Checkout, Contact")).toBeInTheDocument();

  const createButton = screen.getByRole("button", { name: "Create website" });
  expect(createButton).toHaveClass("primary-action");
  expect(screen.getByRole("button", { name: "Edit design" })).not.toHaveClass("primary-action");
  expect(screen.getByRole("button", { name: "Back to customize" })).not.toHaveClass("primary-action");

  await user.click(createButton);
  expect(onCreate).toHaveBeenCalledOnce();
});
