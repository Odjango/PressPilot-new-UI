# PressPilot Complete UI Handoff Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete every major PressPilot public, account, project, and five-step Studio page as a responsive, accessible, implementation-ready prototype with stable visual-review URLs.

**Architecture:** Keep the existing dependency-light React/Vite application and add a small pathname/query-string route resolver rather than a router package. Share the approved public and application shells, store the demonstration Studio project in the Studio component, and expose each Studio state through `?step=` deep links. Preserve the existing Step 3–5 components and extend the same types, tokens, and interaction patterns to Steps 1–2 and the remaining pages.

**Tech Stack:** React 19, TypeScript, Vite, Lucide React, CSS, Vitest/Testing Library, Playwright

---

### Task 1: Route atlas and Studio flow model

**Files:**
- Create: `src/routing.ts`
- Create: `src/routing.test.ts`
- Modify: `src/types/studio.ts`
- Modify: `src/data/studioFlow.ts`
- Modify: `src/data/studioFlow.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Step 1: Write failing route tests**

Test pathname resolution for `/`, `/pricing`, `/signin`, `/projects`, and `/studio`. Test valid Studio query values `details`, `layout`, `customize`, `review`, `building`, and `download`, plus fallback to `customize`.

**Step 2: Verify failure**

Run: `npm test -- src/routing.test.ts src/data/studioFlow.test.ts src/App.test.tsx`  
Expected: FAIL because the route resolver and new Studio flow states do not exist.

**Step 3: Implement minimal route/state resolution**

Add a typed route resolver, extend `StudioFlowState`, map every Studio state to the correct progress index, and render explicit page components from `App.tsx`. Preserve `/studio` as the Step 3 default.

**Step 4: Verify focused tests**

Run: `npm test -- src/routing.test.ts src/data/studioFlow.test.ts src/App.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/routing.ts src/routing.test.ts src/types/studio.ts src/data/studioFlow.ts src/data/studioFlow.test.ts src/App.tsx src/App.test.tsx
git commit -m "feat: add complete PressPilot route atlas"
```

### Task 2: Shared shell navigation and public pages

**Files:**
- Create: `src/components/PricingPage.tsx`
- Create: `src/components/SignInPage.tsx`
- Create: `src/components/ProjectsPage.tsx`
- Create: `src/components/PublicPages.test.tsx`
- Create: `src/data/projectDashboard.ts`
- Modify: `src/components/marketing/MarketingHeader.tsx`
- Modify: `src/components/marketing/MarketingFooter.tsx`
- Modify: `src/styles/marketing.css`
- Create: `src/styles/pages.css`
- Modify: `src/main.tsx`

**Step 1: Write failing public-page tests**

Assert the pricing page’s one-time `$29.99` offer and inclusions, the sign-in form’s accessible labels and recovery action, and the projects dashboard’s primary action plus contextual project actions.

**Step 2: Verify failure**

Run: `npm test -- src/components/PublicPages.test.tsx`  
Expected: FAIL because the page components do not exist.

**Step 3: Implement the pages and navigation**

Build the pages from shared brand atoms. Change header links to `/pricing`, `/signin`, `/projects`, and the correct homepage anchors. Add responsive page styles using existing tokens and logical properties.

**Step 4: Verify focused tests and build**

Run: `npm test -- src/components/PublicPages.test.tsx && npm run build`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/PricingPage.tsx src/components/SignInPage.tsx src/components/ProjectsPage.tsx src/components/PublicPages.test.tsx src/data/projectDashboard.ts src/components/marketing/MarketingHeader.tsx src/components/marketing/MarketingFooter.tsx src/styles/marketing.css src/styles/pages.css src/main.tsx
git commit -m "feat: add pricing account and projects pages"
```

### Task 3: Studio Step 1 — Business details

**Files:**
- Create: `src/components/BusinessDetailsWorkspace.tsx`
- Create: `src/components/BusinessDetailsWorkspace.test.tsx`
- Modify: `src/types/studio.ts`
- Modify: `src/data/sampleProjects.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles/studio.css`

**Step 1: Write failing Step 1 tests**

Assert accessible business-name, description, logo, and language controls; seven exact supported language labels; optional contact disclosure; sample project updates; and Continue navigation.

**Step 2: Verify failure**

Run: `npm test -- src/components/BusinessDetailsWorkspace.test.tsx`  
Expected: FAIL because the workspace does not exist.

**Step 3: Implement Step 1**

Create a focused business-details card with a summary rail, logo dropzone state, language selector, and expandable optional contact fields. Use “BR-Portuguese” exactly and describe Arabic RTL support.

**Step 4: Verify focused tests**

Run: `npm test -- src/components/BusinessDetailsWorkspace.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/BusinessDetailsWorkspace.tsx src/components/BusinessDetailsWorkspace.test.tsx src/types/studio.ts src/data/sampleProjects.ts src/App.tsx src/styles/studio.css
git commit -m "feat: design Studio business details step"
```

### Task 4: Studio Step 2 — Choose layout

**Files:**
- Create: `src/components/LayoutChooserWorkspace.tsx`
- Create: `src/components/LayoutChooserWorkspace.test.tsx`
- Create: `src/data/layoutOptions.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles/studio.css`

**Step 1: Write failing Step 2 tests**

Assert four named layout directions, radio semantics, selected-state text, Back/Continue actions, and sample project layout changes.

**Step 2: Verify failure**

Run: `npm test -- src/components/LayoutChooserWorkspace.test.tsx`  
Expected: FAIL because the chooser does not exist.

**Step 3: Implement Step 2**

Build four compositionally distinct miniature homepage previews: Split Hero, Full-Bleed Hero, Editorial Band, and Minimal Focus. Pair each with plain-language guidance and a single selected state.

**Step 4: Verify focused tests**

Run: `npm test -- src/components/LayoutChooserWorkspace.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/components/LayoutChooserWorkspace.tsx src/components/LayoutChooserWorkspace.test.tsx src/data/layoutOptions.ts src/App.tsx src/styles/studio.css
git commit -m "feat: design Studio layout selection step"
```

### Task 5: Complete Studio navigation contracts

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/CustomizationPanel.tsx`
- Modify: `src/components/StudioActionBar.tsx`
- Modify: `src/components/ProjectHeader.tsx`
- Modify: `src/components/ReviewWorkspace.tsx`
- Modify: `src/components/DownloadWorkspace.tsx`
- Create: `src/StudioFlow.test.tsx`

**Step 1: Write failing journey tests**

Test Details → Layout → Customize → Review → Building → Download navigation, URL updates, Back actions, and links to `/projects`.

**Step 2: Verify failure**

Run: `npm test -- src/StudioFlow.test.tsx`  
Expected: FAIL because the full journey is not wired.

**Step 3: Wire the journey**

Use `history.pushState` plus a local state update helper to keep stable prototype URLs. Preserve the project object between steps and keep building mapped to Step 4.

**Step 4: Verify focused tests**

Run: `npm test -- src/StudioFlow.test.tsx`  
Expected: PASS.

**Step 5: Commit**

```bash
git add src/App.tsx src/components/CustomizationPanel.tsx src/components/StudioActionBar.tsx src/components/ProjectHeader.tsx src/components/ReviewWorkspace.tsx src/components/DownloadWorkspace.tsx src/StudioFlow.test.tsx
git commit -m "feat: connect the complete five-step Studio journey"
```

### Task 6: Responsive, RTL, accessibility, and visual captures

**Files:**
- Create: `tests/complete-pages.spec.ts`
- Create: `tests/complete-pages-visual.spec.ts`
- Modify: `tests/studio-refine.spec.ts`
- Modify: `tests/studio-refine-visual.spec.ts`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/studio.css`

**Step 1: Write failing Playwright coverage**

Test every direct route, no horizontal overflow at desktop/tablet/mobile, mobile Studio progress, 44px key targets, keyboard skip links, RTL layout, reduced motion, and absence of `.ambient__star`.

**Step 2: Verify failure**

Run: `npm run test:e2e -- tests/complete-pages.spec.ts`  
Expected: FAIL until final responsive and routing details are complete.

**Step 3: Apply responsive and accessibility fixes**

Use logical properties, mobile stacking, semantic status/selection copy, visible focus, and overflow containment. Do not reintroduce the green X/star.

**Step 4: Capture the final atlas**

Run: `npm run test:e2e -- tests/complete-pages-visual.spec.ts tests/studio-refine-visual.spec.ts`  
Expected: PASS and screenshots written to `artifacts/screenshots/`.

**Step 5: Commit**

```bash
git add tests/complete-pages.spec.ts tests/complete-pages-visual.spec.ts tests/studio-refine.spec.ts tests/studio-refine-visual.spec.ts src/styles/pages.css src/styles/studio.css artifacts/screenshots
git commit -m "test: verify and capture complete PressPilot UI atlas"
```

### Task 7: Coding-agent handoff and final gate

**Files:**
- Create: `docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`
- Modify: `README.md`

**Step 1: Write the handoff**

Document product terminology, route atlas, component map, design tokens, interaction/state contracts, responsive/RTL behavior, screenshot index, integration seams, migration order, non-goals, and commands.

**Step 2: Run the complete gate**

Run: `npm run check`  
Expected: unit tests, TypeScript/Vite build, and all Playwright tests PASS.

**Step 3: Inspect repository state**

Run: `git status --short --branch`  
Expected: only intentional handoff/README changes before commit.

**Step 4: Commit**

```bash
git add docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md README.md
git commit -m "docs: add complete UI coding-agent handoff"
```

**Step 5: Push**

Run: `git push origin agent/studio-refine-prototype`  
Expected: remote branch advances to the final handoff commit.

