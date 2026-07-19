import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BuildLedger } from "./BuildLedger";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test("shows an ordered, politely announced Step 4 build sequence", () => {
  const onComplete = vi.fn();
  render(<BuildLedger onComplete={onComplete} intervalMs={100} />);

  expect(screen.getByText("Step 4 · Creating website")).toBeInTheDocument();
  expect(screen.getByRole("list", { name: "Website build progress" })).toBeInTheDocument();
  expect(screen.getByText("Preparing content").closest("li")).toHaveAttribute("data-status", "current");
  expect(screen.getByRole("status")).toHaveTextContent("Preparing content");

  act(() => vi.advanceTimersByTime(100));
  expect(screen.getByText("Preparing content").closest("li")).toHaveAttribute("data-status", "complete");
  expect(screen.getByText("Building pages").closest("li")).toHaveAttribute("data-status", "current");
});
