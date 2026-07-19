# Pricing Waitlist Capture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the three Coming soon pricing actions into tier-specific inline email capture while adding checkout reassurance to Single Site.

**Architecture:** Keep the interaction local to `PricingPage` with one open-tier state and one submitted-tier state. The standalone prototype simulates successful capture; the coding-agent handoff defines the production waitlist endpoint seam. Existing card structure, pricing hierarchy, responsiveness, and checkout route remain unchanged.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Testing Library, Playwright.

---

### Task 1: Lock the conversion behavior in tests

**Files:**
- Modify: `src/components/PublicPages.test.tsx`
- Modify: `tests/complete-pages.spec.ts`

**Step 1:** Replace disabled-button assertions with three active `Notify me` controls and assert the Single Site reassurance.

**Step 2:** Test that selecting Agency reveals an email input labeled for Agency, submitting a valid address produces an Agency-specific confirmation, and the checkout link remains unchanged.

**Step 3:** Run `npm test -- src/components/PublicPages.test.tsx` and confirm failure because the controls are still disabled pack actions and no waitlist form exists.

### Task 2: Implement inline capture

**Files:**
- Modify: `src/components/PricingPage.tsx`
- Modify: `src/styles/pages.css`

**Step 1:** Add local open/submitted tier state and replace each disabled action with `Notify me`.

**Step 2:** Render a required native email input, `Join waitlist` submit action, privacy note, cancel action, and polite success confirmation in the selected card.

**Step 3:** Add `Secure checkout · Refund policy` beneath the live purchase action.

**Step 4:** Style the capture as a quiet secondary surface with 44px targets, responsive card growth, and unchanged Single Site dominance.

**Step 5:** Run focused tests and build; confirm green.

### Task 3: Update handoff and visual evidence

**Files:**
- Modify: `docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`
- Modify: `tests/complete-pages-visual.spec.ts`
- Regenerate: `artifacts/screenshots/app-pricing-desktop.png`
- Regenerate: `artifacts/screenshots/app-pricing-mobile.png`
- Create: `artifacts/screenshots/app-pricing-waitlist.png`

**Step 1:** Document the waitlist payload/integration boundary and preserve Single Site as the only checkout action.

**Step 2:** Capture default desktop/mobile pricing plus an expanded Agency waitlist state.

**Step 3:** Visually inspect hierarchy, expansion, mobile flow, and checkout dominance.

### Task 4: Verify and publish

**Files:** all modified files.

**Step 1:** Run `npm run check` and require zero failures.

**Step 2:** Run `git diff --check` and inspect repository status.

**Step 3:** Commit with `feat: capture pricing pack interest` and push `agent/studio-refine-prototype`.

