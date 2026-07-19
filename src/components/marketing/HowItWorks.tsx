import { processSteps } from "../../data/marketingHome";

export function HowItWorks() {
  return (
    <section className="marketing-section process-section" id="how-it-works">
      <div className="marketing-section__intro"><div><span className="section-index">How it works</span><h2>From your brief to an install-ready website</h2></div><p>Four clear stages. The website remains yours to install, edit, and publish.</p></div>
      <ol className="process-grid">{processSteps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
    </section>
  );
}
