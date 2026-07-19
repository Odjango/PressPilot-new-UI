# Production Redesign Test Plan

The redesign is complete only when visual parity and production behavior are both verified. Run the production repository's existing test and security gates first, then add the cases below using its established frameworks.

## 1. Establish the baseline

Before changing code, the production coding agent records:

- package/runtime versions;
- install, lint, typecheck, unit, integration, E2E, build, and security commands;
- current pass/fail counts and known failures;
- supported browsers and responsive targets;
- authentication/checkout/generation test environments;
- screenshot or visual-regression process;
- migrations or feature flags involved.

Do not attribute a pre-existing failure to the redesign. Do not hide a new failure inside the baseline.

## 2. Required unit/component coverage

### Shared system

- header renders correct signed-out and signed-in actions;
- active navigation and keyboard focus are correct;
- progress component maps details/layout/customize/review/download to 1–5;
- `building` renders as Step 4 active, not Step 5;
- RTL direction and compact progress labels render correctly;
- buttons/links preserve their true semantic element.

### Pricing

- exactly four tiers render from production-safe configuration/copy;
- exactly one live purchase action renders at launch;
- live action enters real checkout route/handler;
- reassurance and refund link render under the live CTA;
- Freelancer, Agency, and Studio each open their own waitlist form;
- valid submission sends the correct pack and generic success state;
- invalid email and server/rate-limit failure are accessible and retryable;
- email is not placed in URL or client telemetry.

### Studio

- Step 1 validation/persistence happens before navigation;
- hero job is requested only on the Step 1→2 transition;
- repeated clicks/refresh do not create duplicate hero jobs;
- Step 2 shows production placeholder and real generating state;
- determinate and indeterminate progress render honestly;
- a ready response replaces only the matching project's current hero;
- stale job response is ignored;
- failed hero generation exposes retry without data loss;
- style/font/layout selection remains usable while hero generates;
- Step 3 uses current gallery IDs and persists the real selection;
- Step 4 creates no duplicate build or credit charge;
- build failure remains on Step 4 and supports safe retry;
- Step 5 is inaccessible without a ready artifact;
- real download handler receives the correct artifact/project;
- expired/failed artifact presents recovery.

## 3. Required integration/API coverage

- authenticated and unauthorized project reads/mutations;
- project ownership enforcement across every Studio endpoint;
- upload validation and logo lifecycle;
- hero create/status/retry/resume with idempotency;
- gallery load/select/persist/fallback;
- build create/status/retry/resume and credit ledger atomicity;
- checkout success/cancel/failure and webhook replay;
- waitlist validation, deduplication, rate limiting, and privacy-safe logs;
- artifact readiness, signed/protected download, expiry, and regeneration policy;
- localization and direction persistence.

Use production-equivalent fakes or sandbox services. Do not hit billable/live providers from routine CI.

## 4. End-to-end journeys

At minimum automate:

1. Visitor opens homepage → pricing → buys Single Site through sandbox checkout → credit appears.
2. Visitor opens each upcoming tier → submits waitlist → sees success.
3. Signed-out Studio attempt → sign in → returns to intended project/step.
4. Create project → complete Step 1 → Step 2 immediately shows hero progress/placeholder.
5. While hero generates, change homepage direction/font → selections persist when hero becomes ready.
6. Continue through current gallery preview selection → Step 3 preview reflects real choice.
7. Review → generate → real build progress stays within Step 4 → artifact ready → Step 5 activates.
8. Download the real package and verify a nonempty expected artifact/headers.
9. Refresh during hero generation and full build → both resume without duplicates.
10. Hero/build failure → retry → complete successfully without duplicate credit charge.
11. Reopen a completed project from Projects → Step 5/download behavior matches policy.
12. Attempt to access another user's project/artifact → denied.

## 5. Responsive and visual regression matrix

Capture or compare every public page and Studio state at 1440×1100 and 390×844. Add 1100×900 and 768×1024 for layouts with split panels.

Required states:

- homepage;
- pricing default, one waitlist form open, waitlist success;
- sign in default and validation error;
- projects populated, empty, loading/error if practical;
- Studio Step 1;
- Step 2 hero generating and ready;
- Step 3 hero generating/ready as supported, gallery loading/ready/error;
- Step 4 review, building, failure;
- Step 5 ready, expired/failure if supported.

Inspect—not only snapshot—for:

- no horizontal document overflow;
- readable progress and status text;
- no clipped cards/actions/errors;
- correct primary-action hierarchy;
- no green `X` mark;
- long names/localized strings;
- image aspect ratio and fallback behavior;
- stable layout when generated assets replace placeholders.

## 6. Accessibility and interaction checks

- automated accessibility scan on every route/state feasible in CI;
- keyboard-only full happy path;
- focus indicator and focus transition inspection;
- screen-reader names for progress, waitlist, upload, selection, build, download;
- contrast inspection for muted text and disabled/upcoming states;
- reduced-motion run;
- 200% zoom and browser text enlargement;
- touch-target inspection at mobile width;
- Arabic/RTL happy path including mixed-direction content.

Automated scans do not replace manual keyboard and screen-reader inspection.

## 7. Resilience and security scenarios

- slow, offline, timeout, 4xx, 5xx, and malformed API responses;
- double click, multiple tabs, refresh, browser back/forward;
- expired session during save/generation/download;
- stale polling/subscription response after project switch;
- malicious filename/text/HTML input rendered safely;
- upload of invalid type/oversize content;
- direct Step 5 URL without artifact;
- duplicate checkout webhook and build request;
- waitlist abuse and email privacy;
- CSP/CSRF/auth headers remain intact.

## 8. Verification evidence template

The final PR/report includes:

```text
Baseline commit:
Implementation commit:
Feature flag:

Install:
Lint:
Typecheck:
Unit:
Integration:
E2E:
Build:
Accessibility:
Security:

Desktop screenshots:
Mobile screenshots:
RTL screenshots:

Checkout sandbox evidence:
Hero generation evidence:
Gallery integration evidence:
Build/download evidence:
Rollback rehearsal:

Known limitations:
Intentional visual differences:
```

Prototype reference baseline at handoff time: 41 unit/component tests, production build, and 51 Playwright checks passed. Those counts describe the isolated UI prototype only and are not a substitute for production verification.
