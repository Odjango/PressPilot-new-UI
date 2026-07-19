import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";
import { BuildLedger } from "./BuildLedger";
import { ReviewSummary } from "./ReviewSummary";
import { WebsitePreview } from "./WebsitePreview";

interface ReviewWorkspaceProps {
  project: StudioProjectSample;
  onCreate: () => void;
  onBack: () => void;
  onEdit: () => void;
  building?: boolean;
  onBuildComplete?: () => void;
  buildIntervalMs?: number;
}

export function ReviewWorkspace({ project, onCreate, onBack, onEdit, building = false, onBuildComplete = () => undefined, buildIntervalMs }: ReviewWorkspaceProps) {
  return (
    <section className="review-workspace" aria-labelledby="review-title">
      <header className="review-heading">
        <span>Step 4 of 5</span>
        <h1 id="review-title">{building ? "Creating your website" : "Review the website"}</h1>
        <p>{building ? "Your final direction is locked while PressPilot prepares the install-ready package." : "Confirm the final direction, then PressPilot will package it as an install-ready WordPress website."}</p>
      </header>
      <div className="review-layout">
        <WebsitePreview project={project} isUpdating={false} compactMetadata />
        {building ? <BuildLedger onComplete={onBuildComplete} intervalMs={buildIntervalMs} /> : <ReviewSummary project={project} onEdit={onEdit} />}
      </div>
      <footer className="flow-action-bar">
        <button className="back-action" type="button" onClick={onBack} disabled={building}><ArrowLeft size={17} /> Back to customize</button>
        <p>{building ? "Creating the delivery package…" : "Your choices are saved automatically."}</p>
        <button className="primary-action" type="button" onClick={onCreate} disabled={building}>{building ? "Creating website…" : "Create website"} {!building && <ArrowRight size={18} />}</button>
      </footer>
    </section>
  );
}
