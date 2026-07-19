import { useState } from "react";
import { ArrowRight, Bell, Check, CheckCircle2, ShieldCheck } from "lucide-react";
import { PublicPageShell } from "./PublicPageShell";

const tiers = [
  {
    name: "Single Site",
    price: "$29.99",
    description: "For a one-off project.",
    creditLine: "1 website credit",
    features: ["1 complete WordPress website", "Choose from 3 hero styles", "WooCommerce-ready", "Full source code — yours to own, host, and edit", "Instant download"],
    action: "Get 1 credit",
    available: true,
    popular: false,
  },
  {
    name: "Freelancer",
    price: "$74.99",
    description: "For steady client work.",
    creditLine: "3 website credits — $25 / site",
    features: ["3 complete WordPress websites", "Everything in Single Site", "Credits never expire"],
    action: "Get 3 credits",
    available: false,
    popular: false,
  },
  {
    name: "Agency",
    price: "$199.99",
    description: "For agencies and high-volume builders.",
    creditLine: "10 website credits — $20 / site · save 33%",
    features: ["10 complete WordPress websites", "Everything in Freelancer", "Priority support", "Credits never expire"],
    action: "Get 10 credits",
    available: false,
    popular: true,
  },
  {
    name: "Studio",
    price: "$449.99",
    description: "For high-volume studios.",
    creditLine: "25 website credits — $18 / site · save 40%",
    features: ["25 complete WordPress websites", "Everything in Agency", "Credits never expire"],
    action: "Get 25 credits",
    available: false,
    popular: false,
  },
] as const;

const faqs = [
  ["What is a credit?", "Each credit builds one complete WordPress website. Buy a pack, and every site you generate uses one credit. Credits never expire, and there's no subscription."],
  ["Is this a subscription?", "No. Every pack is a one-time purchase. Credits don't expire, and you're never charged automatically — you buy more only when you choose to."],
  ["Do credits expire?", "No. Use them today or a year from now. They stay in your account."],
  ["Do I need any plugins?", "No. PressPilot builds a clean WordPress Full Site Editing (FSE) website — no page builders, no dependencies. E-commerce sites use the free WooCommerce plugin."],
  ["Can I edit the website after I download it?", "Yes. You get the full source code and can edit colours, fonts, layouts, and content in the WordPress Site Editor or directly in code."],
  ["Do I own what I build?", "Yes. Every website you generate is yours to keep, host on any WordPress host, and modify. No lock-in, no account required to keep it."],
  ["Is the output really a standards-compliant FSE site?", "Yes — each website is delivered as a clean, standards-compliant WordPress FSE block theme. Inspectable code, no proprietary builder."],
  ["What if I need more than 25 websites?", <>Email <a href="mailto:support@presspilotapp.com">support@presspilotapp.com</a> for custom volume pricing.</>],
  ["Do you offer refunds?", "Yes, under the conditions in our Refund Policy. Before download, refunds are easy. After download, refunds are available for serious technical defects we can't reasonably fix."],
] as const;

export function PricingPage() {
  const [openWaitlist, setOpenWaitlist] = useState<string | null>(null);
  const [joinedWaitlists, setJoinedWaitlists] = useState<string[]>([]);

  return <PublicPageShell mainId="pricing-content" skipLabel="Skip to pricing" footerCta={{ eyebrow: "One brief. One complete website.", heading: "Ready to build your first website?", copy: "From a short brief to an install-ready WordPress website in minutes." }}>
    <section className="page-hero page-hero--pricing">
      <p className="page-eyebrow">Website credits · One-time purchase</p>
      <h1>Simple, transparent pricing</h1>
      <p>One price per website. No subscription, no recurring fees — buy credits once and use them whenever you want.</p>
      <p className="pricing-hero-note">Each credit builds one complete WordPress website. Credits never expire, and everything you generate is yours to own, host, and edit.</p>
    </section>

    <section className="pricing-tier-grid" aria-label="Website credit packs">
      {tiers.map((tier) => <article className={`pricing-tier-card ${tier.available ? "is-available" : "is-upcoming"}`} key={tier.name}>
        <div className="pricing-tier-card__badges">
          {tier.popular ? <span className="pricing-tier-card__popular">Most popular</span> : null}
          {!tier.available ? <span className="pricing-tier-card__coming">Coming soon</span> : <span className="pricing-tier-card__available">Available now</span>}
        </div>
        <header><h2>{tier.name}</h2><p>{tier.description}</p></header>
        <div className="pricing-tier-card__price"><strong>{tier.price}</strong><span>one-time</span></div>
        <p className="pricing-tier-card__credits">{tier.creditLine}</p>
        <ul>{tier.features.map((feature) => <li key={feature}><Check size={15} /> <span>{feature}</span></li>)}</ul>
        {tier.available ? <>
          <a className="marketing-button pricing-tier-card__action" href="/studio?step=details">{tier.action} <ArrowRight size={16} /></a>
          <p className="pricing-tier-card__reassurance"><ShieldCheck size={13} /> Secure checkout <span>·</span> <a href="#refund-policy">Refund policy</a></p>
        </> : joinedWaitlists.includes(tier.name) ? <div className="pricing-waitlist-success" role="status">
          <CheckCircle2 size={18} /><span><strong>You’re on the {tier.name} waitlist.</strong><small>We’ll email you when this credit pack is ready.</small></span>
        </div> : openWaitlist === tier.name ? <form className="pricing-waitlist" onSubmit={(event) => {
          event.preventDefault();
          setJoinedWaitlists((current) => [...current, tier.name]);
          setOpenWaitlist(null);
        }}>
          <label htmlFor={`waitlist-${tier.name}`}>Email for {tier.name} updates</label>
          <input id={`waitlist-${tier.name}`} name="email" type="email" autoComplete="email" placeholder="you@company.com" autoFocus required />
          <button className="pricing-waitlist__submit" type="submit" aria-label={`Join ${tier.name} waitlist`}>Join waitlist <ArrowRight size={14} /></button>
          <div><small>Pack updates only. No spam.</small><button type="button" onClick={() => setOpenWaitlist(null)}>Not now</button></div>
        </form> : <button className="pricing-tier-card__action pricing-tier-card__notify" type="button" aria-label={`Notify me about ${tier.name}`} onClick={() => setOpenWaitlist(tier.name)}><Bell size={14} /> Notify me</button>}
      </article>)}
    </section>

    <section className="pricing-faq page-section">
      <div className="page-section__intro"><span>Questions, answered</span><h2>Know exactly what you’re buying.</h2><p>No subscriptions, expiring credits, or proprietary lock-in.</p></div>
      <div className="faq-grid">{faqs.map(([question, answer], index) => <details id={question === "Do you offer refunds?" ? "refund-policy" : undefined} open={index === 0} key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>

  </PublicPageShell>;
}
