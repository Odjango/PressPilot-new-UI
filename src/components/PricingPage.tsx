import { ArrowRight, Check, Globe2, Images, LayoutTemplate, Palette, PencilRuler, PackageCheck } from "lucide-react";
import { PublicPageShell } from "./PublicPageShell";

const inclusions = [
  [LayoutTemplate, "Complete page structure", "Home, About, Contact, and the business-specific pages your website needs."],
  [PencilRuler, "Copy written for the business", "Clear starting copy shaped around the brief instead of generic placeholder text."],
  [Images, "Royalty-free imagery", "Business-relevant images selected to support the website direction."],
  [Palette, "Brand styling from the logo", "A coordinated color system and typography direction based on the brand."],
  [Globe2, "Seven website languages", "English, French, Spanish, German, BR-Portuguese, Italian, and Arabic RTL."],
  [PackageCheck, "Install-ready website ZIP", "Download once, install on any WordPress host, and continue editing in WordPress."],
] as const;

export function PricingPage() {
  return <PublicPageShell mainId="pricing-content" skipLabel="Skip to pricing">
    <section className="page-hero page-hero--pricing">
      <p className="page-eyebrow">Simple, one-time pricing</p>
      <h1>One clear price. <em>Your complete website.</em></h1>
      <p>PressPilot creates the pages, copy, images, and brand styling, then prepares an install-ready WordPress website you can edit and own.</p>
    </section>
    <section className="price-offer" aria-label="Complete WordPress website price">
      <div className="price-offer__summary">
        <span>Complete WordPress website</span>
        <div className="price-lockup"><strong>$29.99</strong><small>one-time payment</small></div>
        <p><strong>No subscription</strong><br />No recurring platform fee. Use any WordPress host.</p>
        <a className="marketing-button" href="/studio?step=details">Start in Studio <ArrowRight size={17} /></a>
      </div>
      <ul className="price-assurances">
        <li><Check size={16} /> Install-ready website ZIP</li>
        <li><Check size={16} /> Editable with WordPress Full Site Editing</li>
        <li><Check size={16} /> Arabic included with full RTL support</li>
        <li><Check size={16} /> You own the delivered website</li>
      </ul>
    </section>
    <section className="page-section">
      <div className="page-section__intro"><span>Everything included</span><h2>More than a homepage preview.</h2><p>Each purchase covers the complete website package built from the business brief and brand.</p></div>
      <div className="inclusion-atlas">{inclusions.map(([Icon, title, copy]) => <article key={title}><Icon size={19} /><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="pricing-faq page-section">
      <div className="page-section__intro"><span>Before you start</span><h2>Clear answers, before checkout.</h2></div>
      <div className="faq-grid">
        <details open><summary>Is this a subscription?</summary><p>No. The $29.99 price is a one-time payment for one complete website package.</p></details>
        <details><summary>Can I edit the website later?</summary><p>Yes. The website is built for WordPress Full Site Editing so you can change pages, text, images, and styles.</p></details>
        <details><summary>Where can I host it?</summary><p>Install the downloaded ZIP on any compatible WordPress host. Hosting is not included.</p></details>
        <details><summary>Does Arabic work right-to-left?</summary><p>Yes. Arabic is a first-class website language with full RTL layout support.</p></details>
      </div>
    </section>
  </PublicPageShell>;
}
