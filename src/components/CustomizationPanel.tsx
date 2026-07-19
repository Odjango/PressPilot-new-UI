import { Check, ChevronRight, LayoutTemplate, Sparkles } from "lucide-react";
import { paletteOptions, typographyOptions } from "../data/sampleProjects";
import type { StudioProjectSample } from "../types/studio";

interface Props {
  project: StudioProjectSample;
  onChange: (project: StudioProjectSample) => void;
  onLayout: () => void;
}

export function CustomizationPanel({ project, onChange, onLayout }: Props) {
  return (
    <aside className="customization-panel" aria-label="Website customization controls">
      <div className="panel-heading">
        <span>Step 3 of 5</span>
        <h1>Customize the website</h1>
        <p>Adjust the selected direction and see changes immediately.</p>
      </div>

      <section className="selected-layout">
        <span className="selected-layout__icon"><LayoutTemplate size={20} /></span>
        <span><small>Selected layout</small><strong>{project.layout.name}</strong></span>
        <button type="button" onClick={onLayout}>Change layout <ChevronRight size={15} /></button>
      </section>

      <fieldset className="control-group">
        <legend>Typography</legend>
        <div className="choice-grid choice-grid--type">
          {typographyOptions.map((option) => (
            <label key={option.id} className={project.typography.id === option.id ? "is-selected" : ""}>
              <input type="radio" name="typography" value={option.id} checked={project.typography.id === option.id} onChange={() => onChange({ ...project, typography: option })} />
              <span>{option.name}</span>
              {project.typography.id === option.id && <Check size={13} />}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="control-group">
        <legend>Color palette</legend>
        <div className="palette-list">
          {paletteOptions.map((option) => (
            <label key={option.id} className={project.palette.id === option.id ? "is-selected" : ""}>
              <input type="radio" name="palette" value={option.id} checked={project.palette.id === option.id} onChange={() => onChange({ ...project, palette: option })} />
              <span className="swatches" aria-hidden="true">{option.swatches.map((swatch) => <i key={swatch} style={{ background: swatch }} />)}</span>
              <span className="palette-name">{option.name}</span>
              {project.palette.id === option.id && <Check size={14} />}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="control-group field-control">
        <label htmlFor="hero-headline">Hero headline</label>
        <input id="hero-headline" value={project.headline} onChange={(event) => onChange({ ...project, headline: event.target.value })} />
        <small>{project.headline.length} / 64</small>
      </div>

      <div className="demo-notice">
        <Sparkles size={16} />
        <p><strong>Preview-ready content</strong><span>Demo products are included for preview. Connect WooCommerce after installation to accept real orders.</span></p>
      </div>
    </aside>
  );
}
