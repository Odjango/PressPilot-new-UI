import { ArrowLeft, ArrowRight } from "lucide-react";

export function StudioActionBar({ onBack, onReview }: { onBack: () => void; onReview: () => void }) {
  return (
    <div className="action-bar">
      <button className="back-action" type="button" onClick={onBack}><ArrowLeft size={17} /> Back to layout</button>
      <p><span>3</span> of 5 steps complete</p>
      <button className="primary-action" type="button" onClick={onReview}>Review website <ArrowRight size={18} /></button>
    </div>
  );
}
