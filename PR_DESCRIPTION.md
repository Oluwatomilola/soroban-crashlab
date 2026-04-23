# feat: Add Replay from UI action

Closes #500

## Summary

Implements the Replay-from-UI action flow for dashboard run rows with explicit loading/success/error states, accessible status messaging, and shared cross-module replay mapping so replay callbacks are consistent when inserted into dashboard state.

## What changed

### `apps/web/src/app/add-replay-from-ui-action.tsx`

- Upgraded replay button from boolean loading state to explicit status machine: `idle | loading | success | error`
- Added explicit user-visible result states:
  - `loading`: spinner + `aria-busy`
  - `success`: “Replay queued” label + queued run id feedback
  - `error`: retry-focused error copy and action label
- Added `aria-live="polite"` status region for screen-reader announcement of replay transitions
- Preserved keyboard accessibility via semantic button interaction and focus-visible styles

### `apps/web/src/app/replay-ui-utils.ts` (new)

- Added shared replay UI/domain helpers:
  - `getReplayButtonLabel(status)`
  - `createReplayPlaceholderRun(data)`
  - exported `ReplayActionData` and `ReplayButtonStatus` types
- This prevents duplicate replay-placeholder run mapping logic and improves consistency between modules

### `apps/web/src/app/replay-ui-utils.test.ts` (new)

- Added unit coverage for replay button label mapping and placeholder run creation
- Added integration/regression path that validates `simulateSeedReplay(...)` output can be mapped into a dashboard-compatible `FuzzingRun`

## Design note

**Tradeoff**: Replay success UI auto-resets after ~2.5s instead of persisting indefinitely. This keeps row actions compact and avoids stale “success” labels while still confirming the queue event.

**Alternative considered**: Adding a global toast system for replay feedback. Rejected for this issue scope to avoid introducing cross-cutting notification state and dependencies.

**Rollback path**: Revert this commit to restore prior replay button behavior and inline replay placeholder construction in `page.tsx`.

## Validation

```bash
cd apps/web && npx jest src/app/replay-ui-utils.test.ts --no-cache
```

- ✅ 9/9 tests passing

```bash
cd apps/web && npx eslint src/app/add-replay-from-ui-action.tsx src/app/replay-ui-utils.ts src/app/replay-ui-utils.test.ts
```

- ✅ No lint errors in impacted files

```bash
cd apps/web && npm run lint && npm run build
```

- ⚠ `npm run lint` currently fails due to pre-existing unrelated `page.tsx` lint issues already present in branch baseline
- ⚠ `npm run build` fails on pre-existing unrelated TypeScript error in `add-accessible-keyboard-nav-blueprint-page-49.tsx:253` (`handleReset` not defined)

## Checklist

- [x] Replay action is visible and functional in dashboard row actions
- [x] Explicit loading/success/error states implemented
- [x] Keyboard accessibility preserved
- [x] Responsive behavior preserved for row action container
- [x] Unit tests added for replay helper logic
- [x] Integration/regression path added for replay service → dashboard run mapping
- [x] Existing behavior outside issue scope preserved
