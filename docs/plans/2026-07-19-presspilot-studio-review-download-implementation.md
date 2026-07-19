# PressPilot Studio Review and Download Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend the standalone Studio prototype with a clear Step 4 Review → inline Building → Step 5 Download & Install experience while preserving the approved five-step model.

**Architecture:** Add a local `StudioFlowState` owned by `App`, derive progress statuses from that state, and render separate workspace components for Customize, Review, Building, and Download. The build sequence is deterministic prototype state only; it retains the reviewed preview, announces progress, and advances automatically without calling production APIs or creating a real ZIP.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, Lucide React, CSS custom properties.

---

## Constraints

- Work only in `/Users/soluwrx/Dev/New PressPilot App UI/.worktrees/studio-refine`.
- Do not touch the production PressPilot application repository.
- Do not connect APIs, authentication, payments, persistence, gallery previews, generation, or ZIP packaging.
- Preserve the approved visual direction, Host Grotesk typography, five-step tracker, and replaceable preview asset.
- Generation remains inside numbered Step 4.
- Use TDD: observe each new test fail before implementing the behavior.

### Task 1: Add a flow-state progress model

**Files:**

- Modify: `src/types/studio.ts`
- Create: `src/data/studioFlow.ts`
- Create: `src/data/studioFlow.test.ts`
- Modify: `src/data/sampleProjects.ts`

**Step 1: Write the failing progress derivation test**

Test these exact rules:

```ts
expect(getStepsForFlow("customize")[2].status).toBe("current");
expect(getStepsForFlow("review")[3].status).toBe("current");
expect(getStepsForFlow("building")[3].status).toBe("current");
expect(getStepsForFlow("download").map((step) => step.status)).toEqual([
  "complete", "complete", "complete", "complete", "current",
]);
expect(getStepsForFlow("download")[4].label).toBe("Download & install");
```

**Step 2: Run the test and verify RED**

Run:

```bash
npm test -- src/data/studioFlow.test.ts
```

Expected: FAIL because `studioFlow.ts` and `StudioFlowState` do not exist.

**Step 3: Implement the minimal model**

Add:

```ts
export type StudioFlowState = "customize" | "review" | "building" | "download";
```

Create a constant five-step definition and a pure `getStepsForFlow(state)` function. Map `building` to the same progress index as `review`.

Update the fifth sample label from `Download` to `Download & install`.

**Step 4: Run the focused test and full suite**

```bash
npm test -- src/data/studioFlow.test.ts
npm test
```

Expected: PASS with no existing regressions.

**Step 5: Commit**

```bash
git add src/types/studio.ts src/data/studioFlow.ts src/data/studioFlow.test.ts src/data/sampleProjects.ts
git commit -m "feat: model Studio review and download progress"
```

### Task 2: Build the Step 4 Review workspace

**Files:**

- Create: `src/components/ReviewWorkspace.tsx`
- Create: `src/components/ReviewWorkspace.test.tsx`
- Create: `src/components/ReviewSummary.tsx`
- Modify: `src/components/WebsitePreview.tsx`
- Modify: `src/styles/studio.css`

**Step 1: Write the failing Review workspace test**

Render `ReviewWorkspace` with `defaultProject` and spies. Assert:

- heading `Review the website`
- instruction explaining that the website will be packaged after confirmation
- the real `Website preview` region remains present
- layout, typography, palette, language, and included-page summary values
- buttons `Edit design`, `Back to customize`, and `Create website`
- only `Create website` has the primary-action class
- activating `Create website` invokes `onCreate`

**Step 2: Run the test and verify RED**

```bash
npm test -- src/components/ReviewWorkspace.test.tsx
```

Expected: FAIL because the component does not exist.

**Step 3: Implement the minimal semantic components**

Use this hierarchy:

```tsx
<section className="review-workspace" aria-labelledby="review-title">
  <header className="review-heading">...</header>
  <div className="review-layout">
    <WebsitePreview ... compactMetadata />
    <ReviewSummary ... />
  </div>
  <footer className="flow-action-bar">...</footer>
</section>
```

`ReviewSummary` shows a single quiet surface with dividers, not nested cards. Included pages are Home, Shop, About, Cart, Checkout, and Contact.

**Step 4: Add Step 4 styling**

- keep the preview brighter than the surrounding Studio UI
- use a `minmax(0, 1fr) 300px` desktop grid
- constrain review copy to a readable width
- make the page summary compact and scan-friendly
- reuse current tokens; introduce no new accent color
- preserve responsive stacking below 900 px

**Step 5: Run focused and full tests**

```bash
npm test -- src/components/ReviewWorkspace.test.tsx
npm test
```

Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/ReviewWorkspace.tsx src/components/ReviewWorkspace.test.tsx src/components/ReviewSummary.tsx src/components/WebsitePreview.tsx src/styles/studio.css
git commit -m "feat: add Studio review workspace"
```

### Task 3: Add the inline Step 4 build ledger

**Files:**

- Create: `src/components/BuildLedger.tsx`
- Create: `src/components/BuildLedger.test.tsx`
- Create: `src/hooks/useBuildSequence.ts`
- Create: `src/hooks/useBuildSequence.test.tsx`
- Modify: `src/components/ReviewWorkspace.tsx`
- Modify: `src/styles/studio.css`

**Step 1: Write failing timer-driven sequence tests**

Use fake timers. Assert:

- `Preparing content` starts active
- stages complete in order
- the current stage is announced in a polite live region
- `onComplete` is called exactly once after the fourth stage
- reduced-motion configuration completes without staged delay

Use stage IDs rather than matching decorative icons.

**Step 2: Run and verify RED**

```bash
npm test -- src/hooks/useBuildSequence.test.tsx src/components/BuildLedger.test.tsx
```

Expected: FAIL because the hook and ledger do not exist.

**Step 3: Implement `useBuildSequence`**

Use four stages:

```ts
const BUILD_STAGES = [
  "Preparing content",
  "Building pages",
  "Applying styles",
  "Packaging WordPress website",
] as const;
```

Advance at a short deterministic interval appropriate for visual review. Clear every timer on unmount. Guard `onComplete` with a ref so React Strict Mode cannot call it twice.

**Step 4: Implement `BuildLedger`**

- use an ordered list
- show complete/current/upcoming labels
- display one overall progress bar
- retain the preview beside the ledger
- label the state `Step 4 · Creating website`
- disable back/edit actions during building
- provide a polite, visually hidden live announcement

**Step 5: Run tests**

```bash
npm test -- src/hooks/useBuildSequence.test.tsx src/components/BuildLedger.test.tsx
npm test
```

Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/BuildLedger.tsx src/components/BuildLedger.test.tsx src/hooks/useBuildSequence.ts src/hooks/useBuildSequence.test.tsx src/components/ReviewWorkspace.tsx src/styles/studio.css
git commit -m "feat: add inline website build sequence"
```

### Task 4: Build the Step 5 Download & Install workspace

**Files:**

- Create: `src/components/DownloadWorkspace.tsx`
- Create: `src/components/DownloadWorkspace.test.tsx`
- Create: `src/components/DownloadPackageCard.tsx`
- Create: `src/components/InstallGuide.tsx`
- Modify: `src/styles/studio.css`

**Step 1: Write the failing download workspace test**

Assert:

- heading `Your website is ready`
- visible `Step 5 of 5`
- one primary `Download website` button
- package label `WordPress website`
- delivery details use website/ZIP wording, not theme terminology
- native disclosure titled `How to install your website`
- secondary actions `Back to review` and `Create another design`
- the reviewed project name and preview asset remain visible
- callbacks fire for back and restart actions

**Step 2: Run and verify RED**

```bash
npm test -- src/components/DownloadWorkspace.test.tsx
```

Expected: FAIL because the download components do not exist.

**Step 3: Implement the delivery components**

`DownloadPackageCard` contains the preview continuity artifact, package details, and primary action. The visual download button is prototype-only and must not fabricate a file.

`InstallGuide` uses:

```tsx
<details>
  <summary>How to install your website</summary>
  <ol>...</ol>
</details>
```

Use three concise installation steps: download ZIP, open WordPress Appearance → Themes → Add New, upload and activate.

**Step 4: Add Step 5 styling**

- preserve the Studio header/project/progress shell
- use a centered delivery composition with a wide artifact card
- visually transform the preview snapshot into the packaged deliverable
- keep `Download website` as the only emerald-filled primary action
- avoid celebratory confetti or repeated glow effects

**Step 5: Run tests**

```bash
npm test -- src/components/DownloadWorkspace.test.tsx
npm test
```

Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/DownloadWorkspace.tsx src/components/DownloadWorkspace.test.tsx src/components/DownloadPackageCard.tsx src/components/InstallGuide.tsx src/styles/studio.css
git commit -m "feat: add Studio download and install workspace"
```

### Task 5: Compose and test the complete Step 3–5 transition

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/components/StudioActionBar.tsx`
- Modify: `src/components/StepProgress.tsx`
- Modify: `src/styles/studio.css`

**Step 1: Write the failing App interaction test**

Use fake timers and `userEvent`. Test this exact path:

1. initial heading is `Customize the website` and Step 3 is current
2. activate `Review website`
3. heading becomes `Review the website` and Step 4 is current
4. activate `Create website`
5. Step 4 remains current and `Creating website` is visible
6. advance timers through all build stages
7. heading becomes `Your website is ready`
8. Step 5 is current and four completed-step labels are present
9. activate `Back to review` and verify Step 4 returns without rebuilding

**Step 2: Run and verify RED**

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because App does not yet switch flow states.

**Step 3: Implement App flow composition**

Add:

```ts
const [flow, setFlow] = useState<StudioFlowState>("customize");
```

Derive steps with `getStepsForFlow(flow)`. Render:

- Customize: existing split workspace plus `StudioActionBar`
- Review: `ReviewWorkspace` in review mode
- Building: `ReviewWorkspace` with `BuildLedger`
- Download: `DownloadWorkspace`

The Step 5 heading receives a ref and programmatic focus after automatic advancement.

**Step 4: Make existing action components callback-driven**

`StudioActionBar` receives `onReview`. Preserve current copy and styling. `StepProgress` must tolerate all supplied derived states and compact-label wording.

**Step 5: Run the focused test, full suite, and build**

```bash
npm test -- src/App.test.tsx
npm test
npm run build
```

Expected: all tests and build pass.

**Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx src/components/StudioActionBar.tsx src/components/StepProgress.tsx src/styles/studio.css
git commit -m "feat: connect Studio review build and download flow"
```

### Task 6: Capture and inspect the new visual states

**Files:**

- Create: `artifacts/screenshots/studio-review-direction-01.png`
- Create: `artifacts/screenshots/studio-building-direction-01.png`
- Create: `artifacts/screenshots/studio-download-direction-01.png`
- Modify only if inspection finds defects: `src/styles/studio.css`, relevant components/tests

**Step 1: Start the prototype**

```bash
npm run dev
```

Expected: Vite serves the prototype at `http://127.0.0.1:4173`.

**Step 2: Capture desktop states**

Use Playwright at `1440 × 1100`. Navigate through the actual controls and capture Review, Building, and Download. Wait for Host Grotesk and image assets before capture.

**Step 3: Inspect every screenshot**

Check:

- Step 4 remains active during building
- Step 5 is visibly active only on delivery
- preview continuity is clear
- no clipped content or horizontal page overflow
- primary-action hierarchy is singular
- review and download screens feel distinct
- ambient decoration does not interfere with copy/actions

**Step 4: Fix defects and regenerate affected screenshots**

Any fix must receive an appropriate test when it changes behavior.

**Step 5: Run the final verification gate**

```bash
npm test
npm run build
rg -n "Download Theme|Generate Final Theme|Your Theme|theme ZIP" src public index.html
git status --short --branch
```

Expected:

- all tests pass
- build exits 0
- terminology audit returns no legacy public copy
- only intentional screenshot/code changes remain before the final commit

**Step 6: Commit and push the review checkpoint**

```bash
git add src public artifacts/screenshots docs/plans package.json package-lock.json
git commit -m "feat: complete Studio review and delivery visuals"
git push origin agent/studio-refine-prototype
```

## Completion boundary

Stop after presenting the Step 4, Building, and Step 5 screenshots for approval. Do not begin Steps 1–2 redesign, gallery integration, or production migration without the next explicit approval.
