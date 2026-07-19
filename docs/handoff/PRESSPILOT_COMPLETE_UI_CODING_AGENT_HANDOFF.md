# PressPilot Complete UI — Coding Agent Handoff

**Version:** 1.2
**Date:** 2026-07-19  
**Prototype repository:** `Odjango/PressPilot-new-UI`  
**Prototype branch:** `agent/studio-refine-prototype`

## 1. Purpose and boundary

This repository is the approved standalone UI source for a later production migration. It contains real React/CSS implementations of every major PressPilot page and every Studio state so a coding agent can inspect behavior and copy directly instead of inferring them from screenshots.

Do not treat this prototype as authorization to replace production UI. The production PressPilot application repository was not touched during this work. Migration requires a separate user-approved plan and must preserve the production application’s authentication, data, gallery-preview, generation, payment, and download systems.

## 2. Product contract

PressPilot is an **install-ready WordPress website builder**.

The user provides:

- Business name
- Business description
- Logo
- Website language

PressPilot prepares:

- Website structure and pages
- Business-specific copy
- Business-relevant royalty-free imagery
- Brand colors derived from the logo
- Website layouts
- A complete WordPress website ZIP

The buyer can install the website on a compatible WordPress host, edit it with WordPress Full Site Editing, and own the delivered website.

Commercial model: **one credit builds one complete website · credits never expire · no subscription**. At launch, only **Single Site — $29.99 for one credit** is purchasable. Freelancer, Agency, and Studio remain Coming soon and collect tier-specific waitlist interest through `Notify me`.

## 3. Terminology

Use in public and primary product UI:

- website
- WordPress website
- install-ready WordPress website
- complete WordPress website
- website preview
- website design
- website style
- website layout
- website ZIP
- install on WordPress

Avoid public-facing use of:

- theme
- theme generator
- generated theme
- template generator
- output
- single theme

The word `theme` may remain only where WordPress technical internals require it, such as `theme.json`, API schemas, package internals, or installation documentation.

## 4. Route atlas

| URL | Component | Visual capture |
| --- | --- | --- |
| `/` | `MarketingHome` | `artifacts/screenshots/presspilot-home-desktop.png` |
| `/pricing` | `PricingPage` | `artifacts/screenshots/app-pricing-desktop.png`, `app-pricing-mobile.png`, `app-pricing-waitlist.png` |
| `/signin` | `SignInPage` | `artifacts/screenshots/app-signin-desktop.png` |
| `/projects` | `ProjectsPage` | `artifacts/screenshots/app-projects-desktop.png` |
| `/studio?step=details` | `BusinessDetailsWorkspace` | `artifacts/screenshots/studio-step-1-business-details.png` |
| `/studio?step=layout` | `LayoutChooserWorkspace` generating state | `artifacts/screenshots/studio-step-2-choose-layout.png` |
| `/studio?step=layout&hero=ready` | `LayoutChooserWorkspace` ready state | `artifacts/screenshots/studio-step-2-hero-ready.png` |
| `/studio?step=customize` | `CustomizationPanel` + `WebsitePreview` | `artifacts/screenshots/studio-step-3-customize.png` |
| `/studio?step=customize&hero=generating` | customization while the hero job is still running | `artifacts/screenshots/studio-step-3-hero-generating.png` |
| `/studio?step=review` | `ReviewWorkspace` | `artifacts/screenshots/studio-step-4-review.png` |
| `/studio?step=building` | `ReviewWorkspace` + `BuildLedger` | `artifacts/screenshots/studio-step-4-creating.png` |
| `/studio?step=download` | `DownloadWorkspace` | `artifacts/screenshots/studio-step-5-download.png` |

Compatibility behavior: `/studio` defaults to Step 3 because the first approved prototype used that address. New entry CTAs deep-link to `/studio?step=details`.

RTL review: append `&dir=rtl` to a Studio URL. Reference captures:

- `artifacts/screenshots/studio-step-1-arabic-rtl.png`
- `artifacts/screenshots/studio-refine-rtl.png`

Mobile reference captures:

- `artifacts/screenshots/studio-step-1-mobile.png`
- `artifacts/screenshots/studio-step-2-mobile.png`
- `artifacts/screenshots/studio-refine-mobile.png`

## 5. Architecture map

### Entry and routing

- `src/App.tsx` owns route selection and the demonstration Studio project state.
- `src/routing.ts` resolves application paths and valid `?step=` values without an added router dependency.
- `src/data/studioFlow.ts` maps each Studio state to the honest five-step progress display.

Production migration may replace the lightweight route resolver with the production framework’s router. Preserve the URLs and state meanings, not necessarily the prototype routing implementation.

### Shared shells

- `PublicPageShell` composes the ambient background, public header, main landmark, skip link, and optional footer.
- `MarketingHeader` owns public navigation and the responsive mobile navigation panel.
- `MarketingFooter` owns the final public CTA and utility navigation.
- `StudioHeader` owns application-level Projects, Pricing, Help, and account controls.
- `ProjectHeader` owns project identity, status, and links back to the project dashboard.
- `StepProgress` owns the five-step desktop and compact mobile progress display.

### Public/account/project pages

- `MarketingHome` composes the approved homepage sections.
- `PricingPage` presents all four credit packs, launch availability, the supplied FAQ, and closing CTA.
- `SignInPage` is a focused authentication surface; its form is visual only.
- `ProjectsPage` displays contextual project actions from `src/data/projectDashboard.ts`.

### Studio workspaces

- `BusinessDetailsWorkspace` — business brief, logo state, language, optional contact details, readiness summary.
- `LayoutChooserWorkspace` — existing hero-image generation status plus four homepage directions with real miniature compositions.
- `CustomizationPanel` — typography, palette, headline, and layout-change action.
- `WebsitePreview` — the real website preview shared by customization and review.
- `ReviewWorkspace` — Step 4 review and creation-processing shell.
- `ReviewSummary` — final choice summary.
- `BuildLedger` — ordered, politely announced creation states.
- `DownloadWorkspace` — Step 5 delivery shell.
- `DownloadPackageCard` — website artifact and ZIP action.
- `InstallGuide` — expandable WordPress installation guidance.

## 6. Studio state machine

```text
details → layout → customize → review → building → download
   ↑        ↑          ↑          ↑                    │
   └────────┴──────────┴──────────┴──── contextual Back actions
```

Important: `building` is a processing state inside **Step 4 Review**, not a sixth step. The progress indicator stays on Step 4 until the package is ready. Only then does the interface activate Step 5 Download & install.

Prototype state values:

| State | Active progress node | Primary action |
| --- | --- | --- |
| `details` | 1 Business details | Continue to layouts |
| `layout` | 2 Choose layout | Continue to customize |
| `customize` | 3 Customize | Review website |
| `review` | 4 Review | Create website |
| `building` | 4 Review | Disabled “Creating website…” state |
| `download` | 5 Download & install | Download website ZIP |

Production requirements:

- Persist the project between steps.
- Restore the correct step on refresh or direct navigation.
- Prevent impossible states when required data is absent.
- Do not start hero-image generation on Step 1.
- Continuing from Step 1 must start the existing hero-image job and enter Step 2.
- Step 2 must show the existing production PressPilot background image and existing working progress bar until the hero is ready.
- Layout, typography, palette, and headline choices must remain usable while the hero job runs; do not add a new step or block customization.
- When ready, replace the PressPilot background in place with the generated hero image.
- If the user reaches customization before completion, preserve the placeholder/progress rather than showing a false finished image.
- Replace the prototype demonstration timer with the existing production hero-generation request and progress events.
- Preserve the reviewed version through generation and download.

## 7. Integration seams

The prototype uses local state and sample data. Connect these seams to production services:

| Prototype interaction | Production integration |
| --- | --- |
| Business detail changes | Project create/update API and validation |
| Continue from Business details | Start the existing hero-image generation request, then enter Step 2 |
| Step 2 PressPilot image/progress | Reuse the existing production PressPilot background asset and working progress source; do not replace either with prototype CSS/timers |
| Hero-image completion | Replace the background with the returned hero asset in the current preview/gallery boundary |
| Replace logo | Existing upload/storage pipeline and logo-color analysis |
| Language change | Project locale and direction settings |
| Layout choice | Existing layout/gallery-preview identifier |
| Typography/palette/headline changes | Existing preview customization state |
| Website preview | Current gallery/website preview system; keep this component boundary |
| Create website | Existing generation request and job-status pipeline |
| Build ledger | Real job events, errors, retry, and progress announcements |
| Download website ZIP | Existing signed/downloadable artifact endpoint |
| Sign in | Production authentication and password recovery |
| Projects page | Production project query, statuses, and permissions |
| Single Site “Get 1 credit” | Production one-credit checkout and entitlement flow |
| Freelancer, Agency, Studio `Notify me` | Production waitlist endpoint; submit email, requested pack, source page, and consent timestamp without granting credits or starting checkout |

Do not replace the current production gallery-preview system with the prototype miniature. The approved Studio preview surface should be connected to that system after visual migration, as the user explicitly requested.

## 8. Copy and action contract

Public primary CTA: **Start in Studio**.

Pricing launch contract:

- Single Site — $29.99 one-time — 1 credit — active `Get 1 credit` purchase action
- Freelancer — $74.99 one-time — 3 credits — Coming soon with `Notify me`
- Agency — $199.99 one-time — 10 credits — Most popular + Coming soon with `Notify me`
- Studio — $449.99 one-time — 25 credits — Coming soon with `Notify me`
- One credit creates one complete website.
- Credits never expire.
- There is no subscription and no automatic renewal.
- `Notify me` opens an inline, tier-specific email form. It must never initiate checkout or imply the pack is available.
- Successful capture confirms the exact requested tier in place. Production must handle duplicate addresses, API failure, consent logging, and retry without losing the entered address.
- The Single Site action retains `Secure checkout · Refund policy` directly beneath `Get 1 credit`.

Use contextual internal actions:

- Start a new website
- Continue to layouts
- Continue to customize
- Change layout
- Review website
- Create website
- Download website
- Install on WordPress
- Back to projects
- Try again

Avoid applying “Start in Studio” to every internal action.

Supported languages must appear exactly as:

1. English
2. French
3. Spanish
4. German
5. BR-Portuguese
6. Italian
7. Arabic

Never write `Portuguese-BR`. Arabic is first-class RTL output.

## 9. Visual system

### Typography

- Primary family: Host Grotesk
- Strong, compact display headings with negative letter spacing
- Plain, readable product copy
- Website previews may use a distinct customer-brand serif where the selected direction calls for it

### Color tokens

Source: `src/styles/tokens.css`.

- Deep navy canvas: `--canvas-deep`
- Application canvas: `--canvas`
- Quiet/raised surfaces: `--surface-quiet`, `--surface`, `--surface-raised`
- Primary emerald: `--emerald`
- Technical/focus cyan: `--cyan`
- Primary text: `--text`
- Secondary text: `--muted`, `--quiet`

Use emerald for primary actions, completion, and selected states. Use cyan sparingly for keyboard focus or technical emphasis.

### Ambient system

`AmbientBackground` uses haze and large geometric planes. The confusing green X/star decoration was removed after user review and must not be reintroduced. Browser tests explicitly assert that `.ambient__star` does not exist.

### Shape and density

- Moderate 10–24px radii
- Thin low-contrast borders
- Restrained deep shadows
- 44px minimum interactive targets
- Dense application layouts, generous marketing layouts

## 10. Responsive, RTL, and accessibility contracts

### Responsive

- Desktop comparison tasks use multi-column layouts.
- Tablet stacks complex Studio workspaces.
- Mobile uses one column and the compact `Step N of 5` progress label.
- No route may create document-level horizontal scrolling at 390px.
- Public mobile navigation opens from the 44px menu control and exposes real links.

### RTL

- Apply `dir="rtl"` and `lang="ar"` at document level for Arabic projects.
- Prefer CSS logical properties.
- Mirror directional arrow/chevron icons.
- Reverse application column order naturally through document direction.
- Do not merely right-align text while leaving structural order LTR.

### Accessibility

- Preserve skip links, landmarks, semantic headings, forms, fieldsets, labels, and status announcements.
- Keep the visible `:focus-visible` treatment.
- Communicate selected/completed states with text/icons and semantics, not color alone.
- Preserve `aria-live="polite"` for website preview and creation updates.
- Respect `prefers-reduced-motion`.
- Do not autoplay audio.

## 11. CSS ownership

- `src/styles/tokens.css` — shared design tokens
- `src/styles/global.css` — resets, shell, ambient, shared Studio/application primitives, RTL/focus rules
- `src/styles/marketing.css` — homepage, public header/footer, marketing components
- `src/styles/pages.css` — Pricing, Sign in, Projects
- `src/styles/studio.css` — all five Studio steps, previews, review, building, download

When migrating, consolidate only after visual parity is established. Prematurely translating all styles into another abstraction makes visual comparison harder.

## 12. Recommended migration order

1. Copy tokens, font loading, focus behavior, and ambient system into the production design layer.
2. Migrate shared public/application headers, footer, project header, and progress indicator.
3. Migrate Projects and the Step 1 Business details shell around existing production data.
4. Migrate Step 2, map its selected IDs to current layout/gallery data, and bind its progress/placeholder to the existing hero-image job and PressPilot background asset.
5. Migrate Step 3 controls while connecting `WebsitePreview` styling to the current gallery-preview system and preserving any still-running hero state.
6. Migrate Step 4 review and bind the building ledger to real generation events.
7. Migrate Step 5 and connect the real website ZIP plus install instructions.
8. Migrate public Pricing/Sign in/Homepage pages as appropriate to the production deployment boundary.
9. Re-run responsive, RTL, keyboard, reduced-motion, and complete production journey checks.

At every phase, preserve existing backend contracts and compare against the committed screenshots before proceeding.

## 13. Verification commands

```bash
npm test
npm run build
npm run test:e2e
npm run check
```

Key test ownership:

- `src/StudioFlow.test.tsx` — complete Studio journey and URL state
- `src/components/BusinessDetailsWorkspace.test.tsx` — Step 1
- `src/components/LayoutChooserWorkspace.test.tsx` — Step 2
- Existing component tests — Steps 3–5
- `tests/complete-pages.spec.ts` — direct routes, mobile overflow, mobile nav, RTL, target sizes
- `tests/complete-pages-visual.spec.ts` — final route/state visual atlas
- Existing marketing and Studio visual specs — homepage and responsive Step 3 regression captures

## 14. Non-goals and deferred production work

Not implemented in this UI repository:

- Real authentication or account recovery
- Database persistence
- Logo upload/storage
- Checkout or entitlement wiring (the Single Site control is visually active but remains a prototype route)
- Waitlist persistence or email delivery (the prototype demonstrates the complete capture and success states locally)
- Production website generation
- Generation failure/retry handling
- Real ZIP creation/download
- Production gallery-preview connection
- Analytics, email, support, or documentation integrations

These are deliberate integration boundaries, not missing visual pages.

## 15. Acceptance checklist for the coding agent

- [ ] Production app preserves the five-step meaning and Step 4 building state.
- [ ] Public terminology says website, not theme, except where technically required.
- [ ] Entry CTAs lead to Business details.
- [ ] Existing project data survives navigation and refresh.
- [ ] Step 1 does not start hero-image generation.
- [ ] Entering Step 2 starts the existing production hero job and shows the existing PressPilot background/progress.
- [ ] Users can continue choosing layouts and styling while the hero job runs.
- [ ] The generated hero replaces the placeholder in place when ready.
- [ ] Layout selection maps to real gallery-preview data.
- [ ] Studio preview connects to the current gallery-preview system.
- [ ] Arabic applies full structural RTL.
- [ ] Mobile routes have no horizontal document overflow.
- [ ] Key targets are at least 44px and keyboard focus is visible.
- [ ] Reduced-motion mode remains stable.
- [ ] Generation errors and retry states are added using real backend results.
- [ ] Pricing shows four tiers, with only Single Site purchasable at launch.
- [ ] Each Coming soon pack collects a tier-specific email through `Notify me` and never enters checkout.
- [ ] Waitlist submissions persist the email, requested pack, source, and consent timestamp and expose honest error/retry states.
- [ ] ZIP download uses the production artifact endpoint.
- [ ] The green X/star is absent.
- [ ] Visual parity is compared against `artifacts/screenshots/` before release.
