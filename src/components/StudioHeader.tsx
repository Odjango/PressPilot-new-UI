import { ChevronDown, CircleHelp } from "lucide-react";

export function StudioHeader() {
  return (
    <header className="app-header">
      <a className="brand" href="/" aria-label="PressPilot home">
        <span className="brand__mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>PRESSPILOT</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/projects">Projects</a>
        <a href="/pricing">Pricing</a>
        <a href="/#help"><CircleHelp size={15} /> Help</a>
      </nav>
      <button className="account-control" type="button">
        <span className="account-control__avatar">SO</span>
        <span>Soluwrx</span>
        <ChevronDown size={14} />
      </button>
    </header>
  );
}
