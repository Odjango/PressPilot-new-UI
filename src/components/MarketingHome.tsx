import { AmbientBackground } from "./AmbientBackground";
import { HomeHero } from "./marketing/HomeHero";
import { HowItWorks } from "./marketing/HowItWorks";
import { IncludedFeatures } from "./marketing/IncludedFeatures";
import { MarketingFooter } from "./marketing/MarketingFooter";
import { MarketingHeader } from "./marketing/MarketingHeader";
import { PricingSection } from "./marketing/PricingSection";
import { ProductDemoSection } from "./marketing/ProductDemoSection";
import { WebsiteExamples } from "./marketing/WebsiteExamples";

export function MarketingHome() {
  return <div className="marketing-shell">
    <a className="skip-link" href="#homepage-content">Skip to homepage content</a>
    <AmbientBackground />
    <MarketingHeader />
    <main id="homepage-content">
      <HomeHero />
      <ProductDemoSection />
      <WebsiteExamples />
      <HowItWorks />
      <IncludedFeatures />
      <PricingSection />
    </main>
    <MarketingFooter />
  </div>;
}
