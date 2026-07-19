# Visual, Copy, Responsive, and Accessibility Specification

This specification freezes the approved direction while leaving production mechanics intact. The prototype and screenshots are the visual truth; this document records the intent behind them.

## 1. Design character

PressPilot should feel precise, confident, organized, and product-led: a dark editorial workspace with bright emerald action color, restrained cyan support color, deliberate typography, generous negative space, and strong information hierarchy. It must not resemble a generic admin template, neon gaming UI, or gradient-heavy AI landing page.

## 2. Token source and required mapping

Use `src/styles/tokens.css` as the canonical prototype token source. Port values into the production design-token mechanism rather than scattering literals.

Required semantic roles:

| Role | Intent |
| --- | --- |
| `canvas-deep` | Main application/marketing background |
| `surface`, `surface-raised`, `surface-quiet` | Cards, panels, inset controls |
| `text`, `muted`, `quiet` | Primary, secondary, tertiary hierarchy |
| `line`, `line-bright` | Quiet and emphasized boundaries |
| `emerald` | Primary actions, current success, active selections |
| `cyan` | Secondary information/progress accents only |
| `danger`, `warning` | Errors and caution; never reuse emerald |
| `radius-sm/md/lg/xl` | Consistent control/card hierarchy |
| `shadow-*` | Depth used sparingly on active/raised elements |

Typography uses Host Grotesk where the prototype loads it, with a production-safe fallback stack. Maintain tight display letter spacing and readable body spacing. Never introduce a different font merely because it is already available in the production theme.

## 3. Global composition rules

- Keep the dark canvas continuous across header, page, and footer.
- Use borders and tone shifts before adding shadows.
- One emerald primary action per decision region.
- Secondary actions are outlined or text actions; destructive actions require distinct danger styling.
- Headings are left aligned in workspaces and may be centered on public page heroes where the approved page shows it.
- Use sentence case for controls and headings. Avoid all-caps except short eyebrow labels and metadata.
- Preserve 44px minimum interactive height.
- Do not add decorative floating badges, sparkles, glassmorphism, or unapproved blobs.
- The removed green `X`/close mark must not return on any page.

## 4. Page-by-page visual contract

### Homepage `/`

- Hero: large two-part statement, brief explanatory copy, one primary `Start in Studio` CTA, one secondary exploration link, value line, and reassurance.
- Right side: the approved transformation preview showing brief-to-site progression.
- Subsequent sections clarify workflow, ownership, WordPress delivery, and final CTA.
- Mobile stacks copy before the preview and makes the primary action full width.

### Pricing `/pricing`

- Four visible tiers: Single Site, Freelancer, Agency, Studio.
- Single Site remains the strongest live card through emerald border/action treatment.
- Agency may retain `Most Popular` as a future-positioning signal, but must not overpower Single Site.
- Single Site action: `Get 1 credit` with `Secure checkout · Refund policy` directly underneath.
- Other tiers: active-looking but clearly launch-disabled purchase state replaced by `Notify me`, which expands an inline email capture and then a success state.
- Never render three inert grey buttons.

### Sign in `/signin`

- Two-column context/card composition on desktop; card follows context on mobile.
- Use production auth fields, links, validation, errors, and identity providers.
- Do not add a prototype-only credential or simulated success.

### Projects `/projects`

- Clear page heading and primary create action.
- Summary at a glance, then real project cards with status and next action.
- Empty, loading, failure, and no-credit conditions follow the same visual system.
- Do not ship `Amigo Store` or other sample records unless production seed/demo mode explicitly requires them.

### Studio Step 1 — Business details

- The five-step progress header is visible and Step 1 is current.
- Business category, brief, logo, contact, and language are organized in one calm editing workspace.
- Contact information may remain optional/collapsible if that matches production validation.
- Hero generation does not start and no generated hero result appears here.
- Primary action clearly proceeds to homepage direction and initiates hero generation through the real workflow.

### Studio Step 2 — Homepage direction

- Step 2 opens immediately after Step 1 continuation.
- A prominent, truthful hero-generation status/progress region appears at the top.
- The existing PressPilot background remains visible until the new hero is ready.
- Layout/style options remain selectable while generation runs.
- Generated image replaces the placeholder in place without shifting the full page or clearing selection.

### Studio Step 3 — Customize

- Desktop uses combined business/design controls plus real website preview.
- Preserve the existing gallery preview system; fit it into the approved panel/preview composition.
- Typography, palette, headline, language/direction, and supported gallery choices update the real preview.
- Mobile stacks controls and preview with no horizontal page scrolling.

### Studio Step 4 — Review and generate

- Review selected business/design inputs and the real preview before generation.
- Primary action uses the production generation/credit workflow.
- Queued/building/progress/error/retry are substates inside Step 4.
- Do not mark the fifth step complete or present download before the artifact is ready.

### Studio Step 5 — Download and install

- Progress header visibly activates Step 5.
- Heading: `Your website is ready`.
- Show actual package metadata and real preview/artifact information where available.
- Primary action: `Download website`.
- Include truthful installation guidance for the delivered WordPress package.
- Provide safe navigation to projects or another design without implying another free credit.

## 5. Approved terminology

Use:

- website
- WordPress website
- website credit
- hero image
- homepage direction
- generate website
- download website
- install-ready package
- Studio

Avoid unless the production artifact is literally and exclusively that item:

- theme generator
- generate theme
- download theme
- theme ZIP
- template pack
- AI magic
- instant AI website (when timing is not guaranteed)

Copy must never promise a precise generation time unless production telemetry and policy support it.

## 6. Core action labels

| Context | Preferred label |
| --- | --- |
| Homepage primary | Start in Studio |
| Pricing live purchase | Get 1 credit |
| Upcoming pricing pack | Notify me |
| Waitlist submit | Join waitlist |
| Step 1 continue | Continue to layouts |
| Step 2 continue | Continue to customize |
| Step 3 continue | Review website |
| Step 4 action | Create website |
| Step 5 action | Download website |

If the production application already uses more precise accessible labels, preserve meaning while matching this tone.

## 7. Responsive requirements

Validate at minimum:

- 1440×1100 desktop visual reference;
- 1100×900 laptop/compact desktop;
- 768×1024 tablet portrait;
- 390×844 mobile;
- 320px-wide stress test where supported by the production browser policy.

Requirements:

- no horizontal document overflow;
- no clipped actions, progress labels, price, project status, or form errors;
- desktop split layouts become one column in logical DOM order;
- cards do not rely on fixed heights when content grows;
- the Studio progress component becomes a useful compact label on narrow screens;
- sticky regions must not cover focused controls or error summaries;
- previews may scroll inside a clearly bounded frame, but the page must remain usable;
- long project/business names and localized strings wrap safely.

## 8. RTL and localization

- Set `lang` and `dir` from the real project/application locale at the correct container level.
- Use logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`) for layout.
- Do not mirror logos, photographs, play icons, or progress semantics that should retain direction.
- Mirror directional navigation icons where appropriate.
- Arabic text uses a compatible fallback font and comfortable line height.
- Test mixed Latin/Arabic project names, email, numbers, currency, and filenames.
- All user-visible strings must pass through the production localization mechanism; prototype literal strings are the approved English source copy, not an excuse to bypass i18n.

## 9. Accessibility acceptance

- Semantic landmarks: header/navigation/main/footer and one page-level `h1`.
- Logical heading order; cards do not skip levels for styling.
- Every form field has a persistent label, help text association, and programmatic error association.
- Error summary receives focus when a submission fails validation.
- Route/step transitions move focus to the new page/workspace heading.
- Current progress step uses `aria-current="step"`; completed state is not communicated by color alone.
- Generation messages use a polite live region; errors use an assertive alert only when needed.
- Native or correctly implemented progress elements expose name, value when determinate, and state.
- Keyboard order follows visual order; all actions work without pointer input.
- Visible focus is high contrast and never removed.
- Images have useful alternative text or empty alt when decorative.
- Text/background, controls, and focus indicators meet WCAG 2.2 AA contrast.
- Respect `prefers-reduced-motion`; avoid continuous nonessential animation.
- Touch targets are at least 44×44 CSS pixels where practical.

## 10. Visual reference discipline

Use the PNGs in `artifacts/screenshots/` for visual comparison. Compare structure, hierarchy, density, color, states, and responsive behavior—not exact sample content. Production data and real mechanics win when a sample conflicts with reality. Record intentional visual differences in the implementation PR.
