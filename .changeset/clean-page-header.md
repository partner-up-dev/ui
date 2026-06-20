---
"@partner-up-dev/design-web": patch
---

Simplify `PuPageHeader` into a neutral two-row page header with a fixed main row
and optional meta row. The component now uses `variant="line"` for bottom
separation and no longer exposes layout, bordered, body slot, or soft/outline/solid
container variants.
