# PressPilot production UI migration kit — start here

This is the complete handoff for implementing the approved PressPilot redesign inside the production App repository.

## Source of truth

- Prototype repository: `https://github.com/Odjango/PressPilot-new-UI`
- Prototype branch: `agent/studio-refine-prototype`
- Complete human-readable handoff: `../handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`
- Copy-paste agent instruction: `01-MASTER-CODING-AGENT-PROMPT.md`
- Machine-readable route/source manifest: `migration-manifest.json`
- Visual references: `../../artifacts/screenshots/`

The prototype is a working React/CSS reference, not a replacement backend or production application skeleton.

## Read in this order

1. `01-MASTER-CODING-AGENT-PROMPT.md`
2. `02-PRODUCTION-MIGRATION-PLAN.md`
3. `03-SOURCE-AND-VISUAL-MANIFEST.md`
4. `04-PRODUCTION-INTEGRATION-CONTRACTS.md`
5. `05-VISUAL-COPY-ACCESSIBILITY-SPEC.md`
6. `06-TEST-PLAN.md`
7. `07-RELEASE-ROLLBACK-PLAN.md`
8. `08-FINAL-EXECUTION-CHECKLIST.md`
9. `09-ARCHIVE-CONTENTS.md`
10. `10-APPROVED-PRICING-COPY.md`

## What is finished

The approved visual implementation exists for:

- Public homepage
- Pricing, including Single Site checkout state and upcoming-pack waitlist capture
- Sign in
- Projects dashboard
- Studio Step 1 Business details
- Studio Step 2 layout selection while the hero image generates
- Step 2 hero-ready replacement state
- Studio Step 3 live customization and website preview
- Step 3 customization while hero generation is still running
- Studio Step 4 review
- Step 4 website-creation processing
- Studio Step 5 download and WordPress installation guidance
- Desktop, tablet, mobile, reduced-motion, and Arabic RTL reference states

## What is deliberately not in the prototype

- Production authentication
- Production database/project persistence
- Real logo upload/storage
- Real checkout, credit ledger, entitlement, or webhook processing
- Real waitlist persistence/email delivery
- Real hero-image generation
- Production gallery/website preview connection
- Real full-site generation jobs
- Real ZIP creation or signed download
- Production analytics, monitoring, or support integrations

Those systems must be preserved and connected in the App repository. They must not be replaced by prototype local state or timers.

## Five non-negotiable migration rules

1. Preserve every existing production API and backend workflow unless a separate backend change is explicitly required and tested.
2. Reuse the existing hero-generation job, PressPilot background image, and working progress bar. Generation begins only when Step 1 continues to Step 2.
3. Reuse the current production gallery/website preview system inside the new Step 3 shell.
4. Keep Step 4 processing inside Step 4; activate Step 5 only when the downloadable website is actually ready.
5. Keep the old UI recoverable until the new UI passes production journey, responsive, RTL, accessibility, and visual-parity gates.

## Recommended use

Give the production coding agent:

- The App repository/worktree
- The prototype repository or the packaged archive
- The complete contents of `01-MASTER-CODING-AGENT-PROMPT.md`

The agent should then execute `02-PRODUCTION-MIGRATION-PLAN.md` phase by phase and report evidence using `08-FINAL-EXECUTION-CHECKLIST.md`.
