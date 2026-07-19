import { ArrowRight, Check } from "lucide-react";

export function PricingSection() {
  return (
    <section className="marketing-section pricing-section" id="pricing">
      <div className="pricing-copy"><span className="section-index">Simple pricing</span><h2>One website. One clear price.</h2><p>No subscription and no recurring platform fee. Pay once for the complete WordPress website ZIP.</p></div>
      <article className="pricing-card"><span>Complete WordPress website</span><p><strong>$29</strong><sup>.99</sup><small>one-time payment</small></p><ul><li><Check size={14} /> Complete page structure</li><li><Check size={14} /> Copy and royalty-free imagery</li><li><Check size={14} /> Seven languages with Arabic RTL</li><li><Check size={14} /> Editable WordPress delivery</li></ul><a className="marketing-button" href="/studio?step=details">Start in Studio <ArrowRight size={17} /></a></article>
    </section>
  );
}
