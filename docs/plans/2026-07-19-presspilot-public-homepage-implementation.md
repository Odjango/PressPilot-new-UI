# PressPilot Public Homepage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and verify the complete public PressPilot homepage in the standalone new-UI repository while preserving the approved Studio prototype at `/studio`.

**Architecture:** Add a minimal pathname switch at the application entry so `/` renders a new componentized marketing homepage and `/studio` renders the existing Studio flow. Use local typed data and local preview artwork only; share the existing brand tokens, ambient background, and accessibility conventions without connecting production services.

**Tech Stack:** React 19, TypeScript, Vite, CSS, Lucide React, Vitest, Testing Library, Playwright

---

### Task 1: Add public-homepage routing

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/MarketingHome.tsx`
- Modify: `src/App.test.tsx`
- Modify: `tests/studio-refine.spec.ts`
- Modify: `tests/studio-refine-visual.spec.ts`

**Step 1: Write the failing route tests**

Add tests asserting that `/` renders the locked public homepage heading and `/studio` renders “Customize the website.” Reset `window.history` between tests.

**Step 2: Run the test to verify it fails**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because the root path still renders Studio and `MarketingHome` does not exist.

**Step 3: Implement the minimal pathname switch**

Extract the existing Studio tree into a `StudioPrototype` function within `App.tsx`, import `MarketingHome`, and return it when `window.location.pathname !== "/studio"`.

Create an initial semantic `MarketingHome` with the exact hero heading and a `/studio` primary link.

Update existing Playwright Studio navigation from `/` to `/studio` and RTL navigation to `/studio?dir=rtl`.

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/App.test.tsx`

Expected: public route and Studio route tests pass.

**Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/components/MarketingHome.tsx tests/studio-refine.spec.ts tests/studio-refine-visual.spec.ts
git commit -m "feat: add standalone public homepage route"
```

### Task 2: Build the complete homepage component structure

**Files:**
- Create: `src/components/marketing/MarketingHeader.tsx`
- Create: `src/components/marketing/HomeHero.tsx`
- Create: `src/components/marketing/TransformationPreview.tsx`
- Create: `src/components/marketing/ProductDemoSection.tsx`
- Create: `src/components/marketing/WebsiteExamples.tsx`
- Create: `src/components/marketing/HowItWorks.tsx`
- Create: `src/components/marketing/IncludedFeatures.tsx`
- Create: `src/components/marketing/PricingSection.tsx`
- Create: `src/components/marketing/MarketingFooter.tsx`
- Create: `src/data/marketingHome.ts`
- Modify: `src/components/MarketingHome.tsx`
- Create: `src/components/MarketingHome.test.tsx`

**Step 1: Write the failing content and landmark test**

Test for:

- banner and navigation labels
- exact locked hero statement
- “Ready in minutes · $29.99 once · No subscription”
- product demo, examples, process, capabilities, pricing, and final CTA headings
- no public-facing “theme generator” terminology

**Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/MarketingHome.test.tsx`

Expected: FAIL because the complete section structure is absent.

**Step 3: Add typed content data**

Create local arrays for four complete website examples, four process stages, and six included capabilities. Keep all copy specific and use “website” terminology.

**Step 4: Implement section components**

Build semantic sections with stable IDs:

- `#top`
- `#product-demo`
- `#examples`
- `#how-it-works`
- `#included`
- `#pricing`

Use real links for same-page navigation and `/studio` for primary actions.

**Step 5: Run tests to verify they pass**

Run: `npm test -- src/components/MarketingHome.test.tsx`

Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/MarketingHome.tsx src/components/MarketingHome.test.tsx src/components/marketing src/data/marketingHome.ts
git commit -m "feat: build complete PressPilot homepage structure"
```

### Task 3: Apply the product-transformation visual system

**Files:**
- Create: `src/styles/marketing.css`
- Modify: `src/components/MarketingHome.tsx`
- Modify: `src/components/marketing/*.tsx`
- Create: `public/samples/homepage/restaurant-preview.svg`
- Create: `public/samples/homepage/consulting-preview.svg`
- Create: `public/samples/homepage/wellness-preview.svg`
- Create: `public/samples/homepage/shop-preview.svg`

**Step 1: Add a visual contract assertion**

Extend `MarketingHome.test.tsx` to verify the transformation preview has an accessible name, all four example images have descriptive alt text, and the pricing action reads “Start in Studio.”

**Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/MarketingHome.test.tsx`

Expected: FAIL until the transformation and gallery visuals exist.

**Step 3: Implement the signature hero**

Create a two-part transformation surface:

- compact business brief with name, logo, and Arabic language metadata
- finished website viewport with a quiet progress rail connecting the two

Do not add the removed ambient X/star decoration.

**Step 4: Implement the remaining visual hierarchy**

Use the existing semantic tokens, restrained emerald/cyan accents, Host Grotesk, local website previews, and product UI surfaces. Keep decorative planes behind content and prevent large glows behind copy.

**Step 5: Run unit tests**

Run: `npm test -- src/components/MarketingHome.test.tsx`

Expected: PASS.

**Step 6: Commit**

```bash
git add src/styles/marketing.css src/components/MarketingHome.tsx src/components/marketing public/samples/homepage src/components/MarketingHome.test.tsx
git commit -m "feat: apply PressPilot homepage visual system"
```

### Task 4: Add responsive, accessibility, and visual coverage

**Files:**
- Create: `tests/marketing-home.spec.ts`
- Create: `tests/marketing-home-visual.spec.ts`
- Modify: `playwright.config.ts` only if required
- Modify: `src/styles/marketing.css` only to correct failing checks
- Create: `artifacts/screenshots/presspilot-home-desktop.png`
- Create: `artifacts/screenshots/presspilot-home-tablet.png`
- Create: `artifacts/screenshots/presspilot-home-mobile.png`

**Step 1: Write failing browser assertions**

Check desktop, tablet, and mobile for:

- exact hero heading
- no document-level horizontal overflow
- reachable primary CTA with at least a 44px height
- mobile hero stacking
- keyboard skip-link focus
- reduced-motion animation removal
- absence of `.ambient__star`

**Step 2: Run the browser test to verify it fails where behavior is missing**

Run: `npm run test:e2e -- tests/marketing-home.spec.ts`

Expected: FAIL until responsive/accessibility behavior is complete.

**Step 3: Implement minimal responsive and accessibility corrections**

Add desktop, tablet, and mobile layout rules, semantic skip target, visible focus, and reduced-motion fallback.

**Step 4: Run browser assertions**

Run: `npm run test:e2e -- tests/marketing-home.spec.ts`

Expected: PASS.

**Step 5: Generate screenshots**

Run: `npm run test:e2e -- tests/marketing-home-visual.spec.ts`

Expected: three full-page screenshots are produced.

**Step 6: Inspect every screenshot**

Verify hierarchy, content density, contrast, navigation, example-card completeness, pricing prominence, responsive stacking, and lack of clipping.

**Step 7: Commit**

```bash
git add tests/marketing-home.spec.ts tests/marketing-home-visual.spec.ts src/styles/marketing.css artifacts/screenshots/presspilot-home-*.png
git commit -m "test: add PressPilot homepage visual coverage"
```

### Task 5: Run the final standalone homepage gate

**Files:**
- Modify only files required to correct verification failures.

**Step 1: Run the complete check**

Run: `npm run check`

Expected: all unit tests, production build, Studio browser tests, homepage browser tests, and screenshot tests pass.

**Step 2: Audit terminology**

Run:

```bash
rg -n "theme generator|Build My Site|Get Studio|Generate Final Theme|Download Theme" src
```

Expected: no public-facing outdated terminology.

**Step 3: Confirm scope**

Run: `git status --short`

Expected: only standalone homepage implementation and generated visual artifacts are changed.

**Step 4: Commit checkpoint**

```bash
git add -A
git commit -m "feat: complete PressPilot public homepage prototype"
```

**Step 5: Push and report**

Push `agent/studio-refine-prototype`. Report the visual path, component set, fresh verification results, and deferred production/gallery integrations.
