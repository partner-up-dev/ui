# Migration Plan

Status:

```
Implemented on 2026-06-06.
This plan records the hard-cut migration sequence used for packages/web.
```

## Scope

Primary files:

```
packages/web/src/styles/_ref.scss
packages/web/src/styles/_sys.scss
packages/web/src/styles/_mixins.scss
packages/web/src/styles/unocss-preset.ts
packages/web/src/components/**/*.scss
packages/web/src/components/**/*.vue
packages/web/src/stories/**/*.vue
packages/web/src/stories/story.css
```

Likely affected concerns:

```
typography tokens
spacing tokens
control size tokens
iconfont sizing
UnoCSS utilities
component-local --pu-* variables
story-only hard-coded typography examples
```

## One-Shot Sequence

1. Token source update

```
Replace old typography ramp in _ref.scss with the new roles.
Convert typography size values to rem and line-height values to unitless.
Convert spacing to rem.
Convert UI-scale radius values to rem while keeping pill at 999px.
Audit --sys-size-* usage and remove the generic scale unless shared semantics
remain after icon-size is removed.
Remove public icon-size dependence from the core authoring model.
```

2. System layer update

```
Ensure _sys.scss emits the new typography names and mobile overrides only where
they still express real semantic differences.
Remove or rewrite mobile overrides that recreate old token clutter.
```

3. Mixin update

```
Keep pu-font($key) but point it to new token names.
Remove direct icon-size mixin dependence or refactor pu-icon() to be typography
and em friendly.
```

4. Component migration

```
Replace old pu-font names with the new typography roles.
Replace --sys-spacing-xxsmall with --sys-spacing-xsmall.
Replace raw --sys-typo-label-* reads with pu-font(control/caption).
Remove old typography token names instead of aliasing them.
Review iconfont spans and use em-based font sizing where needed.
```

5. UnoCSS migration

```
Change theme/rules/shortcuts to output CSS variable references.
Avoid duplicated hard-coded color, spacing, size, radius, shadow, and font values
where a --sys-* custom property exists.
```

6. Cleanup

```
Remove dead typography variables and old docs/examples.
Search for old token names and fail the migration if any remain outside explicit
historical notes inside this task packet.
```

## Known Existing Issues To Resolve

```
--sys-spacing-xxsmall is used but not defined.

unocss-preset.ts duplicates SCSS token values and can drift.

Some components read --sys-typo-label-* directly instead of using pu-font().

icon-size and icon-font-size exist as separate tokens even though most icon usage
is iconfont spans.
```

## API Compatibility Notes

```
Numeric width/height props currently usually serialize to px. This task should
not silently change that runtime contract.

Changing token values from px to rem changes CSS custom property values but not
Vue prop value semantics.

No design-token backward compatibility is required because the package has not
been published.
```
