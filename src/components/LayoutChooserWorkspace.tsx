import { ArrowLeft, ArrowRight, Check, CheckCircle2, Image, LayoutPanelTop, Sparkles } from "lucide-react";
import { layoutOptions } from "../data/layoutOptions";
import type { StudioProjectSample } from "../types/studio";

export type HeroGenerationState = "generating" | "ready";

function LayoutMiniature({ variant, name, heroState }: { variant: string; name: string; heroState: HeroGenerationState }) {
  return <div className={`layout-miniature layout-miniature--${variant}`} aria-hidden="true">
    <div className="layout-miniature__nav"><b>A</b><span /><span /><span /></div>
    <div className="layout-miniature__canvas"><div><small>NEW COLLECTION</small><strong>{name === "Minimal Focus" ? "Made with purpose." : "Style that stays."}</strong><i /></div><span className="layout-miniature__image" /></div>
    {heroState === "generating" && variant !== "minimal" ? <span className="layout-miniature__placeholder"><span>PP</span><b>PressPilot image preview</b></span> : null}
  </div>;
}

export function LayoutChooserWorkspace({ project, heroState, heroProgress, onChange, onBack, onContinue }: { project: StudioProjectSample; heroState: HeroGenerationState; heroProgress: number; onChange: (project: StudioProjectSample) => void; onBack: () => void; onContinue: () => void }) {
  return <div className="layout-workspace">
    <header className="layout-workspace__heading"><span>Step 2 · Choose layout</span><h1>Choose a homepage direction</h1><p>Select the structure that best fits the brand. You can refine colors, typography, and the headline next.</p></header>
    <div className={`hero-generation ${heroState === "ready" ? "is-ready" : "is-generating"}`} role="status" aria-live="polite">
      <div className="hero-generation__icon">{heroState === "ready" ? <CheckCircle2 size={19} /> : <Sparkles size={19} />}</div>
      <div className="hero-generation__copy">
        <span>{heroState === "ready" ? "Hero image ready" : "Generating your hero image"}</span>
        <small>{heroState === "ready" ? "The finished image has replaced the PressPilot preview." : "Choose a direction while PressPilot creates an image for this business."}</small>
      </div>
      {heroState === "generating" ? <div className="hero-generation__meter"><span>{heroProgress}%</span><progress aria-label="Hero image generation" max="100" value={heroProgress}>{heroProgress}%</progress></div> : <div className="hero-generation__ready"><Image size={15} /> Added to previews</div>}
    </div>
    <fieldset className="layout-atlas"><legend className="sr-only">Homepage layout</legend>{layoutOptions.map((option) => {
      const selected = project.layout.id === option.id;
      return <label className={`layout-option ${selected ? "is-selected" : ""}`} key={option.id}>
        <input type="radio" name="layout" checked={selected} onChange={() => onChange({ ...project, layout: { id: option.id, name: option.name, description: option.description } })} />
        <LayoutMiniature variant={option.id} name={option.name} heroState={heroState} />
        <span className="layout-option__copy"><span><strong>{option.name}</strong>{selected ? <em><Check size={12} /> Selected</em> : null}</span><small>{option.description}</small><i>{option.guidance}</i></span>
      </label>;
    })}</fieldset>
    <div className="layout-selection-bar"><p><LayoutPanelTop size={16} /><span><strong>Selected layout: {project.layout.name}</strong></span></p><div><button type="button" onClick={onBack}><ArrowLeft size={15} /> Back to business details</button><button className="primary-action" type="button" onClick={onContinue}>Continue to customize <ArrowRight size={16} /></button></div></div>
  </div>;
}
