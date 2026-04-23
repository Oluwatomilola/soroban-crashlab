# chore(web): add run cluster overview states and accessibility

Closes #501

## Summary

This PR completes the Run cluster overview behavior in the dashboard with explicit UI states, deterministic risk insight content, and keyboard-friendly card interactions.

## What changed

- Updated `RunClusterOverview` to support explicit `loading`, `error`, and `success` states via props.
- Replaced static health badge text with computed overall cluster health.
- Added deterministic cluster risk insight generation from live run stats.
- Added focusable cluster cards with visible keyboard focus treatment.
- Wired `page.tsx` to always render `RunClusterOverview` and pass through `dataState`, retry callback, and error message.
- Extended tests in `page.integration.test.ts` and utility-level tests in `add-run-cluster-overview.test.ts` for new state and helper behavior.

## Design notes

- State handling is now local to the overview component to keep dashboard wiring simple and predictable.
- Risk insights avoid placeholder copy and are derived from actual per-area failure/critical distributions.
- Responsive behavior preserves existing grid breakpoints (`1 / 2 / 4` columns).

## Validation

### Targeted checks

- `npx eslint src/app/add-run-cluster-overview.tsx src/app/page.tsx src/app/page.integration.test.ts`
  - Passes with no errors.

### Repository baseline checks

- `npm run lint`
  - Fails due to pre-existing unrelated lint errors in other app modules (e.g. `react-hooks/set-state-in-effect` in `integrate-sentry-integration-for-crash-reporting.tsx` and others).
- `npm run build`
  - Fails due to pre-existing unrelated type error: missing `handleReset` in `src/app/add-accessible-keyboard-nav-blueprint-page-49.tsx`.

## Checklist

- [x] Linked issue with `Closes #501`
- [x] Kept changes focused to Run cluster overview behavior
- [x] Added/updated tests for primary behavior
- [x] Preserved existing behavior outside scope
