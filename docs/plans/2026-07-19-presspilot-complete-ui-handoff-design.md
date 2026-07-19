# PressPilot Complete UI Handoff Design

**Date:** 2026-07-19  
**Status:** Approved by delegated user direction  
**Scope:** Standalone new-UI repository only; no production PressPilot repository changes

## Outcome

Complete the PressPilot visual prototype as a coherent, implementation-ready product surface. The repository must let an AI coding agent open every major page and every Studio state at a stable URL, understand the intended interactions, inspect responsive and RTL behavior, and migrate the approved UI into the production app later.

## Approaches considered

### 1. Static screen gallery

Create isolated mock pages with no shared navigation or state. This is fast but weak as a coding handoff because behavior, routing, component reuse, and edge-state relationships are implicit.

### 2. Single mega-prototype

Place all surfaces behind internal screen toggles. This demonstrates interactions but produces unrealistic URLs and makes screenshot automation and implementation mapping harder.

### 3. Unified route atlas — selected

Build real prototype routes with a shared design system and a stateful Studio. Every route is directly inspectable and testable. The Studio retains one project model across its five steps, while review processing is explicitly a state inside Step 4.

## Route atlas

| Route | Purpose |
| --- | --- |
| `/` | Public homepage |
| `/pricing` | Full pricing, included deliverables, reassurance, FAQ |
| `/signin` | Focused account sign-in surface |
| `/projects` | Project dashboard with continue/new-website actions |
| `/studio?step=details` | Step 1 — Business details |
| `/studio?step=layout` | Step 2 — Choose layout |
| `/studio?step=customize` | Step 3 — Customize with live website preview |
| `/studio?step=review` | Step 4 — Review the complete website direction |
| `/studio?step=building` | Step 4 processing — Creating the website |
| `/studio?step=download` | Step 5 — Download and install |

`/studio` defaults to Step 3 for compatibility with the existing approved prototype. `?dir=rtl` switches the demonstration project to Arabic and applies document-level RTL.

## Information architecture

### Shared public shell

The homepage and pricing page share the compact PressPilot brand header and footer. Navigation targets real routes or homepage anchors. Primary marketing actions use “Start in Studio”; sign-in stays visually secondary.

### Account entry

The sign-in page is intentionally calm: brand context, one focused form, password recovery, and a short reassurance about returning to saved projects. It avoids the density of a dashboard or Studio screen.

### Projects dashboard

The dashboard answers three questions immediately: what projects exist, what stage each project is in, and what the user should do next. A primary “Start a new website” action is paired with project cards whose actions are contextual: Continue in Studio, Review website, or Download website.

### Studio

The Studio uses the existing project header and five-step progress component throughout.

1. **Business details:** business name, short business description, logo, language, and an optional expandable contact-information group. The content is grouped in one surface and remains understandable to nontechnical users.
2. **Choose layout:** four real visual homepage directions—Split Hero, Full-Bleed Hero, Editorial Band, and Minimal Focus. Each card contains a miniature but meaningful website preview, not an abstract icon alone.
3. **Customize:** approved combined controls and live website-preview workspace.
4. **Review:** approved review summary and website preview. Selecting “Create my website” transitions to an honest processing view that stays on Step 4 and describes concrete work.
5. **Download & install:** approved delivery artifact, website ZIP download, installation instructions, and next actions.

## State and navigation behavior

- Query-string step state provides stable deep links without adding a routing dependency.
- Studio Back/Continue actions update the query string and preserve the current project in React state.
- Directly loading any Studio state initializes a valid sample project.
- Completed progress nodes are informational; primary navigation remains in the content and action bar to avoid accidental loss of work.
- The building state can advance automatically in the prototype, but the direct URL remains available for visual review and screenshot capture.
- Forms use explicit labels, selected states, helper copy, keyboard focus, and 44px minimum targets.

## Visual direction

- Host Grotesk typography.
- Deep navy canvas with layered surface navy.
- Emerald for primary actions and completion; cyan only for restrained focus/technical accents.
- Haze and geometric planes provide ambient depth. The previously confusing green X/star remains removed everywhere.
- Clear hierarchy, moderate radii, restrained shadows, and dense-but-readable application layouts.
- Real website miniatures carry the visual storytelling; decoration never competes with tasks.

## Responsive and international behavior

- Desktop: multi-column workspaces where comparison benefits from proximity.
- Tablet: stack complex workspaces while keeping action bars visible and ordered.
- Mobile: compact progress label, single-column forms/cards, no horizontal page overflow.
- Arabic: document-level RTL, logical CSS properties, mirrored directional icons, and Arabic project sample copy.
- Reduced motion: processing and ambient movement collapses to stable states.

## Accessibility requirements

- Skip links on every shell.
- Semantic headings, nav landmarks, forms, fieldsets, labels, and status announcements.
- Visible `:focus-visible` treatment.
- 44px minimum interactive targets.
- Selected layout and language states communicated beyond color.
- No critical information embedded only in images.
- No uncontrolled autoplay or audio.

## Handoff deliverables

1. Working React/Vite prototype for every route above.
2. Desktop visual capture for every unique page/state plus representative mobile and RTL captures.
3. Unit and Playwright coverage for routing, core interactions, responsive overflow, RTL, and accessibility basics.
4. A coding-agent handoff document with route ownership, component map, copy/state contracts, migration order, non-goals, screenshot index, and verification commands.

## Non-goals

- No production authentication, persistence, payment, website generation, or ZIP delivery integration.
- No changes to the production PressPilot application repository.
- No replacement of the current production UI until the user separately approves migration.
- No speculative backend contracts; prototype events are documented as integration seams.

