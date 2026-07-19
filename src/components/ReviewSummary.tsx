import { Check, ChevronRight, FileText, Globe2, LayoutTemplate, Palette, Type } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";

export function ReviewSummary({ project, onEdit }: { project: StudioProjectSample; onEdit: () => void }) {
  const details = [
    { label: "Layout", value: project.layout.name, icon: LayoutTemplate },
    { label: "Typography", value: project.typography.name, icon: Type },
    { label: "Color palette", value: project.palette.name, icon: Palette },
    { label: "Language", value: `${project.language} · ${project.direction.toUpperCase()}`, icon: Globe2 },
  ];

  return (
    <aside className="review-summary" aria-label="Website review summary">
      <div className="review-summary__topline"><span><Check size={14} /> Ready to create</span><button type="button" onClick={onEdit}>Edit design <ChevronRight size={14} /></button></div>
      <h2>Final choices</h2>
      <div className="review-summary__details">
        {details.map(({ label, value, icon: Icon }) => (
          <div key={label}><Icon size={16} /><span><small>{label}</small><strong>{value}</strong></span></div>
        ))}
      </div>
      <div className="review-summary__pages">
        <span><FileText size={16} /><small>Included pages</small></span>
        <p>Home, Shop, About, Cart, Checkout, Contact</p>
      </div>
      <div className="review-summary__assurance"><Check size={14} /><p><strong>Install-ready WordPress website</strong><span>Pages, styles, images, and starter content are included.</span></p></div>
    </aside>
  );
}
