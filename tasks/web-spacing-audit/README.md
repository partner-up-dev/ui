# Web Spacing Audit Task Packet

## State

Explore / Solidify.

## Request

Create a Histoire-driven audit for `packages/web` components that reports
suspected spacing problems with screenshots for manual confirmation.

## Scope

- Render `packages/web/src/stories/**/*.story.vue` through Histoire.
- Scan visible mobile viewport component states for spacing-related suspicion
  signals.
- Capture full-story screenshots next to the generated report.
- Report candidates only. Do not include repair recommendations in the audit
  output.
- Keep the audit focused on `packages/web`; do not change component behavior as
  part of the audit task.
- Use an external one-off browser runner for the first pass instead of adding a
  package dependency.

## Confirmed First-Pass Decisions

- Viewport: mobile only.
- Candidate policy: prefer a noisy candidate set over missing subtle spacing
  issues.
- Screenshots: attach full-story screenshots for candidates; do not require
  cropped candidate screenshots in the first pass.
- Runner: use an external one-off runner before deciding whether any durable
  browser automation dependency belongs in the package.

## Spacing Surface

The audit is broader than section spacing. Candidate signals include:

- region spacing between header, content, footer, actions, meta, and body areas
- internal element spacing inside a component region
- icon/text gaps
- icon-only control padding and hit-area balance
- form control insets and prefix/suffix spacing
- grouped item row gaps, gutters, and list separators
- overlay and scroll-shell edge spacing
- cramped adjacent text, controls, badges, thumbnails, or status elements

## Output Contract

Each finding should include:

- component name
- story and variant/state label when available
- mobile viewport used for the measurement
- full-story screenshot path
- selector or element label for the suspicious area
- measured geometry when the signal is measurable
- suspicion reason code

The report should not include recommended CSS or component changes. Human review
decides whether each candidate is a real issue, intentional density, or a false
positive.

## Files

```text
README.md
+-- packet entry, current request, scope, and output contract

audit-model.md
+-- proposed scanner model, suspicion categories, and evidence shape

implementation-plan.md
+-- staged implementation plan for the Histoire screenshot audit

open-questions.md
+-- decisions to settle before turning the audit into a durable tool

runner.mjs
+-- task-local one-off Edge CLI runner for mobile Histoire spacing audit

implementation-record.md
+-- first run notes, commands, output paths, and known runner gaps

human-review.md
+-- manual review notes and follow-up direction after inspecting screenshots
```
