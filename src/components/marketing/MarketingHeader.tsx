import { ArrowUpRight, Menu } from "lucide-react";

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <a className="marketing-brand" href="/" aria-label="PressPilot home">
        <span className="brand__mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>PRESSPILOT</span>
      </a>
      <nav className="marketing-nav" aria-label="Public navigation">
        <a href="/#how-it-works">How it works</a>
        <a href="/#examples">Website examples</a>
        <a href="/pricing">Pricing</a>
        <a href="/#help">Help</a>
      </nav>
      <div className="marketing-header__actions">
        <a className="marketing-signin" href="/signin">Sign in</a>
        <a className="marketing-button marketing-button--small" href="/studio?step=details">Start in Studio <ArrowUpRight size={15} /></a>
      </div>
      <button className="marketing-menu" type="button" aria-label="Open navigation"><Menu size={20} /></button>
    </header>
  );
}
