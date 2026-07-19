# Production migration plan

This plan is framework-neutral because the production App repository was intentionally not touched while designing the new UI. The production coding agent must resolve exact target paths during Phase 0 and record them in its implementation plan before editing.

## Phase 0 — production baseline and contract inventory

### Actions

- Read repository instructions and architecture documentation.
- Create an isolated migration branch/worktree.
- Record `git status`; preserve unrelated user changes.
- Discover package/build/test commands and run a clean baseline.
- Enumerate production routes corresponding to Home, Pricing, Sign in, Projects, and each Studio state.
- Locate the current UI shell, navigation, project header, stepper, forms, preview, generation, checkout, and download components.
- Trace real data/service calls from UI action to response for every integration in `04-PRODUCTION-INTEGRATION-CONTRACTS.md`.
- Capture current production screenshots and network/error behavior for the complete journey.
- Decide the reversible migration boundary: feature flag, alternate route group, layout switch, or staged component flag.

### Required output

A production mapping table with these columns:

| Approved surface | Current production route | Current production component/template | Service/store/API dependencies | New target component/style location | Tests |
| --- | --- | --- | --- | --- | --- |

### Exit gate

- Baseline tests/build pass or existing failures are documented.
- All critical production contracts are located.
- A reversible boundary exists before visual replacement begins.

## Phase 1 — tokens, fonts, global primitives, and feature boundary

### Actions

- Port/adapt `src/styles/tokens.css` into the production token layer.
- Load Host Grotesk through the production-approved font strategy.
- Port global reset/focus/selection/skip-link rules from `src/styles/global.css` without overwriting unrelated application styles.
- Port `AmbientBackground` without the removed X/star decoration.
- Establish namespacing, CSS modules, layers, or a route root class to prevent legacy/new style collisions.
- Add feature-flag or route-shell tests proving both legacy and redesigned paths remain reachable during rollout.

### Exit gate

- Tokens render in an isolated fixture/story/page.
- Keyboard focus is visible.
- Reduced-motion media query is honored.
- Legacy screens remain visually and functionally intact outside the migration boundary.

## Phase 2 — shared public and App shells

### Reference files

- `src/components/PublicPageShell.tsx`
- `src/components/marketing/MarketingHeader.tsx`
- `src/components/marketing/MarketingFooter.tsx`
- `src/components/StudioHeader.tsx`
- `src/components/ProjectHeader.tsx`
- `src/components/StepProgress.tsx`
- `src/styles/marketing.css`
- `src/styles/global.css`
- `src/styles/studio.css`

### Actions

- Adapt public header/footer navigation to real production routes.
- Bind sign-in/account state to production authentication.
- Bind App header/project identity to the real project and user.
- Bind the five visible steps to production navigation/state guards.
- Keep `building` visually on Step 4.
- Port mobile navigation, compact step label, skip links, landmarks, and RTL icon mirroring.

### Exit gate

- Shared shells render real account/project data.
- No prototype user name, project ID, or route resolver remains.
- Desktop/mobile navigation and keyboard traversal pass.

## Phase 3 — public homepage

### Reference files

- `src/components/MarketingHome.tsx`
- `src/components/marketing/*`
- `src/data/marketingHome.ts`
- `src/styles/marketing.css`
- `artifacts/screenshots/presspilot-home-*.png`

### Actions

- Port the approved section order, copy, transformation preview, examples, included features, pricing teaser, and CTA hierarchy.
- Point CTAs to the production Studio entry and Pricing route.
- Replace prototype sample/example assets only if production-approved equivalent assets exist; preserve composition and aspect ratios.
- Preserve semantic sections, image alt text, reduced motion, and responsive stacking.

### Exit gate

- Desktop/tablet/mobile parity captures approved.
- CTA routes are real.
- No public “theme generator” terminology leaks.

## Phase 4 — Pricing, Sign in, and Projects

### Pricing

- Port `PricingPage` and relevant `pages.css` rules.
- Connect Single Site `Get 1 credit` to the real checkout/credit entitlement flow.
- Connect `Refund policy` to the real policy route/document.
- Keep three future packs Coming soon.
- Connect each `Notify me` form to a real waitlist endpoint with loading, duplicate, success, failure, and retry states.
- Preserve Single Site visual dominance even though Agency retains `Most popular`.

### Sign in

- Port the visual form shell, not its prototype behavior.
- Keep real authentication, validation, rate-limit, MFA/SSO (if present), password recovery, CSRF, and redirect handling.
- Ensure authentication errors are announced and do not clear valid input unnecessarily.

### Projects

- Port cards/dashboard summary around the real project query.
- Preserve ownership/permission filtering, pagination, empty/loading/error states, and current next-action logic.
- Map project states to `Continue in Studio`, `Review website`, or `Download website` honestly.

### Exit gate

- Real checkout reaches the correct product without exposing future packs.
- Real waitlist submissions persist the requested tier.
- Sign-in success/error/recovery paths pass.
- Projects display and open real user-owned projects.

## Phase 5 — Studio foundation and Step 1 Business details

### Reference files

- `BusinessDetailsWorkspace.tsx`
- `ProjectHeader.tsx`
- `StepProgress.tsx`
- `src/types/studio.ts`
- `src/data/studioFlow.ts`
- `artifacts/screenshots/studio-step-1-*.png`

### Actions

- Bind form defaults and changes to the production project model.
- Preserve production validation, autosave/manual save, dirty state, and error handling.
- Connect logo replacement to the existing upload/storage and brand-color pipeline.
- Preserve optional contact-data behavior and privacy handling.
- Implement exact seven language labels; selecting Arabic applies the production locale/direction model.
- On Continue: validate/save first, then start the real hero-image job, then enter Step 2.
- Do not start hero generation during field editing or initial Step 1 rendering.

### Exit gate

- Refresh resumes Step 1 with persisted values.
- Validation and upload errors are recoverable.
- Continue starts exactly one current hero job and navigates once.
- Arabic structural RTL capture passes.

## Phase 6 — Step 2 Choose layout with real hero generation

### Reference files

- `LayoutChooserWorkspace.tsx`
- `src/data/layoutOptions.ts`
- `artifacts/screenshots/studio-step-2-choose-layout.png`
- `artifacts/screenshots/studio-step-2-hero-ready.png`
- `artifacts/screenshots/studio-step-2-mobile.png`

### Actions

- Map approved layout choices to existing production layout/gallery identifiers. Do not invent identifiers.
- Use the existing PressPilot background asset while the real hero job runs.
- Bind status text and progress to production job events/polling/SSE/websocket state.
- Keep all layout controls and Continue enabled unless production validation genuinely blocks them.
- Persist layout changes without restarting the hero job unnecessarily.
- Replace the background in place when the correct current job returns the hero asset.
- Ignore/cancel stale results after brief changes or a new job.
- Restore generating/ready/error state on refresh and direct project resume.

### Exit gate

- Production job progress is real—no timer or fake percentage.
- Placeholder-to-result replacement works without state loss.
- Layout changes survive refresh.
- Error and retry states are tested.

## Phase 7 — Step 3 Customize with current gallery/website preview

### Reference files

- `CustomizationPanel.tsx`
- `WebsitePreview.tsx`
- `StudioActionBar.tsx`
- `artifacts/screenshots/studio-step-3-customize.png`
- `artifacts/screenshots/studio-step-3-hero-generating.png`
- `artifacts/screenshots/studio-refine-*.png`

### Actions

- Mount/adapt the real production preview renderer inside the approved preview toolbar/stage/metadata shell.
- Bind typography, palette, headline, and layout action to real production customization state.
- Preserve current gallery preview content, responsive viewport behavior, and real customer data.
- Debounce/persist changes using existing production conventions.
- While hero generation runs, display the PressPilot background/progress inside the preview and keep customization active.
- Update only the hero region when the image arrives.
- Preserve production preview errors/reconnect/retry behavior.

### Exit gate

- No static prototype website replaces the real preview.
- Every customization persists and is reflected by the production renderer.
- Generating and ready hero states both pass.
- Desktop/laptop/tablet/mobile/RTL/reduced-motion captures pass.

## Phase 8 — Step 4 Review and real website creation

### Reference files

- `ReviewWorkspace.tsx`
- `ReviewSummary.tsx`
- `BuildLedger.tsx`
- `src/hooks/useBuildSequence.ts` (visual sequencing reference only)
- `artifacts/screenshots/studio-step-4-review.png`
- `artifacts/screenshots/studio-step-4-creating.png`

### Actions

- Render the locked reviewed project version through the production preview.
- Bind Edit/Back actions without losing persisted choices.
- Start the real website-generation request once with idempotency protection.
- Drive ledger/status/progress from real production job events, never `useBuildSequence` timing.
- Restore processing after refresh.
- Represent recoverable failure, retry, support, and cancellation states honestly.
- Keep visible progress on Step 4 throughout processing.

### Exit gate

- Duplicate clicks cannot create duplicate jobs/charges.
- Processing survives refresh/session resume.
- Errors do not activate Step 5.
- Only real artifact readiness transitions to Step 5.

## Phase 9 — Step 5 Download & install

### Reference files

- `DownloadWorkspace.tsx`
- `DownloadPackageCard.tsx`
- `InstallGuide.tsx`
- `artifacts/screenshots/studio-step-5-download.png`

### Actions

- Fetch and display the real artifact metadata.
- Use the existing protected/signed download endpoint and authorization rules.
- Preserve expired-link refresh, missing artifact, access denied, and retry behavior.
- Port expandable installation guidance; technical use of “theme” is allowed where WordPress installation requires it.
- Provide honest Back/another-design behavior without discarding the downloadable project.
- Move focus to the ready heading when the state first becomes ready.

### Exit gate

- Authorized download works and unauthorized access fails.
- Expired-link recovery passes.
- Step 5 is visibly current and Steps 1–4 are complete.
- Keyboard and screen-reader flow pass.

## Phase 10 — system hardening

- Verify every route at 1440px, laptop, tablet, and 390px.
- Verify Arabic document/app direction, form flow, column order, icons, and preview content.
- Verify 44px interactive targets, focus order, skip links, headings, labels, status announcements, and contrast.
- Verify reduced motion removes nonessential transitions without hiding state.
- Verify loading, empty, error, retry, expired, duplicate, and permission-denied states.
- Run the complete journey with slow network and refresh at every Studio step.
- Run copy/terminology search for banned public terms.
- Compare against every screenshot in the manifest.

## Phase 11 — controlled release

- Deploy behind the reversible boundary.
- Run production smoke tests with test accounts/projects/payments.
- Monitor the metrics in `07-RELEASE-ROLLBACK-PLAN.md`.
- Collect explicit visual/product approval.
- Expand rollout gradually.
- Remove legacy UI only in a later clean-up change after stable verification and approval.
