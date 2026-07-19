import { useEffect, useMemo, useRef, useState } from "react";

export const BUILD_STAGES = [
  "Preparing content",
  "Building pages",
  "Applying styles",
  "Packaging WordPress website",
] as const;

interface BuildSequenceOptions {
  onComplete: () => void;
  intervalMs?: number;
  reducedMotion?: boolean;
}

export function useBuildSequence({ onComplete, intervalMs = 650, reducedMotion }: BuildSequenceOptions) {
  const [completedCount, setCompletedCount] = useState(0);
  const timerRef = useRef<number | null>(null);
  const completionCalled = useRef(false);
  const shouldReduceMotion = reducedMotion ?? (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) ?? false;

  useEffect(() => {
    if (shouldReduceMotion) {
      setCompletedCount(BUILD_STAGES.length);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setCompletedCount((count) => Math.min(count + 1, BUILD_STAGES.length));
    }, intervalMs);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [intervalMs, shouldReduceMotion]);

  useEffect(() => {
    if (completedCount !== BUILD_STAGES.length) return;
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    if (!completionCalled.current) {
      completionCalled.current = true;
      onComplete();
    }
  }, [completedCount, onComplete]);

  const statuses = useMemo(() => BUILD_STAGES.map((_, index) => (
    index < completedCount ? "complete" : index === completedCount ? "current" : "upcoming"
  )), [completedCount]);

  return {
    completedCount,
    currentStage: BUILD_STAGES[Math.min(completedCount, BUILD_STAGES.length - 1)],
    statuses,
    progress: (completedCount / BUILD_STAGES.length) * 100,
  };
}
