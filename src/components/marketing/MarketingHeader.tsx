import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";

export function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="marketing-header">
      <a className="marketing-brand" href="/" aria-label="PressPilot home">
        <span className="brand__mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>PRESSPILOT</span>
      </a>
      <nav className={`marketing-nav ${menuOpen ? "is-open" : ""}`} aria-label="Public navigation" id="public-navigation">
        <a href="/#how-it-works">How it works</a>
        <a href="/#examples">Website examples</a>
        <a href="/pricing">Pricing</a>
        <a href="/#help">Help</a>
        <a className="marketing-nav__mobile" href="/signin" aria-hidden={!menuOpen} tabIndex={menuOpen ? 0 : -1}>Sign in</a>
        <a className="marketing-nav__mobile marketing-nav__mobile--primary" href="/studio?step=details" aria-hidden={!menuOpen} tabIndex={menuOpen ? 0 : -1}>Start in Studio <ArrowUpRight size={15} /></a>
      </nav>
      <div className="marketing-header__actions">
        <a className="marketing-signin" href="/signin">Sign in</a>
        <a className="marketing-button marketing-button--small" href="/studio?step=details">Start in Studio <ArrowUpRight size={15} /></a>
      </div>
      <button className="marketing-menu" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen((open) => !open)}><Menu size={20} /></button>
    </header>
  );
}
