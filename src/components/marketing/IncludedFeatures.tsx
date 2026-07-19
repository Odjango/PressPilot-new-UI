import { includedFeatures } from "../../data/marketingHome";

export function IncludedFeatures() {
  return (
    <section className="marketing-section included-section" id="included">
      <div className="marketing-section__intro"><div><span className="section-index">Included</span><h2>Everything required for a complete website</h2></div><p>PressPilot prepares the structure and creative materials, then delivers an editable WordPress website.</p></div>
      <div className="included-grid">{includedFeatures.map(({ icon: Icon, title, copy }) => <article key={title}><Icon size={20} /><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
  );
}
