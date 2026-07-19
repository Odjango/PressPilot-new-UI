# PressPilot New UI

Standalone visual prototype and coding-agent handoff for the new PressPilot application UI.

This repository is intentionally separate from the production PressPilot application. It demonstrates the approved visual system, public pages, project dashboard, and complete five-step Studio flow. Production authentication, persistence, payment, generation, and ZIP delivery are not connected here.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4173`.

## Main routes

- `/` — public homepage
- `/pricing` — four-tier credit pricing page; only Single Site is enabled for launch
- `/signin` — sign-in page
- `/projects` — project dashboard
- `/studio?step=details` — Studio Step 1
- `/studio?step=layout` — Studio Step 2 with the hero-image generation placeholder and progress
- `/studio?step=customize` — Studio Step 3
- `/studio?step=review` — Studio Step 4 review
- `/studio?step=building` — Studio Step 4 creating state
- `/studio?step=download` — Studio Step 5

Append `&dir=rtl` to a Studio URL to inspect the Arabic RTL demonstration project.

For visual review only, append `&hero=ready` to Step 2 to inspect the completed hero state. Production migration must use the existing real hero-generation job, progress bar, and PressPilot background image instead of the prototype timer and CSS placeholder.

## Verification

```bash
npm run check
```

The complete implementation handoff is in [`docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`](docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md).
