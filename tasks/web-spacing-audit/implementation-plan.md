# Implementation Plan

## Stage 1: Histoire Harness

- Start or reuse a Histoire dev server for `packages/web`.
- Discover story URLs and variant/state labels.
- Visit each story in an external one-off browser runner.
- Capture baseline full-story screenshots for the mobile viewport only.

## Stage 2: DOM Geometry Collection

- Collect visible component root elements in each story canvas.
- For each root, collect candidate descendants using semantic class-name,
  control, role, and layout heuristics.
- Store bounding rectangles, computed spacing styles, text labels, class names,
  and hierarchy information.

## Stage 3: Suspicion Rules

- Add region adjacency rules.
- Add internal child rhythm rules.
- Add control inset rules.
- Add icon/text and icon-only affordance rules.
- Add group/list density rules.

Rules should produce reason codes and evidence, not recommendations.
The first pass should favor recall over precision.

## Stage 4: Screenshot Evidence

- For each candidate, link the full-story mobile screenshot.
- Do not require candidate crop generation in the first pass.
- Link screenshots from the Markdown report.

## Stage 5: Report Generation

- Write a Markdown report containing grouped candidates by component and story.
- Write a JSON evidence file for repeatable sorting, filtering, and threshold
  tuning.
- Keep screenshots and JSON output under a task-local ignored output directory
  unless a reviewed report is intentionally promoted.

## Stage 6: Human Review Loop

- Review candidates manually from screenshots.
- Mark each candidate as confirmed, intentional, or false positive.
- Use review results to tune thresholds and selector heuristics.
