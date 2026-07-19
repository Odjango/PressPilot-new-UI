# Production UI Migration Kit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Package every approved PressPilot UI source file, visual reference, production integration rule, and verification gate needed by an AI coding agent working in the App repository.

**Architecture:** Create a numbered documentation kit that separates visual source from production contracts, then create a machine-readable manifest and compressed archive containing the prototype implementation and visual atlas. The kit never modifies or assumes the production repository’s framework-specific paths.

**Tech Stack:** Markdown, JSON, React/TypeScript/CSS source references, Playwright/Vitest acceptance evidence, tar/gzip, SHA-256.

---

### Task 1: Create the entry point and master prompt

**Files:**
- Create: `docs/production-migration-kit/00-START-HERE.md`
- Create: `docs/production-migration-kit/01-MASTER-CODING-AGENT-PROMPT.md`

1. Explain the reading order, source branch, hard boundaries, and expected deliverables.
2. Provide a copy-paste prompt that tells the production agent to audit first, preserve backend contracts, migrate incrementally, test first, and avoid unnecessary clarification pauses.
3. Lock every approved product, Studio-flow, pricing, RTL, accessibility, and terminology decision.

### Task 2: Document execution and source ownership

**Files:**
- Create: `docs/production-migration-kit/02-PRODUCTION-MIGRATION-PLAN.md`
- Create: `docs/production-migration-kit/03-SOURCE-AND-VISUAL-MANIFEST.md`

1. Define phased migration tasks with entry/exit gates and rollback points.
2. Classify files as copy/adapt, integrate, reference-only, or test evidence.
3. Map every route/state to components, CSS, tests, and screenshots.

### Task 3: Document behavior and quality contracts

**Files:**
- Create: `docs/production-migration-kit/04-PRODUCTION-INTEGRATION-CONTRACTS.md`
- Create: `docs/production-migration-kit/05-VISUAL-COPY-ACCESSIBILITY-SPEC.md`
- Create: `docs/production-migration-kit/06-TEST-PLAN.md`
- Create: `docs/production-migration-kit/07-RELEASE-ROLLBACK-PLAN.md`
- Create: `docs/production-migration-kit/08-FINAL-EXECUTION-CHECKLIST.md`

1. Specify production data flow for every prototype interaction.
2. Lock visual tokens, public copy, Studio steps, pricing states, RTL, keyboard, responsive, and reduced-motion behavior.
3. Define unit, integration, end-to-end, visual, production-smoke, monitoring, and rollback gates.

### Task 4: Make the kit machine-usable and portable

**Files:**
- Create: `docs/production-migration-kit/migration-manifest.json`
- Create: `docs/production-migration-kit/09-ARCHIVE-CONTENTS.md`
- Create: `docs/production-migration-kit/FILE_CHECKSUMS.sha256`
- Create: `artifacts/presspilot-production-ui-migration-kit-2026-07-19.tar.gz`

1. Encode routes, states, source ownership, screenshots, and hard boundaries in JSON.
2. Generate checksums for migration-kit documents and the final archive.
3. Package source, public assets, tests, configs, screenshots, and handoff documents without `.git`, `node_modules`, or build output.
4. List and inspect archive contents.

### Task 5: Verify and publish

1. Validate JSON syntax, Markdown relative links, archive contents, and checksums.
2. Run `npm run check` to preserve the verified prototype baseline.
3. Run `git diff --check` and ensure unrelated files are absent.
4. Commit and push `agent/studio-refine-prototype`.

