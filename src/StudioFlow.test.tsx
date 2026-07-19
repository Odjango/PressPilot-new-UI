import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

test("connects every Studio step to an honest deep-link state", async () => {
  vi.useFakeTimers();
  window.history.replaceState({}, "", "/studio?step=details");
  render(<App />);

  expect(screen.getByText("Business details").closest("li")).toHaveAttribute("aria-current", "step");
  fireEvent.click(screen.getByRole("button", { name: "Continue to layouts" }));
  expect(window.location.search).toContain("step=layout");
  fireEvent.click(screen.getByRole("button", { name: "Continue to customize" }));
  expect(window.location.search).toContain("step=customize");
  fireEvent.click(screen.getByRole("button", { name: "Review website" }));
  expect(window.location.search).toContain("step=review");
  fireEvent.click(screen.getByRole("button", { name: "Create website" }));
  expect(window.location.search).toContain("step=building");
  expect(screen.getByText("Review").closest("li")).toHaveAttribute("aria-current", "step");
  await act(async () => vi.advanceTimersByTime(2600));
  expect(window.location.search).toContain("step=download");
  expect(screen.getByText("Download & install").closest("li")).toHaveAttribute("aria-current", "step");
  vi.useRealTimers();
});

test("uses contextual back actions and real app navigation links", () => {
  window.history.replaceState({}, "", "/studio?step=customize");
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Back to layout" }));
  expect(window.location.search).toContain("step=layout");
  expect(screen.getByRole("link", { name: "Back to projects" })).toHaveAttribute("href", "/projects");
  expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
});
