# Release and Rollback Plan

The redesign should be introduced as a reversible presentation migration. Do not delete the current UI in the first production change.

## 1. Feature boundary

Prefer one server-controlled or deployment-configured feature flag for the redesigned shell, with narrower flags only where production risk requires them:

```text
presspilot_ui_redesign
├── marketing_and_pricing
├── projects_and_auth_shell
└── studio_redesign
```

The flag changes presentation and route rendering, not business rules. Old and new UIs should call the same production services during the transition.

## 2. Compatibility rules

- No destructive database migration solely for the redesign.
- New fields are nullable/backward compatible and have safe defaults.
- Existing project URLs/bookmarks either continue to work or redirect deterministically.
- Existing in-progress and completed projects open correctly in both UI versions during rollout.
- Current checkout product IDs, credits, generation jobs, and artifacts remain valid.
- New waitlist storage is isolated and rollback-safe.
- Cache keys/API versions must not make the old UI unreadable after rollback.

## 3. Staged rollout

### Stage A — local and CI

- production baseline recorded;
- all automated gates pass;
- production-service adapters tested with sandbox/fakes;
- no prototype timers/sample data/fake actions remain.

### Stage B — internal preview

- flag enabled for staff/test accounts only;
- run full create-to-download journey;
- verify real hero placeholder/progress/replacement;
- verify gallery, credit, checkout, build, and artifact behavior;
- inspect desktop/mobile/RTL/accessibility.

### Stage C — controlled production canary

- enable for a small percentage or explicit allowlist;
- monitor errors, conversion funnel, jobs, credits, checkout, waitlist, and downloads;
- compare with old-UI baseline;
- keep rollback executable without a code rebuild when possible.

### Stage D — broad rollout

- increase exposure in measured increments;
- pause between increments long enough to observe generation/download jobs;
- retain old UI and flag through at least one complete monitoring window.

### Stage E — cleanup

- only after stable broad rollout and owner approval;
- remove old presentation in a separate PR;
- retain compatible data/API migrations and rollback documentation as policy requires.

## 4. Monitoring signals

Track by stable, privacy-safe event names and server metrics:

- route render/JS error rate;
- Step 1 validation failure and Step 1→2 completion;
- hero job create success, duplicate prevention, time-to-ready, failure/retry;
- gallery load/select errors;
- Step 3→4 and generation submission rate;
- build success/failure/time-to-artifact;
- credit consume/refund/reconciliation anomalies;
- checkout start/success/cancel/failure and webhook errors;
- Step 5 access denied, artifact download success/failure;
- waitlist open/submit/success/failure by pack, never raw email;
- accessibility/UX support reports and device/browser distribution.

## 5. Rollback triggers

Rollback or disable the affected flag immediately for any of:

- authentication or authorization regression;
- cross-user project/artifact exposure;
- duplicate credit charges/consumption or checkout entitlement errors;
- duplicate generation jobs at material rate;
- inability to resume in-progress projects;
- significant hero/gallery/build/download failure increase;
- widespread blank/broken layouts or mobile blockers;
- data corruption, irreversible project state, or security policy regression.

Less critical copy/alignment defects can be fixed forward if the core funnel remains safe.

## 6. Rollback procedure

1. Disable the narrowest affected feature flag.
2. Confirm new traffic renders the old UI while production services remain available.
3. Stop only new problematic job creation if required; do not discard valid in-flight jobs.
4. Verify checkout, credits, projects, and downloads using the old UI.
5. Preserve logs/job IDs and take a privacy-safe incident snapshot.
6. Reconcile duplicate/missing credits or entitlements using existing audited tools.
7. Communicate impact and status through the production incident process.
8. Fix and verify in the internal cohort before re-enabling.

Do not rollback by destructive database reversal unless an independently reviewed migration plan explicitly requires it.

## 7. Pre-release sign-off

- Product owner confirms visual direction and copy.
- Engineering confirms production contracts and migration safety.
- QA confirms test matrix and devices.
- Security/privacy confirms checkout, waitlist, uploads, downloads, and telemetry.
- Operations confirms flags, dashboards, alerts, and rollback access.
- The release note lists intentional changes to the five-step flow and terminology.
