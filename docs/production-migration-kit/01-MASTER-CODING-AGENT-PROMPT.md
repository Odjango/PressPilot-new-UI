# PressPilot production App UI redesign — coding-agent master prompt

Copy everything below into the task for the AI coding agent working inside the production PressPilot App repository.

---

## Role

You are the implementation owner for migrating the approved PressPilot redesign from the standalone UI prototype into the production PressPilot App repository.

Work autonomously and keep making progress. Do not pause for ordinary implementation choices that can be resolved from the production code, this migration kit, tests, or screenshots. Ask the user only when a genuinely product-changing choice or destructive/external action cannot be resolved safely.

## Approved design source

- Repository: `https://github.com/Odjango/PressPilot-new-UI`
- Branch: `agent/studio-refine-prototype`
- Start guide: `docs/production-migration-kit/00-START-HERE.md`
- Detailed handoff: `docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`
- Machine-readable manifest: `docs/production-migration-kit/migration-manifest.json`
- Visual atlas: `artifacts/screenshots/`

Treat the prototype’s components, styles, copy, states, tests, and screenshots as the approved UI source of truth.

## Objective

Replace the production App’s current visual UI with the approved redesign for all agreed pages and Studio states while preserving the production App’s real authentication, projects, persistence, uploads, payments, credit logic, hero-image generation, gallery/website preview, full-site generation, downloads, authorization, analytics, and error handling.

The result must look like the prototype and behave like production.

## Hard boundaries

### Preserve these production systems

- Authentication, sessions, password recovery, account menu, and authorization
- Project creation, IDs, ownership, persistence, status, and resumption
- Logo upload/storage and logo-derived color analysis
- Current hero-image generation request, job state, progress events, result storage, errors, and retry
- Current PressPilot background image shown while hero generation runs
- Current gallery/website preview renderer and its approved real content
- Layout/gallery identifiers already understood by the backend
- Typography, palette, headline, locale, and direction persistence
- Checkout, payment provider, credits, entitlements, receipts, refunds, and webhooks
- Full website-generation request, real job status, errors, retry, and cancellation behavior
- Real downloadable ZIP/signed artifact endpoint
- Existing security, validation, observability, rate limits, CSRF, and data-protection behavior

### Never copy these prototype mechanics into production

- The lightweight pathname/query router in `src/routing.ts`
- Prototype-only local project state in `src/App.tsx`
- The simulated hero progress timer in `src/App.tsx`
- Sample projects and placeholder business data
- Simulated Step 4 build timing
- Simulated waitlist success without persistence
- Placeholder download behavior
- Prototype-only deep-link query flags such as `hero=ready` or `hero=generating`

Copy/adapt the visual components and CSS. Integrate them with real production state and services.

## Required first actions in the production repository

Before changing UI code:

1. Read the production repository instructions and identify its framework, routing, state, styling, test, build, and deployment conventions.
2. Create or switch to an isolated feature branch/worktree for this migration.
3. Confirm the worktree is clean or document unrelated user changes and avoid overwriting them.
4. Run the existing production test/build commands and record the baseline.
5. Capture the current production routes/states for comparison.
6. Build a production contract inventory that maps:
   - current routes
   - current page components/templates
   - authentication entry points
   - project model/state
   - logo pipeline
   - hero-generation trigger/progress/result/error APIs
   - gallery preview renderer
   - customization persistence
   - website-generation job
   - checkout/credits
   - waitlist/email capture destination
   - ZIP artifact/download
7. Map those production files and contracts to `03-SOURCE-AND-VISUAL-MANIFEST.md` and `04-PRODUCTION-INTEGRATION-CONTRACTS.md`.
8. Add or update tests before replacing each page/state.

Do not begin with a wholesale copy of the prototype `src/` directory.

## Approved route and page scope

Implement the redesign for the production equivalents of:

| Approved surface | Prototype reference |
| --- | --- |
| Public homepage | `src/components/MarketingHome.tsx` |
| Pricing | `src/components/PricingPage.tsx` |
| Sign in | `src/components/SignInPage.tsx` |
| Projects dashboard | `src/components/ProjectsPage.tsx` |
| Studio shared header/project identity/progress | `StudioHeader`, `ProjectHeader`, `StepProgress` |
| Step 1 Business details | `BusinessDetailsWorkspace` |
| Step 2 Choose layout + hero progress | `LayoutChooserWorkspace` |
| Step 3 Customize + real preview | `CustomizationPanel`, `WebsitePreview` |
| Step 4 Review | `ReviewWorkspace`, `ReviewSummary` |
| Step 4 Creating website | `ReviewWorkspace`, `BuildLedger` |
| Step 5 Download/install | `DownloadWorkspace`, `DownloadPackageCard`, `InstallGuide` |

Preserve the production App’s route conventions if they differ. Preserve the approved state meaning and screen hierarchy.

## Mandatory Studio state contract

The visible journey has five steps:

1. Business details
2. Choose layout
3. Customize
4. Review
5. Download & install

The internal production journey may have additional service states, but do not add a sixth visible step.

`building`/website creation is a processing state inside Step 4. Step 5 becomes active only after the website artifact is ready.

### Hero-image generation contract

- Step 1 must not start hero-image generation.
- Continuing from Step 1 must save/validate the brief, start the existing production hero-image job, and enter Step 2.
- Step 2 must immediately show the existing PressPilot background image and existing real progress bar/job status.
- Users must be able to choose layout and continue customizing while generation runs.
- If users reach Step 3 before completion, keep the PressPilot background/progress visible inside the website preview. Never display a false finished hero.
- When the job succeeds, replace the background with the returned hero image in place without resetting layout, typography, palette, headline, scroll position, or project state.
- Preserve production error, retry, refresh/resume, cancellation, stale-job, and authorization handling.

### Gallery/website preview contract

The prototype’s preview composition defines the approved shell and layout. The production gallery/website preview system remains the rendering source. Mount or adapt it inside the new `WebsitePreview` surface. Do not replace real gallery logic with prototype miniatures or static sample content.

### Full website-generation contract

- `Create website` on Step 4 uses the existing production generation request.
- Real job events drive the Build ledger/status UI.
- Refreshing the page restores the correct active processing state.
- Errors expose a useful message and retry or support path.
- Only a real ready artifact moves the project to Step 5.
- Download uses the existing protected/signed artifact endpoint.

## Pricing contract

Show four packs:

- Single Site — `$29.99` one-time — 1 credit — only live purchase
- Freelancer — `$74.99` one-time — 3 credits — Coming soon + `Notify me`
- Agency — `$199.99` one-time — 10 credits — Most popular + Coming soon + `Notify me`
- Studio — `$449.99` one-time — 25 credits — Coming soon + `Notify me`

Rules:

- One credit creates one complete WordPress website.
- Credits never expire.
- No subscription or automatic renewal.
- `Get 1 credit` connects to the existing production checkout/entitlement flow.
- Keep `Secure checkout · Refund policy` under the live action.
- Coming soon packs must never start checkout or grant credits.
- `Notify me` expands an inline, tier-specific email capture.
- Persist email, requested pack, source page, and consent timestamp through the production waitlist/email system.
- Handle invalid email, duplicate signup, loading, success, failure, and retry without losing the entered email.
- Do not log raw emails to client/server logs or analytics payloads.

## Product terminology and locked copy rules

In public/product UI say:

- website
- WordPress website
- complete WordPress website
- install-ready WordPress website
- website preview
- website design/style/layout
- website ZIP
- install on WordPress

Do not say publicly:

- theme generator
- generated theme
- template generator
- single theme
- output

`theme` may appear only where WordPress technical internals require it, such as `theme.json`, internal APIs, package metadata, or install documentation.

Supported language labels must be exactly:

1. English
2. French
3. Spanish
4. German
5. BR-Portuguese
6. Italian
7. Arabic

Never write `Portuguese-BR`. Arabic is a first-class RTL website language.

Use `Start in Studio` only for public entry CTAs. Use the approved contextual internal actions: `Continue to layouts`, `Continue to customize`, `Review website`, `Create website`, and `Download website`.

## Visual implementation rules

- Reuse the approved token values from `src/styles/tokens.css`.
- Use Host Grotesk with a production-appropriate loading strategy; self-host or use the App’s approved font pipeline if remote Google Fonts are disallowed.
- Preserve deep navy canvases, emerald primary actions/selections, low-contrast borders, restrained shadows, and dense Studio layouts.
- Keep marketing layouts generous and product layouts compact.
- Preserve moderate radii, strong display hierarchy, and 44px minimum interactive targets.
- The removed green X/star decoration must never return.
- Treat screenshots as parity references, not raster assets to embed in the application.
- Reuse approved SVG sample assets only where they are genuine design assets; production customer imagery must come from production data.

## Responsive, RTL, and accessibility requirements

- No route may create document-level horizontal scrolling at 390px.
- Complex Studio columns stack at tablet/mobile breakpoints.
- Mobile uses the compact `Step N of 5` progress treatment.
- Apply `dir="rtl"` and `lang="ar"` at the correct document/app boundary for Arabic.
- Use CSS logical properties and mirror directional icons.
- RTL must reverse structural order where appropriate, not merely align text right.
- Preserve skip links, landmarks, heading order, semantic forms/fieldsets/labels, native disabled semantics, status announcements, and visible keyboard focus.
- Selected/completed/current/error states need semantic text or icons in addition to color.
- Preserve polite live regions for hero progress, preview updates, website generation, and waitlist results.
- Respect `prefers-reduced-motion`; no essential information may depend on animation.
- Do not autoplay audio.

## Implementation sequence

Follow `02-PRODUCTION-MIGRATION-PLAN.md` in order:

1. Baseline and contract map
2. Tokens, fonts, primitives, and reversible feature boundary
3. Shared public and App shells
4. Public homepage, Pricing, Sign in, Projects
5. Studio foundation and Step 1
6. Step 2 with real hero generation
7. Step 3 with current gallery preview
8. Step 4 review and real creation status
9. Step 5 real delivery
10. Responsive/RTL/accessibility hardening
11. Production journey, monitoring, rollout, and old-UI retirement

Use small commits. After each phase, run relevant tests and compare screenshots before moving on.

## Test-first and verification requirements

Before implementing each route/state:

1. Write or update a failing production test that describes the expected behavior.
2. Confirm it fails for the intended missing UI behavior.
3. Implement the smallest production-safe change.
4. Run focused tests, then the production build/type/lint gates.
5. Capture visual evidence at the approved viewports.

Before claiming completion:

- Run the complete production unit/integration suite.
- Run the production build/type/lint commands.
- Run end-to-end tests for public entry, sign in, project resume, the full five-step journey, hero generation, generation failure/retry, checkout, waitlist, and download authorization.
- Run responsive checks at 390px, tablet, laptop, and desktop widths.
- Run Arabic RTL checks.
- Run keyboard/focus and reduced-motion checks.
- Compare every route/state against the matching screenshot in `artifacts/screenshots/`.
- Confirm no unrelated production changes and no prototype mock/timer code remain.

## Release safety

- Prefer an authenticated feature flag, route switch, or deployment boundary that makes rollback immediate.
- Do not delete the old UI until the new UI is production-verified and explicitly approved.
- Preserve database/API backward compatibility during rollout.
- Monitor client errors, API/job failures, checkout conversion, waitlist failures, hero latency/failure, website-generation failure, and download authorization errors.
- Follow `07-RELEASE-ROLLBACK-PLAN.md`.

## Required final report

Return a concise but evidence-backed report containing:

1. Production files changed, grouped by page/state
2. Exact production contracts preserved and integration adapters added
3. Routes/states completed
4. Tests/build commands and pass counts
5. Visual reference comparisons completed
6. Responsive, RTL, keyboard, and reduced-motion evidence
7. Any deliberate differences from the prototype and why
8. Feature-flag/rollback instructions
9. Remaining production risks or follow-ups
10. Commit/PR identifiers

Do not report the migration complete while any required route, real integration, test, or acceptance gate remains unfinished.

---

End of copy-paste prompt.
