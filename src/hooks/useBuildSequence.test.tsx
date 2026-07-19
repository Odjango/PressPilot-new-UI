import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useBuildSequence } from "./useBuildSequence";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test("completes the four build stages in order and calls onComplete once", () => {
  const onComplete = vi.fn();
  const { result } = renderHook(() => useBuildSequence({ onComplete, intervalMs: 100 }));

  expect(result.current.currentStage).toBe("Preparing content");
  expect(result.current.completedCount).toBe(0);

  act(() => vi.advanceTimersByTime(100));
  expect(result.current.currentStage).toBe("Building pages");
  act(() => vi.advanceTimersByTime(300));

  expect(result.current.completedCount).toBe(4);
  expect(onComplete).toHaveBeenCalledOnce();
});

test("completes immediately when reduced motion is requested", () => {
  const onComplete = vi.fn();
  const { result } = renderHook(() => useBuildSequence({ onComplete, reducedMotion: true }));
  expect(result.current.completedCount).toBe(4);
  expect(onComplete).toHaveBeenCalledOnce();
});
