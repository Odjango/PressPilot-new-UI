import { ArrowRight } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="marketing-footer" id="help">
      <div className="footer-cta"><span>Start with the business</span><h2>Turn your business into a website you own.</h2><p>Pages, copy, imagery, and brand styling—prepared for WordPress and ready to install.</p><a className="marketing-button" href="/studio">Start in Studio <ArrowRight size={17} /></a></div>
      <div className="footer-bottom"><a className="marketing-brand" href="#top" aria-label="PressPilot home"><span className="brand__mark" aria-hidden="true"><i /><i /><i /><i /></span><span>PRESSPILOT</span></a><p>Install-ready WordPress websites.</p><nav aria-label="Footer navigation"><a href="#examples">Examples</a><a href="#pricing">Pricing</a><a href="#help">Help</a><a href="#privacy">Privacy</a></nav><span>© 2026 PressPilot</span></div>
    </footer>
  );
}
