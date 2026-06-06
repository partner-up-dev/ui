# Typography Scale

Goal:

```
Replace the current broad Material-like type ramp with fewer, more orthogonal
roles. The new roles should make component authors choose by purpose, not by
near-identical visual size.
```

Confirmed role names:

```
hero
title
section
body
support
caption
control
```

## Proposed Scale

```
hero:
  size: 2rem
  weight: 500
  line-height: 1.2
  use: first-level page or high-impact feature title

title:
  size: 1.375rem
  weight: 500
  line-height: 1.3
  use: page header title, modal title, major panel title

section:
  size: 1.125rem
  weight: 500
  line-height: 1.35
  use: card title, empty state title, form section heading

body:
  size: 1rem
  weight: 400
  line-height: 1.5
  use: primary readable body text

support:
  size: 0.875rem
  weight: 400
  line-height: 1.45
  use: subtitle, helper, description, secondary value text

caption:
  size: 0.75rem
  weight: 400
  line-height: 1.35
  use: counts, metadata, weak auxiliary labels

control:
  size: 0.875rem
  weight: 500
  line-height: 1.25
  use: button, input label, chip, segmented item, picker command text
```

## Current Usage Evidence

Observed `pu-font()` usage in packages/web SCSS:

```
label-large    25
title-small    13
body-medium    12
body-small     12
label-medium   12
title-large     7
body-large      4
title-medium    4
headline-large  1
```

Interpretation:

```
Most components depend on a narrow set of practical roles. Several existing
tokens are either unused or visually too close to be useful as independent
authoring decisions.
```

## Migration Mapping

Proposed hard-cut mapping:

```
display-large   -> hero
headline-large  -> hero
headline-medium -> hero
headline-small  -> title

title-large     -> title
title-medium    -> section
title-small     -> section

body-large      -> body
body-medium     -> body
body-small      -> support

label-large     -> control
label-medium    -> caption
label-small     -> caption
```

Manual review targets:

```
PuTab large currently uses headline-large and may become too heavy if mapped
blindly to hero.

PuButton currently uses label-large/body-large/title-large by size. It should
likely use control for text and em-based icon sizing by component size.

PuTag currently reads raw --sys-typo-label-* size variables. It should migrate
to the same pu-font/control path as other controls.
```

Hard-cut rule:

```
Do not keep backward-compatible typography aliases. After migration, old token
names should not remain in component, story, UnoCSS, or public style authoring
surfaces.
```

## Authoring Rule

```
Use rem-based system typography for cross-component role decisions.
Use em inside component internals when padding, adornment size, or inline icon
size should scale with that component's own text.
Use clamp() only for product/page decisions that genuinely respond to viewport
or container space.
```
