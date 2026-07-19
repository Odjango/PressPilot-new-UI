import { ArrowLeft, ArrowRight } from "lucide-react";

export function StudioActionBar() {
  return (
    <div className="action-bar">
      <button className="back-action" type="button"><ArrowLeft size={17} /> Back to layout</button>
      <p><span>3</span> of 5 steps complete</p>
      <button className="primary-action" type="button">Review website <ArrowRight size={18} /></button>
    </div>
  );
}
