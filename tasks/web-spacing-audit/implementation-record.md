# Implementation Record

## 2026-06-20 First Mobile Audit Run

Implemented a task-local one-off runner:

```text
tasks/web-spacing-audit/runner.mjs
```

The runner:

- serves the rebuilt Histoire static output from `packages/web/.histoire/dist`
- injects a spacing-audit script into a temporary audit sandbox page
- uses Windows Edge headless CLI as the external browser runner
- measures rendered mobile DOM geometry at `390x844`
- captures full-story mobile-width screenshots for successful variants
- writes Markdown and JSON output under `tasks/web-spacing-audit/output/`

Initial Playwright approach was not used because temporary npm package fetch
timed out. Direct CDP against Windows Edge was also not used because Edge exposed
DevTools on Windows loopback and WSL could not reach that CDP endpoint. Edge CLI
with `--virtual-time-budget` successfully rendered Histoire stories and returned
DOM through `--dump-dom`.

## Commands Run

```sh
pnpm --filter @partner-up-dev/design-web run story:build
SPACING_AUDIT_CONCURRENCY=3 SPACING_AUDIT_EDGE_TIMEOUT_MS=60000 node tasks/web-spacing-audit/runner.mjs
```

## Output

```text
tasks/web-spacing-audit/output/spacing-audit.md
tasks/web-spacing-audit/output/spacing-audit.json
tasks/web-spacing-audit/output/screenshots/
```

Run summary:

```text
Story variants visited: 204
Candidates: 768
Runner errors: 9
Screenshots written: 195
Output size: 6.1M
```

Top reason codes:

```text
control-tight-padding: 260
container-edge-tight: 188
adjacent-elements-tight: 163
text-rhythm-tight: 98
icon-control-small-hit-area: 44
region-container-no-gap: 10
control-inline-parts-tight: 5
```

Runner errors:

```text
PuToggleSwitch / Controlled
PuToggleSwitch / Sizes
PuButton / Slots And Block
PuAccordion / View More
PuAnnouncementBar / Vertical
PuChip / Fit To Width
PuEmptyState / Compact
PuEmptyState / Narrow Container
PuPageHeader / Meta And Body
```

## Notes

- The first-pass rules intentionally favor noisy recall.
- Some candidates point at inner wrappers such as `__content` with zero padding;
  these are useful noise for threshold tuning and wrapper filtering.
- Screenshots are mobile-width full-story evidence, capped by
  `SPACING_AUDIT_MAX_SCREENSHOT_HEIGHT` when a story is very tall.
- The report contains candidates and runner errors only; it does not include
  CSS or component repair recommendations.
- Human review found the first report low-value overall because nearly all
  candidates were low-confidence and many were wrapper-level noise. See
  `human-review.md`.
