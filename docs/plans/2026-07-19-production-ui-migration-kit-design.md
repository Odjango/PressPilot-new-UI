# Production UI migration kit design

## Objective

Make the approved standalone PressPilot redesign straightforward for a separate AI coding agent to migrate into the production App repository without losing production behavior or guessing from screenshots.

## Considered handoff approaches

1. **Repository link plus one long prompt.** Fast to create, but important rules become hard to find and the agent can confuse prototype mechanics with production architecture.
2. **Screenshots plus a visual specification.** Useful for parity, but insufficient for semantic markup, responsive behavior, state transitions, and integration seams.
3. **Layered migration kit — selected.** Pair a copy-paste master prompt with the actual source, a source-use manifest, integration contracts, a phased migration plan, acceptance/test gates, and a machine-readable manifest. This gives the agent both implementation detail and explicit boundaries.

## Package structure

The kit lives in `docs/production-migration-kit/` and is numbered in reading order:

- Start-here guide
- Copy-paste master coding-agent prompt
- Phased production migration plan
- Source and visual manifest
- Production integration contracts
- Visual/copy/accessibility acceptance specification
- Test plan
- Release and rollback plan
- Final execution checklist
- Archive contents and verification instructions

The downloadable archive also contains the complete `src/`, `public/`, `tests/`, visual screenshots, package/config files, and existing design handoffs. The production agent must treat the prototype as a read-only visual and component reference, not as a replacement application architecture.

## Safety model

- Preserve production authentication, persistence, project IDs, uploads, payments, credits, hero generation, gallery preview, full-site generation, downloads, and permissions.
- Never copy prototype timers, sample project state, simulated waitlist submission, or the lightweight route resolver into production.
- Migrate route-by-route behind a reversible feature flag or equivalent release boundary.
- Establish production baseline tests and screenshots before UI changes.
- Require functional, responsive, RTL, keyboard, reduced-motion, and visual-parity evidence before removing the old UI.

