# PressPilot Studio Step 3 — Approved Redesign

**Date:** 2026-07-18  
**Status:** Approved for implementation planning  
**Prototype scope:** Standalone visual prototype in `/Users/soluwrx/Dev/New PressPilot App UI`

## 1. Objective

Create a high-fidelity standalone redesign of the existing PressPilot Studio **Step 3 — Refine** screen. The prototype must visually belong to the new PressPilot brand while preserving the current five-step Studio information architecture and avoiding changes to production application logic.

The prototype is for visual approval only. It will not connect to the current PressPilot application, generation APIs, authentication, payments, storage, project persistence, gallery preview system, or WordPress ZIP packaging during this phase.

## 2. Product position

PressPilot is an install-ready WordPress website builder. Public-facing interface copy should use:

- website
- WordPress website
- install-ready WordPress website
- complete WordPress website
- website preview
- website layout
- website ZIP

Avoid public-facing use of `theme` unless technically unavoidable. Internal identifiers may retain technical terminology when changing them could create integration risk later.

## 3. Existing Studio UX to preserve

The current five-step flow remains intact:

1. Business details — currently `Context`
2. Choose layout — currently `Homepage`
3. Customize — currently `Refine`
4. Review — currently `Preview`
5. Download — currently `Deliver`

The redesign does not merge business details, layout selection, customization, review, or download into a new workflow. Step labels may be clarified in the prototype, but their order and functional responsibilities remain unchanged.

## 4. Current UX findings

### Strengths

- The user can see the project, status, and current step.
- Each screen has one dominant forward action.
- Completed, current, and upcoming states are visually distinct.
- Back navigation is consistently available.
- The website preview appears before final generation.
- Step 3 already combines customization and a live preview.

### Problems to address

- The screens are excessively vertical, separating controls, previews, and primary actions with unnecessary scrolling.
- Large unused areas make the workflow feel slower than it is.
- Small uppercase labels and low-contrast helper text reduce scanability.
- Excessive bordered containers give every item equal visual weight.
- Flat navy surfaces do not yet express the approved PressPilot visual system.
- Project status and Dashboard controls feel detached from the working area.
- The existing preview shell lacks a stronger toolbar, metadata context, and visible feedback when selections change.
- Step 4 repeats much of Step 3 without enough visual distinction.
- Existing public copy uses outdated `theme` terminology.
- The supplied Amigo Store test is internally inconsistent: the brief describes a coffee roaster while the selected preview imagery depicts a clothing store.
- Step 1 repeats the number `3` for Brand Logo and Contact Info.
- Supplied captures do not demonstrate mobile, reduced-motion, or Arabic RTL behavior.

## 5. Considered layout approaches

### A. Split workspace — approved

A persistent customization panel sits beside a large real website preview on desktop. This improves comparison and reduces scrolling while keeping Step 3's existing responsibility unchanged.

### B. Preview-first workspace

The preview dominates the screen with controls in a drawer. This is visually cinematic but hides required controls and makes the workflow less obvious.

### C. Guided single-column canvas

Controls appear before the preview in a linear layout. This is simple but reproduces the current excessive verticality and weakens immediate feedback.

## 6. Approved desktop layout

```text
┌──────────────────────────────────────────────────────────────┐
│ App header                                      Account      │
├──────────────────────────────────────────────────────────────┤
│ Back to projects   Amigo Store   Draft   Project dashboard  │
│ Business details — Choose layout — Customize — Review — ZIP │
├──────────────────────────────────────────────────────────────┤
│ Customize the website                                       │
│ Adjust the selected direction and see changes immediately.  │
│                                                              │
│ ┌────────────────────┐  ┌──────────────────────────────────┐ │
│ │ Selected layout    │  │ Website Preview                  │ │
│ │ Typography         │  │ ┌──────────────────────────────┐ │ │
│ │ Brand colors       │  │ │ Real website viewport        │ │ │
│ │ Hero headline      │  │ │ Replaceable hero sample      │ │ │
│ │ Demo notice        │  │ └──────────────────────────────┘ │ │
│ │                    │  │ Layout · Type · Palette metadata │ │
│ └────────────────────┘  └──────────────────────────────────┘ │
│                                                              │
│ Back to layout                         Review website →      │
└──────────────────────────────────────────────────────────────┘
```

The control column should be approximately 380–420 px on wide desktop. The preview column uses the remaining width and remains the focal point. The workspace should fit naturally in a 1440 px viewport without forcing the primary action or preview below a large amount of empty space.

## 7. Component architecture

- `AppShell`
- `StudioHeader`
- `ProjectHeader`
- `StepProgress`
- `RefineWorkspace`
- `CustomizationPanel`
- `SelectedLayoutCard`
- `TypographySelector`
- `PaletteSelector`
- `HeroHeadlineField`
- `DemoNotice`
- `WebsitePreview`
- `PreviewToolbar`
- `PreviewViewport`
- `PreviewMetadata`
- `StudioActionBar`
- `AmbientBackground`

Components should be reusable and driven by local prototype data rather than page-specific hardcoded layout rules.

## 8. Preview asset contract

The first prototype opens in a filled sample-project state. Hero and website preview imagery must be replaceable without restructuring the interface.

Use a small local sample registry with fields such as:

- project name
- business description
- business category
- language and direction
- logo asset
- hero layout identifier
- hero sample asset
- typography choice
- palette name and swatches
- hero headline
- preview metadata

The future gallery preview system will be connected after the new visual direction is approved. No gallery integration is required for the standalone prototype.

## 9. Visual system

### Typography

Use Host Grotesk as the principal application font.

- Major screen title: 700–800
- Section title and primary action: 600–700
- Navigation, control label, and selected option: 500–600
- Instructions, helper text, and metadata: 400–500

Do not apply compressed promotional headline styling to controls, metadata, or form content.

### Semantic color tokens

- Deep canvas: `oklch(0.085 0.018 255)`
- Main canvas: `oklch(0.115 0.025 255)`
- Quiet surface: `oklch(0.145 0.024 255)`
- Main surface: `oklch(0.17 0.03 255)`
- Raised surface: `oklch(0.22 0.035 255)`
- Primary text: `oklch(0.96 0.006 165)`
- Muted text: `oklch(0.72 0.028 250)`
- Quiet text: `oklch(0.57 0.035 250)`
- PressPilot emerald: `oklch(0.76 0.17 160)`
- Emerald dark: `oklch(0.58 0.15 160)`
- Restrained cyan: `oklch(0.78 0.14 205)`
- Subtle line: `oklch(0.42 0.04 255 / 0.28)`

Emerald is the primary action, selection, completion, and success color. Cyan is limited to secondary reflection and keyboard focus.

### Spacing and geometry

- Base spacing: 8 px
- Supporting increments: 4, 8, 12, 16, 24, 32, 48, 64 px
- Radius scale: 10, 14, 18, 24 px
- Minimum touch target: 44 × 44 px
- Desktop content maximum: approximately 1440 px

Use borders selectively. Prefer surface separation, spacing, and hierarchy before adding another container outline.

## 10. Signature visual treatment

The website preview becomes a quiet living stage. Behind the preview, use the approved **Generative Landscape** scenario:

- deep navy foundation
- restrained emerald haze
- layered translucent planes
- low-contrast architectural hints
- subtle four-point PressPilot light source
- dark copy-safe and preview-safe regions

The first prototype should use lightweight CSS and SVG layers with a static reduced-motion state. It does not require a generated video background.

## 11. Motion

- One dominant action at a time.
- Preview/control feedback may animate for 160–220 ms.
- Ambient layers move slowly and independently over 12–20 seconds.
- No continuous motion inside form controls.
- No pulsing primary button.
- Respect `prefers-reduced-motion` and provide a fully static composition.
- Pause nonessential animation when the page is not visible where practical.

## 12. Responsive behavior

### Desktop

Controls and preview are side by side. The preview retains visual priority.

### Smaller laptop

Reduce the control column width and surrounding whitespace before reducing type size. Maintain a useful preview viewport.

### Tablet

Stack customization controls above the preview. Keep the action bar close to the preview and current task.

### Mobile

- Replace the full progress rail with `Step 3 of 5 — Customize` plus a compact progress indicator.
- Use full-width controls.
- Allow related control groups to collapse without hiding required context.
- Keep the primary action reachable without covering content.
- Show the preview at a readable aspect ratio rather than shrinking the desktop canvas.

## 13. RTL and accessibility

- Use logical CSS properties rather than hardcoded left/right positioning.
- Mirror back/forward arrows and progress direction in RTL.
- Align controls, labels, preview metadata, and action order appropriately for Arabic.
- Implement typography and palette choices as real radio groups.
- Do not communicate palette selection by color alone; include visible names and selection markers.
- Use visible keyboard focus with the restrained cyan token.
- Associate every label and helper message with its control.
- Announce meaningful preview updates through an appropriate non-disruptive live region.
- Maintain adequate contrast for muted text and inactive progress states.

## 14. Approved copy direction

- `Refine` → `Customize`
- `Refine the Direction` → `Customize the website`
- `Fine-tune your theme's appearance` → `Adjust the website direction and see changes immediately.`
- `Review & Generate` → `Review website`
- `Back to Homepage` → `Back to layout`
- `Generate Final Theme` → `Create website`
- `Download Theme` → `Download website`

The five-step labels become:

1. Business details
2. Choose layout
3. Customize
4. Review
5. Download

## 15. Prototype states

The representative implementation should demonstrate:

- filled sample project
- current and completed progress states
- selected layout
- selected typography
- selected palette
- editable hero headline
- coherent demo notice
- loaded preview
- preview-updating state
- keyboard focus
- responsive layouts
- reduced-motion fallback
- Arabic RTL layout

Gallery loading, gallery failure, authentication, payment, generation, and download packaging remain outside this prototype's functional scope.

## 16. Success criteria

- The five-step UX remains recognizable.
- Step 3 fits its principal controls and a useful preview within a normal desktop viewport.
- The preview is the focal point without hiding customization controls.
- The visual system matches the approved landing-page direction without resembling a generic developer dashboard.
- Public copy uses website-oriented terminology.
- Sample hero assets can be replaced without layout changes.
- Desktop, laptop, tablet, mobile, reduced-motion, keyboard, and Arabic RTL presentations are demonstrable.
- No production PressPilot repository or business logic is modified.

## 17. Deferred integration

After visual approval, plan a separate integration phase that maps prototype components onto the production application's existing routes, state, preview data, generation actions, and gallery preview system. That phase requires its own audit and approval before any production code changes.
