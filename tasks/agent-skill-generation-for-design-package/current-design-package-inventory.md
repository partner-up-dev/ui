# Current Design Package Inventory

## Web package

```
packages/web/package.json
  name: @partner-up-dev/design-web
  version: 0.1.0
  framework peer: vue
  style entry: ./dist/style.css
  sass entry: ./src/styles/index.scss
  package scripts:
    generate
    generate:check
    story:dev
    story:build
    story:coverage
    type-check
    build
    verify
```

## Source layout

```text
packages/web/src/
  components/
    puButton/
      puButton.vue
      puButton.ts
      puButton.scss
    ...
  stories/
    actions/
    display/
    forms/
    overlay/
  styles/
  types/
  utils/
  composables/
  component-registry.ts
  index.ts
```

## Public component discovery

Current generated registry:

```
packages/web/src/component-registry.ts
```

Current generated global types:

```
packages/web/types/components.d.ts
```

Generation script:

```
packages/web/scripts/generate-component-registry.mjs
```

The script discovers public `.vue` files under `src/components`, converts
`puExample.vue` to `PuExample`, and writes both registry and global component
types.

## Story coverage

Story files live under:

```
packages/web/src/stories/**/*.story.vue
```

Story coverage script:

```
packages/web/scripts/check-story-coverage.mjs
```

The script compares public registry components to story files and supports
extra coverage markers:

```
@pu-story-covers ComponentName
```

## Component contract source

Primary local contract:

```
packages/web/docs/component-contract.md
```

Consumer-skill-relevant parts:

```
public component naming
variant vocabulary
stable prop names
slot names
event names
controlled and uncontrolled state patterns
accessibility expectations
styling variable and modifier conventions
```

Important caveat:

```
Some existing components predate or diverge from the canonical contract.
Example: PuButton uses legacy `theme`, `type`, and capitalized variant values.
The generated skill should preserve actual consumer APIs and mark such cases as
package-specific caveats.
```

## Package consumer entry points

Main package entry:

```
packages/web/src/index.ts
```

It imports global styles, exports utils/types/composables/component registry, and
provides a Vue plugin `install(app)`.

Candidate consumer guidance:

```
import '@partner-up-dev/design-web/style.css'
import { PuButton } from '@partner-up-dev/design-web'

or install the plugin when app-wide global components are desired.
```

Exact import examples should be verified against the published build output
before entering the generated skill.

