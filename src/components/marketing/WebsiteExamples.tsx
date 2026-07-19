import { ArrowUpRight } from "lucide-react";
import { websiteExamples } from "../../data/marketingHome";

export function WebsiteExamples() {
  return (
    <section className="marketing-section examples-section" id="examples">
      <div className="marketing-section__intro">
        <div><span className="section-index">Website examples</span><h2>See what PressPilot builds</h2></div>
        <p>Explore complete website directions across industries, languages, and brand styles.</p>
      </div>
      <div className="example-grid">
        {websiteExamples.map((example) => <article className="example-card" key={example.name}>
          <div className="example-card__placeholder"><span>{example.name}</span></div>
          <div className="example-card__meta"><div><span>{example.category}</span><h3>{example.name}</h3></div><a href="#preview" aria-label={`Open ${example.name} preview`}><ArrowUpRight size={16} /></a></div>
          <p>{example.language}<i />{example.style}</p>
        </article>)}
      </div>
    </section>
  );
}
