# Final Execution Checklist

The production coding agent should copy this checklist into its implementation issue or PR and check items only with evidence.

## Discovery and protection

- [ ] Read `00-START-HERE.md`, `01-MASTER-CODING-AGENT-PROMPT.md`, and the complete kit.
- [ ] Record production repo/branch/commit and working-tree status.
- [ ] Read production `AGENTS.md`, contribution, security, test, deployment, and UI conventions.
- [ ] Map routes, components, state, APIs, jobs, models, permissions, checkout, credits, gallery, downloads, and localization.
- [ ] Record baseline commands/results and known failures.
- [ ] Identify existing uncommitted user work and avoid overwriting it.
- [ ] Create a reversible branch/feature flag boundary.

## Foundations

- [ ] Port semantic tokens from `src/styles/tokens.css` into production conventions.
- [ ] Load Host Grotesk or the approved production equivalent without layout flash/privacy regression.
- [ ] Port shared buttons, fields, cards, badges, focus, status, progress, header, and footer.
- [ ] Keep 44px controls, visible focus, reduced motion, RTL, and localization.
- [ ] Do not introduce a second global reset or conflicting theme layer.

## Public/application pages

- [ ] Homepage matches approved hierarchy and responsive composition.
- [ ] Pricing renders all four approved tiers.
- [ ] Single Site is the only live launch purchase and uses real checkout.
- [ ] `Secure checkout · Refund policy` appears below the live CTA.
- [ ] Freelancer/Agency/Studio use functional inline waitlist capture.
- [ ] Sign-in uses real production authentication behavior.
- [ ] Projects uses real loading/empty/error/data/actions.

## Studio shell and five-step contract

- [ ] Progress labels are Business details, Choose layout, Customize, Review, Download & install.
- [ ] Current/completed/upcoming semantics and `aria-current` are correct.
- [ ] Internal `building` state stays visually within Step 4.
- [ ] Direct Step 5 navigation is denied unless a real artifact is ready.
- [ ] Back/forward/resume preserve data and focus correctly.

## Step 1

- [ ] Real business category, brief, logo/upload, contact, and language data are used.
- [ ] Validation and persistence are server-authoritative.
- [ ] No hero job starts before valid Continue.
- [ ] Continue saves once, starts/resumes one hero job, and opens Step 2.

## Step 2

- [ ] Existing PressPilot background is shown immediately.
- [ ] Existing real progress/status appears; fake timers/percentages are absent.
- [ ] Direction/style/font selection remains usable while generation runs.
- [ ] Refresh resumes the same job without duplication.
- [ ] Matching ready result replaces the placeholder without clearing selection.
- [ ] Failure/retry and stale-response handling work.

## Step 3

- [ ] Current gallery API, IDs, attribution, selection, and persistence are preserved.
- [ ] Real website preview is integrated into the approved workspace.
- [ ] Typography, palette, headline, language/RTL, and supported choices update truthfully.
- [ ] Gallery loading/empty/failure/retry states are designed.

## Step 4

- [ ] Review reflects persisted real selections and preview.
- [ ] Generation validates authorization, required data, and credit server-side.
- [ ] Submission/job/credit consumption are idempotent.
- [ ] Real queued/building/progress/error/retry states remain inside Step 4.
- [ ] Refresh resumes the job and never double charges.
- [ ] Step 5 activates only after artifact readiness.

## Step 5

- [ ] Page heading is `Your website is ready` and Step 5 is visibly current.
- [ ] Package metadata and preview come from the real artifact/project.
- [ ] `Download website` uses the authenticated real endpoint.
- [ ] Expired/missing/failed artifact recovery is implemented.
- [ ] Installation guidance matches the actual package.

## Security, privacy, and resilience

- [ ] Auth, ownership, CSRF, CSP, escaping, upload, and download protections remain intact.
- [ ] Payment/webhook and credit logic remain server authoritative and replay safe.
- [ ] Waitlist validates/deduplicates/rate-limits and never logs raw email.
- [ ] Slow/offline/timeout/4xx/5xx/session-expiry/multiple-tab cases are handled.
- [ ] No sample project, fake purchase, fake waitlist, fake download, or synthetic job timer ships.

## Verification and release

- [ ] Lint/typecheck/unit/integration/E2E/build/security gates pass.
- [ ] Full create-to-download sandbox journey passes.
- [ ] Desktop, laptop, tablet, mobile, 200% zoom, RTL, keyboard, reduced-motion checks pass.
- [ ] Automated accessibility scan plus manual keyboard/screen-reader spot check pass.
- [ ] Visual comparisons are attached; intentional differences are documented.
- [ ] Feature flag, monitoring, rollout, and rollback are rehearsed.
- [ ] Old UI is retained until owner approves cleanup after stable rollout.
- [ ] Final report contains commands, results, screenshots, risks, and remaining work.

## Final implementation report template

```markdown
## Outcome

## Production baseline
- Repository / branch / baseline commit:
- Existing failures:

## What changed
- Routes:
- Shared components/tokens:
- Production adapters:
- Feature flag:

## Preserved production behavior
- Authentication/projects/uploads:
- Hero/gallery/generation/download:
- Checkout/credits:

## Verification
- Commands and exact results:
- Desktop/mobile/RTL/accessibility evidence:
- Sandbox checkout/create-to-download evidence:

## Rollout and rollback
- Flag/cohort:
- Metrics/alerts:
- Rollback procedure tested:

## Known limitations / follow-up
```
