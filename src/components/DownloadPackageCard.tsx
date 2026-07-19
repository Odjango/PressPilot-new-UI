import { Check, Download, FileArchive, ShieldCheck } from "lucide-react";
import type { StudioProjectSample } from "../types/studio";

export function DownloadPackageCard({ project }: { project: StudioProjectSample }) {
  return (
    <article className="download-package-card">
      <div className="delivery-artifact" aria-label={`${project.name} delivery preview`}>
        <div className="delivery-artifact__chrome"><span /><span /><span /><strong>{project.name}</strong></div>
        <div className="delivery-artifact__body">
          <div><small>New season · 2026</small><strong>{project.headline}</strong><span>Explore collection</span></div>
          <img src={project.heroAsset} alt={`${project.name} website preview`} />
        </div>
        <div className="delivery-artifact__seal"><Check size={16} /> Ready</div>
      </div>
      <div className="download-package-card__content">
        <div className="package-kicker"><FileArchive size={17} /><span><small>Delivery package</small><strong>WordPress website</strong></span></div>
        <h2>{project.name}.zip</h2>
        <p>Your complete website ZIP includes pages, styles, images, starter content, and installation guidance.</p>
        <dl>
          <div><dt>Format</dt><dd>WordPress ZIP</dd></div>
          <div><dt>Pages</dt><dd>6 included</dd></div>
          <div><dt>Access</dt><dd>Available for 7 days</dd></div>
        </dl>
        <button className="primary-action" type="button"><Download size={17} /> Download website</button>
        <div className="package-assurance"><ShieldCheck size={14} /> Scanned and ready to install</div>
      </div>
    </article>
  );
}
