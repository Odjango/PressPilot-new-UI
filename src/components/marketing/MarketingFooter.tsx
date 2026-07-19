import { ArrowRight } from "lucide-react";

export type MarketingFooterCta = { eyebrow: string; heading: string; copy: string };

const defaultCta: MarketingFooterCta = {
  eyebrow: "Start with the business",
  heading: "Turn your business into a website you own.",
  copy: "Pages, copy, imagery, and brand styling—prepared for WordPress and ready to install.",
};

export function MarketingFooter({ cta = defaultCta }: { cta?: MarketingFooterCta }) {
  return (
    <footer className="marketing-footer" id="help">
      <div className="footer-cta"><span>{cta.eyebrow}</span><h2>{cta.heading}</h2><p>{cta.copy}</p><a className="marketing-button" href="/studio?step=details">Start in Studio <ArrowRight size={17} /></a></div>
      <div className="footer-bottom"><a className="marketing-brand" href="/" aria-label="PressPilot home"><span className="brand__mark" aria-hidden="true"><i /><i /><i /><i /></span><span>PRESSPILOT</span></a><p>Install-ready WordPress websites.</p><nav aria-label="Footer navigation"><a href="/#examples">Examples</a><a href="/pricing">Pricing</a><a href="/#help">Help</a><a href="#privacy">Privacy</a></nav><span>© 2026 PressPilot</span></div>
    </footer>
  );
}
