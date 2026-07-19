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
- `/pricing` — full pricing page
- `/signin` — sign-in page
- `/projects` — project dashboard
- `/studio?step=details` — Studio Step 1
- `/studio?step=layout` — Studio Step 2
- `/studio?step=customize` — Studio Step 3
- `/studio?step=review` — Studio Step 4 review
- `/studio?step=building` — Studio Step 4 creating state
- `/studio?step=download` — Studio Step 5

Append `&dir=rtl` to a Studio URL to inspect the Arabic RTL demonstration project.

## Verification

```bash
npm run check
```

The complete implementation handoff is in [`docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md`](docs/handoff/PRESSPILOT_COMPLETE_UI_CODING_AGENT_HANDOFF.md).
