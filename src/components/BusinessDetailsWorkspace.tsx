import { ArrowRight, Check, FileImage, Globe2, Info, Mail, MapPin, Sparkles } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";

const languages = ["English", "French", "Spanish", "German", "BR-Portuguese", "Italian", "Arabic"] as const;

export function BusinessDetailsWorkspace({ project, onChange, onContinue }: { project: StudioProjectSample; onChange: (project: StudioProjectSample) => void; onContinue: () => void }) {
  const update = (changes: Partial<StudioProjectSample>) => onChange({ ...project, ...changes });
  return <>
    <div className="details-workspace">
      <form className="business-details-card" onSubmit={(event) => { event.preventDefault(); onContinue(); }}>
        <header className="studio-section-heading"><span>Step 1 · Business details</span><h1>Tell us about the business</h1><p>These details guide the website structure, copy, imagery, and brand direction.</p></header>
        <div className="details-form-grid">
          <label className="details-field"><span>Business name</span><input value={project.name} onChange={(event) => update({ name: event.target.value })} /></label>
          <label className="details-field details-field--wide"><span>Business description</span><textarea aria-label="Business description" rows={4} value={project.description} onChange={(event) => update({ description: event.target.value })} /><small>Describe what the business offers, who it serves, and what makes it distinct.</small></label>
          <div className="details-field details-field--wide"><span>Brand logo</span><div className="logo-upload"><div className="logo-upload__mark">A</div><div><strong><Check size={13} /> Logo attached</strong><small>amigo-store-logo.svg · colors ready to analyze</small></div><button type="button">Replace logo</button></div></div>
          <fieldset className="language-field details-field--wide"><legend>Website language</legend><div>{languages.map((language) => <label className={project.language === language ? "is-selected" : ""} key={language}><input type="radio" name="language" checked={project.language === language} onChange={() => update({ language, direction: language === "Arabic" ? "rtl" : "ltr" })} /><Globe2 size={14} /><span>{language}</span>{project.language === language ? <Check size={13} /> : null}</label>)}</div><small><Info size={12} /> Arabic includes full right-to-left support.</small></fieldset>
          <details className="contact-disclosure details-field--wide"><summary><span><Mail size={15} /> Optional contact details</span><small>Add details for the Contact page and website footer</small></summary><div className="contact-grid"><label><span>Business email</span><input type="email" placeholder="hello@business.com" /></label><label><span>Phone number</span><input type="tel" placeholder="(555) 000-0000" /></label><label className="contact-grid__wide"><span>Street address</span><input placeholder="Street address" /></label><label><span>City</span><input placeholder="City" /></label><label><span>State / region</span><input placeholder="State or region" /></label></div></details>
        </div>
        <div className="details-card-action"><p><Sparkles size={14} /> You can change these details before creating the website.</p><button className="primary-action" type="submit">Continue to layouts <ArrowRight size={16} /></button></div>
      </form>
      <aside className="brief-readiness" aria-label="Business brief summary">
        <span className="brief-readiness__icon"><FileImage size={20} /></span><p>Brief readiness</p><h2>Everything needed to start.</h2>
        <dl><div><dt>Business</dt><dd>{project.name}</dd></div><div><dt>Logo</dt><dd><Check size={12} /> Attached</dd></div><div><dt>Language</dt><dd>{project.language}{project.direction === "rtl" ? " · RTL" : ""}</dd></div><div><dt>Contact details</dt><dd>Optional</dd></div></dl>
        <div className="brief-readiness__note"><MapPin size={15} /><p><strong>Built around this business</strong><span>PressPilot uses the brief to choose the right pages, copy direction, and royalty-free imagery.</span></p></div>
        <div className="brief-readiness__preview"><span>AMIGO</span><strong>{project.name}</strong><i /><i /><i /></div>
      </aside>
    </div>
  </>;
}
