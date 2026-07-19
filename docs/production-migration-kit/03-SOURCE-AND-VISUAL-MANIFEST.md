# Source and visual manifest

## How to use the prototype files

### Copy or closely adapt

These files primarily contain approved presentation and semantic structure:

- `src/styles/tokens.css`
- `src/styles/global.css` — selectively; preserve production reset/layout conventions
- `src/styles/marketing.css`
- `src/styles/pages.css`
- `src/styles/studio.css`
- `src/components/AmbientBackground.tsx`
- `src/components/PublicPageShell.tsx`
- `src/components/marketing/*`
- `src/components/MarketingHome.tsx`
- `src/components/PricingPage.tsx`
- `src/components/SignInPage.tsx`
- `src/components/ProjectsPage.tsx`
- `src/components/StudioHeader.tsx`
- `src/components/ProjectHeader.tsx`
- `src/components/StepProgress.tsx`
- All Studio workspace/presentation components

Adapt them to the production component framework, router, state management, form library, and CSS architecture.

### Integrate, do not copy behavior blindly

- `BusinessDetailsWorkspace.tsx` — connect real project validation/save and logo upload.
- `LayoutChooserWorkspace.tsx` — connect real layouts and hero job status.
- `CustomizationPanel.tsx` — connect real persisted settings.
- `WebsitePreview.tsx` — keep shell, replace sample composition with current production gallery/preview renderer.
- `ReviewWorkspace.tsx` — connect real reviewed version and generation job.
- `BuildLedger.tsx` — connect real job events.
- `DownloadWorkspace.tsx` / `DownloadPackageCard.tsx` — connect real artifact endpoint.
- `PricingPage.tsx` — connect checkout and waitlist endpoint.
- `SignInPage.tsx` — connect production auth.
- `ProjectsPage.tsx` — connect real project query/actions.

### Reference only—never port as production infrastructure

- `src/App.tsx` local project/flow state and simulated hero timer
- `src/routing.ts` lightweight prototype route resolver
- `src/data/sampleProjects.ts`
- `src/data/projectDashboard.ts` sample dashboard records
- `src/hooks/useBuildSequence.ts` timed build simulation
- Prototype query flags `hero=ready`, `hero=generating`, and `dir=rtl`
- Placeholder checkout, waitlist, ZIP, sign-in, and project actions

## Route/state ownership atlas

| Surface/state | Primary source | Supporting source/data | Styles | Tests | Screenshot reference |
| --- | --- | --- | --- | --- | --- |
| Public homepage | `MarketingHome.tsx`, `marketing/*` | `data/marketingHome.ts` | `marketing.css` | `MarketingHome.test.tsx`, `marketing-home*.spec.ts` | `presspilot-home-desktop/tablet/mobile.png` |
| Pricing default | `PricingPage.tsx` | pricing arrays in component | `pages.css` | `PublicPages.test.tsx`, `complete-pages*.spec.ts` | `app-pricing-desktop.png`, `app-pricing-mobile.png` |
| Pricing waitlist | `PricingPage.tsx` | local visual state only | `pages.css` | same as above | `app-pricing-waitlist.png` |
| Sign in | `SignInPage.tsx` | production auth required | `pages.css` | `PublicPages.test.tsx`, `complete-pages.spec.ts` | `app-signin-desktop.png` |
| Projects | `ProjectsPage.tsx` | `data/projectDashboard.ts` sample only | `pages.css` | `PublicPages.test.tsx`, `complete-pages.spec.ts` | `app-projects-desktop.png` |
| Shared Studio shell | `StudioHeader`, `ProjectHeader`, `StepProgress` | `data/studioFlow.ts` | `global.css`, `studio.css` | `StepProgress.test.tsx`, `StudioFlow.test.tsx` | all Studio captures |
| Step 1 | `BusinessDetailsWorkspace.tsx` | `types/studio.ts` | `studio.css` | `BusinessDetailsWorkspace.test.tsx` | `studio-step-1-business-details.png` |
| Step 1 mobile | same | same | same | browser overflow/targets | `studio-step-1-mobile.png` |
| Step 1 Arabic | same | sample Arabic state | logical/RTL rules | RTL browser tests | `studio-step-1-arabic-rtl.png` |
| Step 2 generating | `LayoutChooserWorkspace.tsx` | `data/layoutOptions.ts` | `studio.css` | `LayoutChooserWorkspace.test.tsx` | `studio-step-2-choose-layout.png` |
| Step 2 ready | same | real hero result required | same | same | `studio-step-2-hero-ready.png` |
| Step 2 mobile | same | same | same | overflow/targets | `studio-step-2-mobile.png` |
| Step 3 ready | `CustomizationPanel`, `WebsitePreview`, `StudioActionBar` | real preview renderer required | `studio.css` | component + Studio browser tests | `studio-step-3-customize.png` |
| Step 3 generating | `WebsitePreview` generating branch | real hero job required | `studio.css` | `WebsitePreview.test.tsx` | `studio-step-3-hero-generating.png` |
| Step 3 responsive | same | same | same | `studio-refine*.spec.ts` | `studio-refine-desktop/laptop/tablet/mobile.png` |
| Step 3 RTL/reduced motion | same | Arabic project state | same | Studio quality tests | `studio-refine-rtl.png`, `studio-refine-reduced-motion.png` |
| Step 4 review | `ReviewWorkspace`, `ReviewSummary` | real reviewed version | `studio.css` | `ReviewWorkspace.test.tsx` | `studio-step-4-review.png` |
| Step 4 creating | `ReviewWorkspace`, `BuildLedger` | `useBuildSequence` reference only | `studio.css` | `BuildLedger.test.tsx`, flow tests | `studio-step-4-creating.png` |
| Step 5 | `DownloadWorkspace`, `DownloadPackageCard`, `InstallGuide` | real artifact required | `studio.css` | `DownloadWorkspace.test.tsx` | `studio-step-5-download.png` |

## Shared dependencies

- React 19 in prototype; adapt to the production React/framework version.
- `lucide-react` icons; reuse if already allowed or map to the production icon library while preserving meaning/stroke weight.
- Host Grotesk; use the production font pipeline.
- OKLCH colors; keep values if the production browser-support target allows them, otherwise provide tested fallbacks.

## Public assets

- `public/samples/amigo-store/hero-placeholder.svg`
- `public/samples/homepage/*-preview.svg`

These are original visual placeholders/examples. They are not production customer output and must not replace real generated/gallery imagery.

## Supporting documents already in the repository

- `docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`
- `PressPilot_UI_Copy_Action_Polish_Handoff_v1.md`
- `PressPilot_BG_Visual_System_Design_AI_Handoff_v1.docx`
- `docs/plans/` design reasoning and implementation histories

## CSS ownership

| File | Responsibility |
| --- | --- |
| `tokens.css` | Color, radius, motion tokens, font import |
| `global.css` | Reset, document shell, ambient background, shared App primitives, focus/RTL |
| `marketing.css` | Public header/footer and homepage |
| `pages.css` | Pricing, Sign in, Projects |
| `studio.css` | Studio Steps 1–5 and preview/review/delivery states |

Port visual parity first. Refactor or consolidate CSS only after route parity is demonstrated.
