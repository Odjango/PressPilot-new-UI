import { ArrowRight, Check } from "lucide-react";
import { TransformationPreview } from "./TransformationPreview";

export function HomeHero() {
  return (
    <section className="home-hero" id="top">
      <div className="home-hero__copy">
        <p className="marketing-kicker"><Check size={13} /> Install-ready · Editable in WordPress · 7 languages</p>
        <h1>Your business, turned into a complete <em>WordPress website.</em></h1>
        <p className="home-hero__lead">Tell PressPilot about the business, upload the logo, and choose a language. PressPilot creates the pages, copy, images, and brand styling—then delivers an install-ready WordPress website you can edit and own.</p>
        <p className="home-hero__value">Ready in minutes · $29.99 once · No subscription</p>
        <div className="home-hero__actions">
          <a className="marketing-button" href="/studio">Start in Studio <ArrowRight size={17} /></a>
          <a className="marketing-link" href="#how-it-works">See how it works</a>
        </div>
        <p className="home-hero__reassurance">Works with any WordPress host. Arabic included with full RTL support.</p>
      </div>
      <TransformationPreview />
    </section>
  );
}
