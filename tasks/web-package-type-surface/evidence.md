# Evidence

## Registry Package

Checked package:

```text
@partner-up-dev/design-web@0.3.0
registry: https://npm.pkg.github.com
```

Observed package facts:

```text
package.json version: 0.3.0
package/dist/index.js: present
package/dist/index.d.ts: present
package/dist/index.ts: absent
package/types/components.d.ts: present
package/src/components/puButton/puButton.vue: present
package/src/types/index.ts: absent
package/src/composables/index.ts: absent
package/dist/types/index.d.ts: present
package/dist/composables/index.d.ts: present
```

Observed defects:

- `dist/index.js` contains runtime `version = "0.1.0"`.
- `dist/index.d.ts` declares `version = "0.1.0"`.
- `dist/index.d.ts` exports `export type * from '../types/components'`.
- `types/components.d.ts` declares Vue `GlobalComponents` using
  `../src/components/.../*.vue`.
- `package.json` exports `./components/*` to `./src/components/*`.
- Published `src/components` imports depend on `../../types` and
  `../../composables`, but `src/types` and `src/composables` are not published.

## Consumer Reproduction

Packed-package consumer checks against `0.3.0` fail.

Root import with strict declaration checking:

```text
import '@partner-up-dev/design-web'
```

Failure:

```text
types/components.d.ts: Cannot find module '../src/components/.../*.vue'
```

Component subpath type import:

```text
import type { PuButtonFeedback } from
  '@partner-up-dev/design-web/components/puButton/puButton'
```

Failure:

```text
TS2307: Cannot find module
'@partner-up-dev/design-web/components/puButton/puButton'
or its corresponding type declarations.
```

Root component value import still preserves component props in common
`skipLibCheck: true` consumer setups:

```text
import { PuButton } from '@partner-up-dev/design-web'
```

`InstanceType<typeof PuButton>['$props']` rejects invalid `size` values, so the
root component value declaration chain is partially useful. The package-level
type surface is still broken because declaration dependencies and component
type exports are not stable.

## Local Repository Evidence

Current local source has the same structural risks:

```text
packages/web/src/index.ts
+-- export type * from '../types/components'
+-- export const version = '0.1.0'

packages/web/types/components.d.ts
+-- GlobalComponents entries import ../src/components/.../*.vue

packages/web/package.json
+-- "./components/*": "./src/components/*"
+-- files include src/components, src/styles, src/utils, types
+-- files do not include src/types or src/composables
```

## Ecosystem Evidence

Checked current npm package tarballs:

```text
vuetify@4.1.1
primevue@4.5.5
element-plus@2.14.2
naive-ui@2.44.1
```

Findings:

- Vuetify publishes `dist/` and `lib/`; component subpaths resolve to
  `lib/components/*/index.js` with matching declarations nearby.
- PrimeVue publishes per-component package folders such as
  `button/index.mjs` and `button/index.d.ts`; `exports["./*"]` includes a
  `types` target.
- Element Plus publishes `es/` and `lib/`; `exports` maps subpaths to built
  entries and explicit declarations. Its `global.d.ts` references package root
  public exports such as `typeof import('element-plus')['ElButton']`.
- Naive UI publishes `es/` and `lib/`; `volar.d.ts` references package root
  public exports such as `(typeof import('naive-ui'))['NButton']`.

No checked package uses a public global component declaration that points at
unpublished raw `src/**/*.vue` files.

## Prior Local Decision

`tasks/content-presentation-components/infrastructure/export-generation.md`
kept `./components/* -> ./src/components/*` as a short-term compromise and
explicitly deferred stable per-component subpaths until consumers needed them.

Consumer pressure now exists, so the deferred release-surface work should be
promoted into implementation.
