# Open Questions

## Harness Dependency

The repository currently has Histoire but no obvious Playwright or Puppeteer
runtime dependency in `packages/web/package.json`.

Decision:

- use an external one-off runner for the first pass
- do not add a package-local browser automation dependency yet

Follow-up:

- decide later whether a durable Playwright/Puppeteer dependency belongs in the
  repo after the first audit proves useful

## Story Coverage Boundary

Initial scan can cover all 41 current Histoire story files, but variants may
need special interaction to expose menus, dialogs, drawers, hover states, focus
states, validation states, and loading states.

Decision needed:

- scan only default visible story states first
- add scripted interactions for high-risk components
- require future stories to expose auditable states without interaction

## Viewports

Spacing can change across responsive modes.

Decision:

- mobile viewport only for the first pass

## Thresholds

A single pixel threshold will produce noisy results. Token-derived thresholds
are more likely to match the package model.

Decision:

- keep the first pass intentionally noisy and tune after human review
- report raw measurements and reason codes rather than strict pass/fail verdicts

Follow-up:

- decide whether later passes should define category-specific minimums from
  `--sys-spacing-xsmall`, `--sys-spacing-small`, and component category

## Screenshot Granularity

Full-story screenshots are reliable but slow to review. Cropped screenshots are
faster but risk losing context.

Decision:

- include full-story screenshots for candidates
- do not require cropped screenshots in the first pass

## Report Strictness

The audit is meant to find suspected missing spacing, not prove defects.

Decision:

- report all suspicious candidates with confidence labels

Follow-up:

- decide later whether low-confidence candidates should move to JSON only once
  the first report shows the actual noise level
