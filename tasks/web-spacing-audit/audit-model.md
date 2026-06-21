# Audit Model

## Primary Evidence Source

Use rendered Histoire stories as the source of truth. Static file inspection may
help discover candidate selectors, but final findings should come from visible
DOM geometry and screenshots.

## Report Shape

The report is a candidate list, not a diagnosis. A finding means:

```text
This rendered area looks mechanically suspicious under the current spacing
rules and should be reviewed by a human.
```

It does not mean:

```text
This component is wrong.
This CSS should be changed.
This token should be used.
```

The first pass should intentionally be noisy. Low-confidence candidates are
acceptable when the screenshot evidence makes human review cheap.

## Suspicion Families

### Region Adjacency

Detect cramped adjacency between top-level component regions such as:

- header to body
- body to footer
- title block to action block
- media to content
- label row to value row

Evidence can be a vertical or horizontal distance between visible bounding
boxes, plus a cropped screenshot around the two regions.

### Internal Element Rhythm

Detect child elements inside one region that appear too close or unevenly
spaced:

- heading to description
- label to helper/error text
- chip/tag groups
- stacked actions
- thumbnails next to text
- title/meta/status clusters

Evidence can compare adjacent child boxes within the same visual container.

### Control Insets

Detect controls whose content appears too close to the edge:

- text buttons
- icon buttons
- input fields
- textarea fields
- segmented controls
- picker rows
- upload affordances

Evidence can measure content box to container box distances. Icon-only controls
need special handling because the icon glyph may not expose reliable geometric
ink bounds; a first pass can use the icon element bounding box.

### Icon And Affordance Balance

Detect icon/text or icon/control layouts with suspicious spacing:

- icon too close to label text
- icon too close to button edge
- close buttons with asymmetric visual padding
- prefix/suffix content touching field text

Evidence should include both measured distances and screenshot crops because
font icon boxes can be visually misleading.

### Group And List Density

Detect repeated items with cramped row or column rhythm:

- cell groups
- description lists
- accordions
- file lists
- checkbox groups
- card grids

Evidence can include row-to-row distance, item padding, and separator position.

## Signal Sources

Use several weak signals rather than one global threshold:

- element class names with `__header`, `__body`, `__content`, `__footer`,
  `__actions`, `__label`, `__value`, `__icon`, `__prefix`, `__suffix`
- ARIA roles and native controls
- computed styles for padding, gap, margin, border, display, and box sizing
- bounding rectangles for visible elements
- token-derived lower bounds from `--sys-spacing-*`
- component category from story group path

## Evidence Capture

For every candidate, capture:

- a full story screenshot for context
- JSON geometry details for repeatability
- Markdown summary rows for manual review

Candidate crops are out of scope for the first pass. The screenshot path should
be stable enough to link from the Markdown report, for example:

```text
tasks/web-spacing-audit/output/screenshots/PuDialog/default/mobile-001.png
```
