import type { ReactNode } from "react";
import { AmbientBackground } from "./AmbientBackground";
import { MarketingFooter } from "./marketing/MarketingFooter";
import { MarketingHeader } from "./marketing/MarketingHeader";

export function PublicPageShell({ children, mainId, skipLabel, footer = true }: { children: ReactNode; mainId: string; skipLabel: string; footer?: boolean }) {
  return <div className="marketing-shell product-page-shell">
    <a className="skip-link" href={`#${mainId}`}>{skipLabel}</a>
    <AmbientBackground />
    <MarketingHeader />
    <main id={mainId} tabIndex={-1}>{children}</main>
    {footer ? <MarketingFooter /> : null}
  </div>;
}
