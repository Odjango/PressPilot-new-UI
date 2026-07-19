# Migration Archive Contents and Use

Archive:

`artifacts/presspilot-production-ui-migration-kit-2026-07-19.tar.gz`

The archive is a portable reference package for the coding agent that will work in the production App repository. It contains source and guidance, not a production-ready replacement repository.

## Included

- root `README.md` and both prior design handoffs;
- `docs/production-migration-kit/` (except the adjacent checksum file generated after packing);
- `docs/handoff/` and `docs/plans/`;
- approved prototype `src/` and `public/`;
- prototype unit/component and Playwright `tests/`;
- relevant `scripts/`;
- package lock and build/test configuration;
- approved visual screenshots from `artifacts/screenshots/`.

## Excluded

- `.git/` and worktree metadata;
- `node_modules/`;
- generated `dist/`;
- caches, logs, temporary test artifacts;
- credentials, environment files, provider secrets;
- the production application source;
- the archive itself.

## Safe use in the production repository

1. Extract outside the production repository or into a temporary reference directory.
2. Read `docs/production-migration-kit/00-START-HERE.md`.
3. Give `01-MASTER-CODING-AGENT-PROMPT.md` to the production coding agent.
4. Let the agent audit production before moving any code.
5. Copy/adapt only the classified visual sources; integrate production-backed features according to `04-PRODUCTION-INTEGRATION-CONTRACTS.md`.
6. Do not copy the prototype `.git`, dependencies, simulated state, routes, timers, sample data, or fake actions.

Example extraction:

```bash
mkdir -p /tmp/presspilot-ui-reference
tar -xzf presspilot-production-ui-migration-kit-2026-07-19.tar.gz -C /tmp/presspilot-ui-reference
```

Verify the archive and handoff files using `docs/production-migration-kit/FILE_CHECKSUMS.sha256` from the source repository. The checksum file is intentionally adjacent to, rather than embedded in, the archive so it can include the archive's own digest.
