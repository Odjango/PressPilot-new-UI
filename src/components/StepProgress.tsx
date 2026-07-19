import { Check } from "lucide-react";
import type { StudioStep } from "../types/studio";

export function StepProgress({ steps }: { steps: StudioStep[] }) {
  const currentIndex = steps.findIndex((step) => step.status === "current");
  return (
    <nav className="step-progress" aria-label="Website creation progress">
      <p className="step-progress__compact">Step {currentIndex + 1} of {steps.length} — {steps[currentIndex].label}</p>
      <ol>
        {steps.map((step, index) => (
          <li key={step.id} className={`step-progress__item is-${step.status}`} aria-current={step.status === "current" ? "step" : undefined}>
            <span className="step-progress__node">
              {step.status === "complete" ? <><Check size={14} /><span className="sr-only">Complete</span></> : index + 1}
            </span>
            <span className="step-progress__label">{step.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
