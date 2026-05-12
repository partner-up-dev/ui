# Histoire Role In Verification

Status:

```
Discussion draft on 2026-05-12.
First Histoire slice implemented on 2026-05-12.
```

## Decision

Use Histoire as the component catalog and visual fixture layer for
`packages/web`.

Histoire should own:

```
1. Interactive examples for humans.
2. Canonical variants for visual review.
3. Documentation pages for component usage.
4. Built story output consumed by visual regression tooling.
```

Histoire should feed, but not own:

```
1. Interaction assertions.
2. Keyboard and focus contracts.
3. Accessibility rules.
4. Package export and type contract checks.
5. Publish artifact checks.
```

## Why It Fits

Project fit:

```
packages/web is Vite-based.
components are Vue 3 SFCs.
the package is a UI library and design system.
the current demo app is already becoming too dense as a single surface.
```

Histoire fit:

```
Vite-native story builder
Vue SFC story files
variants for component states
controls for interactive state
markdown docs near stories
responsive preview support
visual regression integration through built story output
```

## Recommended Story Structure

Use category folders outside `src/components`:

```
packages/web/src/stories/actions/PuButton.story.vue
packages/web/src/stories/display/PuCell.story.vue
packages/web/src/stories/forms/PuToggleSwitch.story.vue
packages/web/src/stories/forms/PuWheelPicker.story.vue
packages/web/src/stories/overlay/PuModal.story.vue
```

Reason:

```
The package currently publishes src/components. Keeping stories in src/stories
keeps package contents cleaner while preserving story discoverability.
```

Each story should contain:

```
Story title
Variants for canonical states
Controls for meaningful props
Docs block or sibling markdown
Stable test ids only where semantic selectors are insufficient
```

## First Story Set

Start with components that cover the broadest verification risks:

```
PuButton
+-- visual variants, size, disabled/loading, click event

PuCell
+-- display layout, suffix, border, long text

PuToggleSwitch
+-- v-model, disabled, keyboard toggle

PuWheelPicker
+-- selection, empty state, long labels, disabled options

PuModal
+-- open/close, title, footer/actions, escape/focus behavior
```

## Visual Regression

Use Histoire build output as the screenshot source.

Candidate tools:

```
Lost Pixel
Percy
```

Recommended first implementation:

```
Histoire story:build
Lost Pixel in OSS mode for local and CI baseline checks
```

Reason:

```
Lost Pixel has first-class Histoire mode and can consume a built Histoire book.
It is lighter to start with than a SaaS-only workflow.
```

Current implementation:

```
Histoire 0.17.17
@histoire/plugin-vue 0.17.17
@histoire/controls 0.17.17
```

Reason:

```
0.17.17 supports the package's current Vite 5 line.
```

Current stories:

```
actions/PuButton.story.vue
display/PuCell.story.vue
forms/PuToggleSwitch.story.vue
forms/PuWheelPicker.story.vue
overlay/PuModal.story.vue
```

Current Histoire configuration:

```
groups: actions, display, forms, overlay
responsive presets: Mobile, Tablet, Desktop
background presets: Surface, Container, Dark
setup file imports package styles and story CSS
```

## Limits

Histoire gives strong examples and visual surfaces. It gives weaker evidence for:

```
focus trap correctness
escape handling
roving focus
aria relationships
controlled/uncontrolled edge cases
package installation in a consumer app
```

These should be covered by Playwright, vue-tsc fixtures, and package smoke
checks.

## Source Notes

Official Histoire docs:

```
https://histoire.dev/guide/
https://histoire.dev/guide/vue3/stories.html
https://histoire.dev/guide/vue3/docs
https://histoire.dev/reference/vue3/story.html
https://histoire.dev/examples/visual-regression-testing/lost-pixel
```

Related testing docs:

```
https://playwright.dev/docs/test-components
https://docs.lost-pixel.com/user-docs/setup/project-configuration/modes
```
