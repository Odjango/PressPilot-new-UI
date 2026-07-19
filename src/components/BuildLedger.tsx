import { Check, Circle, LoaderCircle, LockKeyhole } from "lucide-react";
import { BUILD_STAGES, useBuildSequence } from "../hooks/useBuildSequence";

interface BuildLedgerProps {
  onComplete: () => void;
  intervalMs?: number;
  reducedMotion?: boolean;
}

export function BuildLedger({ onComplete, intervalMs, reducedMotion }: BuildLedgerProps) {
  const { completedCount, currentStage, statuses, progress } = useBuildSequence({ onComplete, intervalMs, reducedMotion });
  return (
    <aside className="build-ledger" aria-label="Creating website">
      <div className="build-ledger__eyebrow"><LoaderCircle size={14} /> Step 4 · Creating website</div>
      <h2>Turning your choices into a website.</h2>
      <p>The preview stays visible while PressPilot prepares the complete WordPress package.</p>
      <div className="build-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <div className="build-progress__meta"><span>{completedCount} of {BUILD_STAGES.length} complete</span><strong>{Math.round(progress)}%</strong></div>
      <ol aria-label="Website build progress">
        {BUILD_STAGES.map((stage, index) => {
          const status = statuses[index];
          return (
            <li key={stage} data-status={status}>
              <span className="build-ledger__node" aria-hidden="true">
                {status === "complete" ? <Check size={14} /> : status === "current" ? <LoaderCircle size={14} /> : <Circle size={10} />}
              </span>
              <span><strong>{stage}</strong><small>{status === "complete" ? "Complete" : status === "current" ? "In progress" : "Waiting"}</small></span>
            </li>
          );
        })}
      </ol>
      <div className="build-ledger__lock"><LockKeyhole size={14} /><span>Keep this window open. You’ll move to Download & install automatically.</span></div>
      <div className="sr-only" role="status" aria-live="polite">{completedCount === BUILD_STAGES.length ? "Website package ready" : `${currentStage} in progress`}</div>
    </aside>
  );
}
