import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";
import { ReviewSummary } from "./ReviewSummary";
import { WebsitePreview } from "./WebsitePreview";

interface ReviewWorkspaceProps {
  project: StudioProjectSample;
  onCreate: () => void;
  onBack: () => void;
  onEdit: () => void;
}

export function ReviewWorkspace({ project, onCreate, onBack, onEdit }: ReviewWorkspaceProps) {
  return (
    <section className="review-workspace" aria-labelledby="review-title">
      <header className="review-heading">
        <span>Step 4 of 5</span>
        <h1 id="review-title">Review the website</h1>
        <p>Confirm the final direction, then PressPilot will package it as an install-ready WordPress website.</p>
      </header>
      <div className="review-layout">
        <WebsitePreview project={project} isUpdating={false} compactMetadata />
        <ReviewSummary project={project} onEdit={onEdit} />
      </div>
      <footer className="flow-action-bar">
        <button className="back-action" type="button" onClick={onBack}><ArrowLeft size={17} /> Back to customize</button>
        <p>Your choices are saved automatically.</p>
        <button className="primary-action" type="button" onClick={onCreate}>Create website <ArrowRight size={18} /></button>
      </footer>
    </section>
  );
}
