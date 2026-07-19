# PressPilot Studio Refine Prototype Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a standalone, responsive, accessible high-fidelity prototype of PressPilot Studio Step 3 — Customize, preserving the current five-step UX while placing customization controls beside a real website preview.

**Architecture:** Use a small React/TypeScript application with local typed sample data and component-owned prototype state. Separate the Studio shell, customization controls, preview shell, ambient background, and responsive action bar so they can later be mapped onto the production app without importing production business logic. Use CSS custom properties and component-scoped class names rather than a UI framework.

**Tech Stack:** React 19.0.1, TypeScript 5.8.2, Vite 6.2.3, Lucide React, CSS custom properties, Vitest, React Testing Library, and Playwright.

---

## Execution constraints

- Work only in `/Users/soluwrx/Dev/New PressPilot App UI`.
- Do not modify the current PressPilot application or landing-page repositories.
- The landing-page repository may be read only for visual reference.
- Do not connect authentication, APIs, generation, payments, storage, gallery previews, project persistence, or ZIP packaging.
- Do not rename production identifiers because this is a standalone prototype.
- The workspace is not a Git repository. Do not run `git init` without explicit user approval. At each commit checkpoint, report the checkpoint instead of committing unless Git has since been initialized.
- Use the supplied Studio captures only as reference. Preview and hero assets must remain replaceable.

## Planned file map

```text
index.html
package.json
package-lock.json
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
vitest.config.ts
playwright.config.ts
src/
  main.tsx
  App.tsx
  App.test.tsx
  test/setup.ts
  data/sampleProjects.ts
  data/sampleProjects.test.ts
  types/studio.ts
  components/
    AmbientBackground.tsx
    StudioHeader.tsx
    ProjectHeader.tsx
    StepProgress.tsx
    StepProgress.test.tsx
    CustomizationPanel.tsx
    CustomizationPanel.test.tsx
    WebsitePreview.tsx
    WebsitePreview.test.tsx
    StudioActionBar.tsx
    RefineWorkspace.tsx
  styles/
    tokens.css
    global.css
    studio.css
public/
  brand/presspilot-logo-wide.svg
  brand/presspilot-logo-icon.svg
  samples/amigo-store/hero-placeholder.svg
tests/
  studio-refine.spec.ts
  studio-refine-visual.spec.ts
artifacts/screenshots/
```

### Task 1: Scaffold the standalone React prototype

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`

**Step 1: Create the package manifest**

Use scripts:

```json
{
  "scripts": {
    "dev": "vite --port=4173 --host=0.0.0.0",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "check": "npm run test && npm run build && npm run test:e2e"
  }
}
```

Use these runtime dependencies:

```json
{
  "lucide-react": "0.546.0",
  "react": "19.0.1",
  "react-dom": "19.0.1"
}
```

Use these development dependencies:

```json
{
  "@playwright/test": "1.61.1",
  "@testing-library/jest-dom": "6.6.3",
  "@testing-library/react": "16.3.0",
  "@testing-library/user-event": "14.6.1",
  "@types/react": "19.2.17",
  "@types/react-dom": "19.2.3",
  "@vitejs/plugin-react": "5.0.4",
  "jsdom": "26.1.0",
  "typescript": "5.8.2",
  "vite": "6.2.3",
  "vitest": "3.2.4"
}
```

**Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and installation exits successfully.

If dependency download fails because network access is restricted, request escalation rather than changing package versions or installing globally.

**Step 3: Write the failing application smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the approved Studio step", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /customize the website/i })).toBeInTheDocument();
  expect(screen.getByText(/step 3 of 5/i)).toBeInTheDocument();
});
```

**Step 4: Run the test to verify it fails**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because the approved UI does not exist yet.

**Step 5: Add the minimal application shell**

Create an `App` component with the approved heading and temporary `Step 3 of 5` text. Do not style the screen yet.

**Step 6: Run the test to verify it passes**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: PASS.

**Step 7: Checkpoint**

If Git is available, commit as `chore: scaffold Studio refine prototype`. Otherwise report the completed checkpoint.

### Task 2: Define the typed sample-project model

**Files:**

- Create: `src/types/studio.ts`
- Create: `src/data/sampleProjects.ts`
- Create: `src/data/sampleProjects.test.ts`

**Step 1: Write the failing sample-data test**

Test that the default sample:

- has a project name and coherent business description
- identifies Step 3 as current
- has five ordered steps
- provides a named hero layout, typography option, and palette
- provides four visible color swatches
- provides preview metadata
- supports `ltr` or `rtl`
- references a replaceable local hero asset

```ts
expect(defaultProject.name).toBe("Amigo Store");
expect(defaultProject.steps).toHaveLength(5);
expect(defaultProject.steps[2].label).toBe("Customize");
expect(defaultProject.palette.swatches).toHaveLength(4);
expect(defaultProject.direction).toBe("ltr");
```

**Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/data/sampleProjects.test.ts
```

Expected: FAIL because the data model is missing.

**Step 3: Implement the minimal typed model**

Define:

```ts
export type TextDirection = "ltr" | "rtl";

export interface StudioStep {
  id: "details" | "layout" | "customize" | "review" | "download";
  label: string;
  status: "complete" | "current" | "upcoming";
}

export interface PaletteOption {
  id: string;
  name: string;
  swatches: [string, string, string, string];
}

export interface StudioProjectSample {
  id: string;
  name: string;
  description: string;
  status: "draft";
  language: string;
  direction: TextDirection;
  steps: StudioStep[];
  layout: { id: string; name: string; description: string };
  typography: { id: string; name: string };
  palette: PaletteOption;
  headline: string;
  heroAsset: string;
}
```

Use a coherent sample description that matches the placeholder preview. Do not repeat the existing coffee-roaster/clothing-store mismatch.

**Step 4: Run the test to verify it passes**

Run:

```bash
npm test -- src/data/sampleProjects.test.ts
```

Expected: PASS.

**Step 5: Checkpoint**

If Git is available, commit as `feat: add typed Studio sample data`. Otherwise report the completed checkpoint.

### Task 3: Implement the semantic visual foundation

**Files:**

- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `src/main.tsx`
- Create: `src/components/AmbientBackground.tsx`

**Step 1: Add a failing structure assertion**

Extend `src/App.test.tsx` to expect an ambient background with `aria-hidden="true"` and a main landmark.

**Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because the background and landmark are missing.

**Step 3: Implement the token sheet**

Create CSS custom properties for:

```css
:root {
  --canvas-deep: oklch(0.085 0.018 255);
  --canvas: oklch(0.115 0.025 255);
  --surface-quiet: oklch(0.145 0.024 255);
  --surface: oklch(0.17 0.03 255);
  --surface-raised: oklch(0.22 0.035 255);
  --line: oklch(0.42 0.04 255 / 0.28);
  --line-bright: oklch(0.65 0.05 230 / 0.32);
  --text: oklch(0.96 0.006 165);
  --muted: oklch(0.72 0.028 250);
  --quiet: oklch(0.57 0.035 250);
  --emerald: oklch(0.76 0.17 160);
  --emerald-deep: oklch(0.58 0.15 160);
  --cyan: oklch(0.78 0.14 205);
  --warning: oklch(0.82 0.13 92);
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Load Host Grotesk through the same Google Fonts URL used by the approved landing-page reference, with a system fallback. Record the external font dependency in the final report.

**Step 4: Implement the Generative Landscape background**

Use semantic markup plus CSS pseudo-elements or child layers for:

- deep canvas
- broad emerald haze
- restrained cyan reflection
- translucent planes
- one subtle four-point star source
- static dark copy/preview-safe mask

Do not create neon wires, repeated stars, hard grids, or bright light behind text.

**Step 5: Add reduced-motion CSS**

Disable all ambient transforms and opacity animation under `prefers-reduced-motion: reduce`.

**Step 6: Run the test to verify it passes**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: PASS.

**Step 7: Checkpoint**

If Git is available, commit as `feat: add PressPilot visual foundation`. Otherwise report the completed checkpoint.

### Task 4: Build the Studio and project shell

**Files:**

- Create: `src/components/StudioHeader.tsx`
- Create: `src/components/ProjectHeader.tsx`
- Create: `src/components/StepProgress.tsx`
- Create: `src/components/StepProgress.test.tsx`
- Modify: `src/App.tsx`
- Create: `public/brand/presspilot-logo-wide.svg`
- Create: `public/brand/presspilot-logo-icon.svg`

**Step 1: Write the failing progress test**

Test that:

- all five direct labels are visible on desktop
- the current step has `aria-current="step"`
- completed steps include visually hidden completion text
- the compact label says `Step 3 of 5 — Customize`

**Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/components/StepProgress.test.tsx
```

Expected: FAIL because the component does not exist.

**Step 3: Implement the shell components**

`StudioHeader` contains:

- official PressPilot logo
- Projects
- Pricing
- Help
- account control

`ProjectHeader` contains:

- Back to projects
- PressPilot Studio label
- project name and project ID
- Draft status
- Project dashboard action

`StepProgress` uses an ordered list and the approved labels:

1. Business details
2. Choose layout
3. Customize
4. Review
5. Download

Use the supplied official SVG assets as the source, copying them into this workspace without modifying the read-only source repository.

**Step 4: Run the test to verify it passes**

Run:

```bash
npm test -- src/components/StepProgress.test.tsx
```

Expected: PASS.

**Step 5: Checkpoint**

If Git is available, commit as `feat: build Studio navigation shell`. Otherwise report the completed checkpoint.

### Task 5: Build accessible customization controls

**Files:**

- Create: `src/components/CustomizationPanel.tsx`
- Create: `src/components/CustomizationPanel.test.tsx`
- Modify: `src/App.tsx`

**Step 1: Write failing interaction tests**

Test that:

- typography choices are a named radio group
- palette choices are a named radio group
- palette choices include visible names, not swatches alone
- changing typography updates the selected value
- changing palette updates the selected value
- the headline input has an associated label
- the demo notice is present and uses website terminology
- the selected layout has a clear change action

**Step 2: Run the tests to verify they fail**

Run:

```bash
npm test -- src/components/CustomizationPanel.test.tsx
```

Expected: FAIL because the control panel does not exist.

**Step 3: Implement minimal stateful controls**

Use real inputs. Do not implement clickable `div` controls.

```tsx
<fieldset>
  <legend>Typography</legend>
  {options.map((option) => (
    <label key={option.id}>
      <input
        type="radio"
        name="typography"
        value={option.id}
        checked={value === option.id}
        onChange={() => onChange(option)}
      />
      <span>{option.name}</span>
    </label>
  ))}
</fieldset>
```

Implement the same semantic pattern for palettes and include a visible selected marker.

**Step 4: Implement clear copy**

- Title: `Customize the website`
- Instruction: `Adjust the selected direction and see changes immediately.`
- Layout change action: `Change layout`
- Demo notice: `Demo products are included for preview. Connect WooCommerce after installation to accept real orders.`

**Step 5: Run the tests to verify they pass**

Run:

```bash
npm test -- src/components/CustomizationPanel.test.tsx
```

Expected: PASS.

**Step 6: Checkpoint**

If Git is available, commit as `feat: add Studio customization controls`. Otherwise report the completed checkpoint.

### Task 6: Build the replaceable website preview system

**Files:**

- Create: `src/components/WebsitePreview.tsx`
- Create: `src/components/WebsitePreview.test.tsx`
- Create: `public/samples/amigo-store/hero-placeholder.svg`

**Step 1: Write failing preview tests**

Test that:

- the preview has the `Website preview` accessible name
- a toolbar identifies the selected sample and language
- the viewport renders the project name, headline, and hero asset
- metadata shows the layout, typography, and palette names
- loading/updating state retains the preview geometry
- the preview does not contain social-ad labels or fake product controls

**Step 2: Run the tests to verify they fail**

Run:

```bash
npm test -- src/components/WebsitePreview.test.tsx
```

Expected: FAIL because the preview does not exist.

**Step 3: Implement the preview shell**

Create three distinct regions:

1. `PreviewToolbar` — website preview label, language, direction, and viewport controls.
2. `PreviewViewport` — a believable website header and hero using the replaceable asset.
3. `PreviewMetadata` — layout, typography, and palette.

The preview is not a decorative browser mockup. It represents the real product preview surface and must retain room for later gallery/system integration.

**Step 4: Create a neutral placeholder asset**

Use an original local SVG with restrained neutral geometry, no generated wordmark, and no embedded PressPilot UI copy. Its only purpose is to preserve the hero image slot until approved samples are supplied.

**Step 5: Implement updating feedback**

When a control changes:

- set an `isUpdating` flag for approximately 220 ms
- keep preview dimensions stable
- show `Updating preview…` in a polite live region
- fade only the changed preview content
- do not blank the viewport

**Step 6: Run the tests to verify they pass**

Run:

```bash
npm test -- src/components/WebsitePreview.test.tsx
```

Expected: PASS.

**Step 7: Checkpoint**

If Git is available, commit as `feat: add replaceable website preview`. Otherwise report the completed checkpoint.

### Task 7: Compose the approved split workspace

**Files:**

- Create: `src/components/RefineWorkspace.tsx`
- Create: `src/components/StudioActionBar.tsx`
- Create: `src/styles/studio.css`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Step 1: Write a failing composition test**

Test that the application renders, in order:

- Studio header
- project header
- progress
- Step 3 heading
- customization panel
- website preview
- Back to layout
- Review website

Test that there is only one primary action.

**Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because the final composition is incomplete.

**Step 3: Implement the desktop grid**

Use a layout equivalent to:

```css
.refine-workspace {
  display: grid;
  grid-template-columns: minmax(360px, 410px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}
```

Use a maximum page width near 1440 px. Reduce empty space before reducing type size.

**Step 4: Implement hierarchy and restraint**

- Use one primary surface for controls and one preview stage.
- Avoid nesting a bordered card around every control.
- Use the raised surface only for selected or interactive areas.
- Keep the preview brighter than its surroundings without placing a glow behind text.
- Keep the action bar visually connected to the workspace.

**Step 5: Run the test to verify it passes**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: PASS.

**Step 6: Checkpoint**

If Git is available, commit as `feat: compose split Refine workspace`. Otherwise report the completed checkpoint.

### Task 8: Implement responsive and RTL behavior

**Files:**

- Modify: `src/styles/studio.css`
- Modify: `src/App.tsx`
- Modify: `src/components/StepProgress.tsx`
- Modify: `src/components/WebsitePreview.tsx`
- Create: `tests/studio-refine.spec.ts`

**Step 1: Add failing browser assertions**

Test these viewports:

- desktop: 1440 × 1100
- laptop: 1280 × 900
- tablet: 834 × 1112
- mobile: 390 × 844

Assertions:

- desktop/laptop use a two-column workspace when space permits
- tablet/mobile stack controls and preview
- mobile exposes `Step 3 of 5 — Customize`
- primary action is visible and does not cover content
- no horizontal overflow
- Arabic mode sets `dir="rtl"`
- progress order, arrows, control alignment, metadata, and action order respond to RTL

**Step 2: Run the browser test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/studio-refine.spec.ts
```

Expected: FAIL before responsive and RTL behavior is complete.

**Step 3: Implement breakpoints**

- Above approximately 1100 px: two-column workspace.
- Between approximately 768 and 1099 px: stacked workspace with compact project header.
- Below approximately 768 px: compact progress, full-width controls, readable preview, and reachable action bar.

Use content-driven layout checks rather than shrinking desktop type to fit.

**Step 4: Implement logical-direction CSS**

Use `margin-inline`, `padding-inline`, `inset-inline`, `border-inline`, and logical text alignment. Mirror only directional icons; do not mirror brand marks or nondirectional icons.

**Step 5: Run the browser test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/studio-refine.spec.ts
```

Expected: PASS.

**Step 6: Checkpoint**

If Git is available, commit as `feat: add responsive and RTL Studio layouts`. Otherwise report the completed checkpoint.

### Task 9: Add accessibility and motion quality gates

**Files:**

- Modify: `src/styles/global.css`
- Modify: `src/styles/studio.css`
- Modify: `tests/studio-refine.spec.ts`

**Step 1: Add failing quality assertions**

Assert:

- keyboard tab order reaches navigation, controls, preview toolbar, back action, and primary action
- every control has an accessible name
- visible focus is present
- selection is not communicated by color alone
- the live preview update announcement is polite
- reduced-motion mode disables ambient and preview transition animation
- fixed/sticky controls do not obscure focused content

**Step 2: Run the assertions to verify they fail where incomplete**

Run:

```bash
npm run test:e2e -- tests/studio-refine.spec.ts
```

Expected: FAIL on any incomplete quality gate.

**Step 3: Implement the missing accessibility behavior**

- Use semantic landmarks and headings.
- Use `fieldset` and `legend` for selector groups.
- Use `aria-current="step"` for progress.
- Use `aria-live="polite"` for preview updates.
- Provide a skip link.
- Provide at least 44 × 44 px interactive targets.
- Use a 3 px restrained-cyan focus ring with sufficient offset.

**Step 4: Run the assertions to verify they pass**

Run:

```bash
npm run test:e2e -- tests/studio-refine.spec.ts
```

Expected: PASS.

**Step 5: Checkpoint**

If Git is available, commit as `fix: harden Studio accessibility and motion`. Otherwise report the completed checkpoint.

### Task 10: Produce visual-regression screenshots

**Files:**

- Create: `tests/studio-refine-visual.spec.ts`
- Create during tests: `artifacts/screenshots/studio-refine-desktop.png`
- Create during tests: `artifacts/screenshots/studio-refine-laptop.png`
- Create during tests: `artifacts/screenshots/studio-refine-tablet.png`
- Create during tests: `artifacts/screenshots/studio-refine-mobile.png`
- Create during tests: `artifacts/screenshots/studio-refine-rtl.png`
- Create during tests: `artifacts/screenshots/studio-refine-reduced-motion.png`

**Step 1: Write the screenshot test**

For each required viewport:

- load the filled sample state
- wait for fonts and the preview to settle
- disable nondeterministic animation for capture
- capture the full screen

Include separate Arabic RTL and reduced-motion captures.

**Step 2: Start the local server**

Run:

```bash
npm run dev
```

Expected: Vite serves the prototype at `http://127.0.0.1:4173` or the configured equivalent.

**Step 3: Run the screenshot test**

Run:

```bash
npm run test:e2e -- tests/studio-refine-visual.spec.ts
```

Expected: all six screenshot artifacts are produced.

**Step 4: Inspect every screenshot visually**

Check:

- hierarchy and brand fit
- preview prominence
- text contrast
- control density
- no clipped or overlapping content
- no horizontal scrolling
- coherent mobile stacking
- correct RTL ordering and alignment
- static reduced-motion treatment
- no bright ambient effect behind copy

If any screenshot fails review, fix the underlying component/CSS and regenerate all affected screenshots.

**Step 5: Checkpoint**

If Git is available, commit as `test: add Studio visual regression coverage`. Otherwise report the completed checkpoint.

### Task 11: Run the final verification gate

**Files:**

- Modify only files required to correct verification failures.

**Step 1: Run unit tests**

Run:

```bash
npm test
```

Expected: all tests pass with zero unhandled errors.

**Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build successfully.

**Step 3: Run browser tests**

Run:

```bash
npm run test:e2e
```

Expected: responsive, RTL, accessibility, and screenshot tests pass.

**Step 4: Audit scope**

Run:

```bash
rg -n "theme|Theme|Build My Site|Documentation|Generate Final Theme|Download Theme" src public index.html
```

Expected: no outdated public-facing terminology remains. Technical comments are allowed only when necessary and explained.

Run:

```bash
rg -n "#[0-9a-fA-F]{3,8}|rgb\(|hsl\(" src --glob '*.css' --glob '*.tsx'
```

Expected: no unexplained scattered hardcoded colors outside the semantic token sheet or sample palette data.

**Step 5: Reinspect final screenshots**

Open and inspect every screenshot created in Task 10 after the final code change.

**Step 6: Report**

Report:

- files created and changed
- components added
- copy changed
- behavior simulated
- screenshots produced
- tests and build commands run
- results
- unresolved issues
- deferred gallery and production integration

**Step 7: Final checkpoint**

If Git is available, commit as `feat: complete Studio Refine visual prototype`. Otherwise report the completed checkpoint and the absence of a repository.

## Deferred work

Do not perform these tasks during this plan:

- integrate the production Studio route
- connect production project data
- connect the current gallery preview system
- connect website generation
- connect payments or downloads
- replace the rest of the five-step flow
- generate final motion/video backgrounds
- replace placeholder hero imagery before approved samples are supplied

Each deferred item requires a separate integration audit and explicit approval.
