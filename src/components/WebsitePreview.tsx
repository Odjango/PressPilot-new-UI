import { ExternalLink, Maximize2, Monitor, Smartphone } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";

export function WebsitePreview({ project, isUpdating, compactMetadata = false }: { project: StudioProjectSample; isUpdating: boolean; compactMetadata?: boolean }) {
  const style = { "--preview-accent": project.palette.swatches[2], "--preview-ink": project.palette.swatches[1], fontFamily: project.typography.family } as React.CSSProperties;
  return (
    <section className="website-preview" aria-label="Website preview">
      <div className="preview-toolbar">
        <div><span className="preview-toolbar__pulse" /> <strong>Website preview</strong><span>{project.name}</span></div>
        <div className="preview-toolbar__controls">
          <span>{project.language} · {project.direction.toUpperCase()}</span>
          <div className="viewport-switcher" aria-label="Preview size"><button type="button" className="is-active" aria-label="Desktop preview"><Monitor size={15} /></button><button type="button" aria-label="Mobile preview"><Smartphone size={15} /></button></div>
          <button type="button" aria-label="Expand preview"><Maximize2 size={15} /></button>
        </div>
      </div>

      <div className={`preview-stage ${isUpdating ? "is-updating" : ""}`} style={style}>
        <div className="site-frame" dir={project.direction}>
          <header className="sample-site-header" role="group" aria-label="Sample website header">
            <a href="#" className="sample-brand"><span className="sample-brand__mark">A</span>{project.name}</a>
            <nav aria-label="Sample website navigation"><a href="#">New</a><a href="#">Shop</a><a href="#">Journal</a><a href="#">About</a></nav>
            <a href="#" className="sample-cart">Cart <span>0</span></a>
          </header>
          <main className="sample-hero">
            <div className="sample-hero__content">
              <p className="sample-eyebrow">New season · 2026</p>
              <h2>{project.headline}</h2>
              <p>{project.description}</p>
              <div className="sample-actions"><a href="#">Explore the collection</a><a href="#">Our story <ExternalLink size={13} /></a></div>
              <div className="sample-proof"><span>Independent labels</span><i /><span>Free delivery over $120</span></div>
            </div>
            <div className="sample-hero__visual">
              <img src={project.heroAsset} alt={`${project.name} collection`} />
              <div className="sample-caption"><span>01</span><p>Quietly confident essentials<br />for everyday wear.</p></div>
            </div>
          </main>
        </div>
      </div>

      {!compactMetadata && <div className="preview-metadata" aria-label="Current preview settings">
        <div><span>Layout</span><strong>{project.layout.name}</strong></div>
        <div><span>Typography</span><strong>{project.typography.name}</strong></div>
        <div><span>Palette</span><strong>{project.palette.name}</strong></div>
        <div className="preview-metadata__status"><span className="status-dot" /> <strong>{isUpdating ? "Updating preview…" : "Preview synced"}</strong></div>
      </div>}
      <div className="sr-only" aria-live="polite">{isUpdating ? "Updating preview…" : "Preview updated"}</div>
    </section>
  );
}
