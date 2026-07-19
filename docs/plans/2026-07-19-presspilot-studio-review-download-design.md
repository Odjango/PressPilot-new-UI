# PressPilot Studio Review and Download Design

**Date:** 2026-07-19  
**Status:** Approved  
**Scope:** Standalone new-UI prototype only. The production PressPilot repository and live generation/download systems remain untouched.

## Goal

Resolve the ambiguous handoff between Review and Download while preserving the five-step Studio workflow:

1. Business details
2. Choose layout
3. Customize
4. Review
5. Download & install

Generation is an action within Step 4, not an additional numbered step. Step 5 becomes active only when the website package is ready.

## Considered approaches

### A. Inline build state in Step 4 — selected

Keep the reviewed website visible, replace the action area with a compact build ledger, and automatically advance to Step 5 on completion. This preserves context and makes the state transition explicit without adding another step.

### B. Full-screen generation overlay

This creates a dramatic transition but hides the reviewed website, interrupts orientation, and risks feeling like an unnamed sixth step.

### C. Immediate jump to Step 5

This is fast but conceals the work between review and delivery, reproducing the ambiguity in the current flow.

## Step 4: Review

The website preview remains the focal point. A restrained review panel summarizes the final choices:

- layout
- typography
- palette
- included pages
- business details and language

Each editable group has a clear return action. The single primary action is `Create website`.

The screen must not duplicate all Step 3 controls. Step 3 is for editing; Step 4 is for confidence and confirmation.

## Building state

After `Create website` is activated, Step 4 remains current. The preview stays visible and stable while a build ledger completes these stages:

1. Preparing content
2. Building pages
3. Applying styles
4. Packaging WordPress website

The prototype uses deterministic local timing only. It does not call generation APIs or create a ZIP. A polite live region announces progress. Motion is disabled or simplified when reduced motion is requested.

When all stages complete, the prototype automatically advances to Step 5.

## Step 5: Download & install

The progress tracker shows Steps 1–4 complete and Step 5 active. The page contains:

- delivery-ready success heading
- a compact visual snapshot of the reviewed website
- `Download website` as the only primary action
- package details using website terminology
- expandable installation guidance
- secondary actions for `Back to review` and `Create another design`

The visual signature is continuity: the preview from Step 4 becomes the artifact being delivered in Step 5.

## State and component model

The prototype adds a local flow state:

- `customize`
- `review`
- `building`
- `download`

`building` maps to numbered Step 4. No sixth progress item is introduced.

New components:

- `ReviewWorkspace`
- `ReviewSummary`
- `BuildLedger`
- `DownloadWorkspace`
- `DownloadPackageCard`
- `InstallGuide`

The existing `StepProgress` receives the active flow state and derives complete/current/upcoming statuses.

## Error handling

The first visual prototype includes a local retryable failure state for the build ledger but does not simulate it by default. Failure retains the preview and offers `Try again` without advancing the step.

## Accessibility

- progress changes use `aria-live="polite"`
- the build ledger is an ordered list with explicit statuses
- focus moves to the Step 5 heading after automatic advancement
- the installation guide uses a native disclosure control
- primary and secondary actions remain keyboard reachable
- reduced-motion mode removes staged animation while preserving state feedback

## Verification

- component tests confirm Step 4 remains active during building
- component tests confirm all four earlier steps are complete on Step 5
- interaction test covers Customize → Review → Building → Download
- production build must pass
- desktop screenshots are visually inspected before presentation

## Deferred work

- production routes and persisted Studio state
- real generation progress
- WordPress ZIP creation and download
- authentication, payments, and expiration rules
- gallery preview integration
