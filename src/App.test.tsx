import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

function renderAt(path: string) {
  window.history.replaceState({}, "", path);
  return render(<App />);
}

test("renders the public PressPilot homepage at the root route", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { name: "Your business, turned into a complete WordPress website." })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Start in Studio" })).toHaveAttribute("href", "/studio");
});

test("renders the approved Studio step", () => {
  const { container } = renderAt("/studio");
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByLabelText("Ambient background")).toHaveAttribute("aria-hidden", "true");
  expect(container.querySelector(".ambient__star")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /customize the website/i })).toBeInTheDocument();
  expect(screen.getAllByText(/step 3 of 5/i)).not.toHaveLength(0);
  expect(screen.getByRole("region", { name: "Website preview" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Review website" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Back to layout" })).toBeInTheDocument();
});

test("moves from Step 3 through inline creation to a visibly active Step 5", async () => {
  vi.useFakeTimers();
  renderAt("/studio");

  expect(screen.getByText("Customize").closest("li")).toHaveAttribute("aria-current", "step");
  fireEvent.click(screen.getByRole("button", { name: "Review website" }));
  expect(screen.getByRole("heading", { name: "Review the website" })).toBeInTheDocument();
  expect(screen.getByText("Review").closest("li")).toHaveAttribute("aria-current", "step");

  fireEvent.click(screen.getByRole("button", { name: "Create website" }));
  expect(screen.getByRole("heading", { name: "Creating your website" })).toBeInTheDocument();
  expect(screen.getByText("Step 4 · Creating website")).toBeInTheDocument();
  expect(screen.getByText("Review").closest("li")).toHaveAttribute("aria-current", "step");

  await act(async () => vi.advanceTimersByTime(2600));
  expect(screen.getByRole("heading", { name: "Your website is ready" })).toBeInTheDocument();
  expect(screen.getByText("Download & install").closest("li")).toHaveAttribute("aria-current", "step");
  expect(screen.getAllByText("Complete")).toHaveLength(4);

  fireEvent.click(screen.getByRole("button", { name: "Back to review" }));
  expect(screen.getByRole("heading", { name: "Review the website" })).toBeInTheDocument();
  vi.useRealTimers();
});
