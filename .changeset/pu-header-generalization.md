---
"@partner-up-dev/design-web": patch
---

Add public `PuHeader` as the shared page and surface header primitive, remove
`PuPageHeader`, move header outer padding ownership to page and surface hosts,
split `PuPageScaffold` into a scaffold-owned `pageHeader` path plus a raw
custom `header` path, and align the default `PuDialog` and `PuDrawer` headers
with the shared header structure.
