# Production Integration Contracts

This document is the bridge between the approved prototype and the existing PressPilot application. The production coding agent must first map each contract below to the real repository. The prototype is the visual source, not the backend source.

## 1. Integration ownership matrix

| Capability | Approved UI source | Production source of truth | Required adapter behavior |
| --- | --- | --- | --- |
| Authentication | `MarketingHeader`, `StudioHeader`, `SignInPage` | Existing auth/session middleware and routes | Preserve session, redirects, CSRF, password/reset, logout, and authorization behavior. Adapt only presentation. |
| Projects | `ProjectsPage`, project cards and dashboard | Existing project API/database | Render real names, IDs, timestamps, status, step, language, and download readiness. Never ship sample project arrays. |
| Studio state | `StudioHeader`, `ProjectHeader`, `StepProgress`, route workspaces | Existing project state and persistence | Translate production status to the five approved visual steps. Resume safely after refresh. |
| Logo/upload | Step 1 upload presentation | Existing upload/storage/validation | Keep real file limits, validation, storage, deletion, and signed URL behavior. |
| Hero generation | Step 2 progress and preview states | Existing image-generation job/API | Start only after valid Step 1 continuation; show existing PressPilot image until the generated image is ready. |
| Gallery/hero choice | Step 2/3 presentation | Current gallery preview and selection system | Keep current gallery IDs, image source, selection persistence, retry behavior, and preview pipeline. |
| Website generation | Step 4 review/build presentation | Existing generation/export job | Use real job state, progress, errors, idempotency, and artifact records. |
| Delivery | Step 5 download presentation | Existing artifact/download endpoint | Never expose Step 5 until a valid artifact exists. Use the authenticated, expiring or protected real download. |
| Credits/checkout | Pricing and purchase CTA presentation | Existing credit ledger and checkout | Only successful server-confirmed payment grants credit. Preserve webhook verification and replay protection. |
| Waitlists | Pricing inline forms | New or existing first-party waitlist endpoint | Persist consented email and requested pack; prevent duplicate spam; never log raw email. |
| Language/RTL | Language control and `dir` behavior | Existing project locale | Persist locale and direction and apply them to the full shell and preview. |

## 2. UI adapter model

The production implementation may use its existing domain types, but a view-model boundary should provide at least this information to the redesigned UI:

```ts
type StudioViewModel = {
  projectId: string;
  projectName: string;
  status: "draft" | "generating" | "ready" | "failed";
  locale: string;
  direction: "ltr" | "rtl";
  currentStep: "details" | "layout" | "customize" | "review" | "download";
  business: {
    categoryId: string | null;
    brief: string;
    logoUrl: string | null;
    contact: Record<string, string | null>;
  };
  design: {
    layoutId: string | null;
    typographyId: string | null;
    paletteId: string | null;
    headline: string;
  };
  hero: HeroGenerationViewModel;
  gallery: GalleryViewModel;
  build: BuildViewModel;
  delivery: DeliveryViewModel;
};
```

Do not force the production database to match the prototype's `StudioProjectSample`. Map production data into a stable UI model and map user actions back through existing services.

## 3. Hero generation state machine

```text
not_started
    │ Step 1 validates and user selects Continue
    ▼
queued ──────► generating ──────► ready
  │                │               │
  └──── error ─────┴──── error ────┘
                     ▼
                   failed ── retry ──► queued
```

Recommended view model:

```ts
type HeroGenerationViewModel = {
  state: "not_started" | "queued" | "generating" | "ready" | "failed";
  jobId: string | null;
  progress: number | null; // 0..100 only when trustworthy
  placeholderUrl: string;  // existing PressPilot background image
  generatedUrl: string | null;
  errorCode: string | null;
  canRetry: boolean;
  updatedAt: string | null;
};
```

Rules:

1. Step 1 does not display a generated hero or start a job.
2. The Continue action validates and saves Step 1 first. It then creates or resumes one idempotent hero job and navigates to Step 2.
3. Step 2 immediately shows the existing PressPilot background and the real progress indicator.
4. Style, layout, and font selection remain usable while generation runs.
5. When the server confirms `ready`, replace the placeholder with the generated asset without resetting user selections.
6. A stale response for an old job or project must never replace the active project image.
7. Refreshing Step 2 resumes from persisted job state; it must not create a duplicate job.
8. If production exposes no numeric progress, show an indeterminate bar and truthful status text. Never simulate percentages.
9. A failed job presents retry and preserves all completed Step 1 data.
10. Leaving and returning to Step 2 must show the actual persisted state.

Trigger pseudocode:

```ts
async function continueFromDetails(projectId: string, payload: DetailsPayload) {
  await saveAndValidateDetails(projectId, payload);
  const hero = await ensureHeroJob(projectId, { idempotencyKey: `hero:${projectId}` });
  navigate(stepUrl(projectId, "layout"));
  return hero;
}
```

## 4. Gallery and preview contract

The existing gallery preview system remains authoritative. The redesigned interface may change the container, cards, labels, selection controls, and metadata presentation, but must preserve:

- the production gallery request and response shape;
- asset IDs and attribution/license metadata;
- image loading, retry, fallback, and caching behavior;
- current selection and project persistence;
- the source of the website preview markup;
- any category-specific or layout-specific filtering;
- safe URL handling and alternative text;
- navigation back/forward without losing the choice.

Recommended adapter:

```ts
type GalleryViewModel = {
  state: "idle" | "loading" | "ready" | "empty" | "failed";
  options: Array<{
    id: string;
    previewUrl: string;
    fullUrl?: string;
    alt: string;
    attribution?: string;
  }>;
  selectedId: string | null;
  errorCode: string | null;
};
```

Do not replace the gallery with the sample `hero-placeholder.svg`, hard-coded cards, or the prototype preview HTML.

## 5. Full website generation contract

Step 4 contains review and generation. `building` is an internal substate of Step 4, never a sixth visual step.

```ts
type BuildViewModel = {
  state: "not_started" | "queued" | "building" | "ready" | "failed";
  jobId: string | null;
  progress: number | null;
  stages: Array<{ id: string; label: string; state: "pending" | "active" | "complete" | "failed" }>;
  errorCode: string | null;
};
```

Rules:

- validate required data and available credits server-side;
- use idempotency for job creation and credit consumption;
- disable duplicate submissions while the request is pending;
- show real stages/progress only;
- persist the job and resume polling/subscription after refresh;
- keep users on Step 4 for queued/building/failed states;
- advance to Step 5 only after the backend confirms a valid artifact;
- never consume more than one credit for retries of the same accepted build;
- make failure recovery explicit and preserve selections.

## 6. Delivery contract

```ts
type DeliveryViewModel = {
  state: "unavailable" | "preparing" | "ready" | "expired" | "failed";
  artifactId: string | null;
  filename: string | null;
  sizeBytes: number | null;
  generatedAt: string | null;
  downloadUrl?: string; // short-lived if production uses signed URLs
};
```

Step 5 must be guarded by server state. A query string such as `?step=download` cannot grant access. The Download Website action calls the real authenticated endpoint, honors artifact expiry/regeneration, and reports failure without fabricating a file. Installation guidance must reflect the actual delivered format.

## 7. Credits and checkout contract

- Single Site is the only live launch purchase: one credit, `$29.99` per the approved copy unless the production billing configuration says otherwise.
- The CTA must enter the existing authenticated checkout path, not `/studio?step=details` as the prototype does.
- Price, currency, product/price ID, tax, discounts, and entitlement are server-owned.
- Credit is granted only after the verified payment completion path or webhook.
- Repeated webhooks and browser refreshes must be idempotent.
- Failed or cancelled checkout grants no credit and returns an understandable status.
- The UI reads the current credit balance from production; it does not decrement optimistically unless the existing architecture safely reconciles it.

## 8. Waitlist contract

The three upcoming packs—Freelancer, Agency, and Studio—use an inline `Notify me` email capture. Suggested request:

```ts
type WaitlistRequest = {
  email: string;
  pack: "freelancer" | "agency" | "studio";
  source: "pricing";
  locale: string;
  consentedAt: string;
};
```

Server behavior:

- normalize and validate the email;
- rate-limit by IP/session without exposing whether an address already exists;
- upsert or safely deduplicate `(email, pack)`;
- record consent timestamp and source;
- return a generic success for duplicate submissions;
- keep raw email out of application logs, analytics properties, URLs, and error reports;
- provide a documented unsubscribe/removal path consistent with applicable policy;
- make failure retryable without clearing the input.

## 9. Routing, resume, and authorization

- Preserve production route conventions and project IDs. Prototype routes are examples only.
- Resolve the visible step from persisted project state plus authorized user intent—not from query parameters alone.
- Back/forward navigation should work without data loss.
- An unauthorized user is redirected through the existing sign-in return flow.
- A user cannot view or mutate another user's project by changing an ID.
- Completed projects can be reopened and re-downloaded only according to current production policy.

## 10. Errors, telemetry, and security

Every network-bound feature needs loading, success, empty, failed, retrying, and resumed states where applicable. Use stable error codes for telemetry and user-safe copy for presentation. Preserve CSP, CSRF, XSS escaping, signed upload/download URLs, server-side validation, and authorization. Never expose provider prompts, internal job payloads, stack traces, secrets, payment metadata, or personally identifying data in client logs.
