# Verification Matrix

## Generated Drift

Commands:

```text
pnpm --filter @partner-up-dev/design-web run generate:check
pnpm --filter @partner-up-dev/design-web run skill:generate:check
```

Purpose:

```text
Registry, global component declarations, and generated Agent Skill artifacts
must be in sync with source inputs.
```

## Package Type Check

Commands:

```text
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run build
```

Purpose:

```text
The web package still type-checks and emits runtime plus declaration artifacts.
```

## Packed Consumer Check

Command:

```text
pnpm --filter @partner-up-dev/design-web run check:packed-types
```

If this script does not exist yet, implement it as part of the fix.

Minimum temporary consumer compiler settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": false,
    "jsx": "preserve"
  }
}
```

Minimum root import case:

```ts
import '@partner-up-dev/design-web'
import { PuButton, type PuButtonFeedback } from '@partner-up-dev/design-web'
import type { GlobalComponents } from 'vue'

type ButtonProps = InstanceType<typeof PuButton>['$props']
type ButtonGlobal = GlobalComponents['PuButton']

const feedback: PuButtonFeedback = 'idle'
const props: ButtonProps = { size: 'md' }
void feedback
void props
```

Minimum negative case:

```ts
import { PuButton } from '@partner-up-dev/design-web'

type ButtonProps = InstanceType<typeof PuButton>['$props']
const props: ButtonProps = { size: 'xxl' }
void props
```

Expected:

```text
Compiler rejects the invalid size value.
```

If public component subpaths are supported, add:

```ts
import PuButton, {
  type PuButtonFeedback
} from '@partner-up-dev/design-web/components/PuButton'

const feedback: PuButtonFeedback = 'idle'
void PuButton
void feedback
```

## Package Contents

Check:

```text
npm pack --dry-run --json
```

Expected:

- No public export points at an unpublished file.
- Public declarations do not reference missing files.
- `src/components` is absent unless intentionally published with its full
  dependency closure.
- `src/styles` remains only if Sass source entry stays public.

## Skill Coverage

Commands:

```text
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run skill:validate
```

Expected:

- `packages/web/skills/design-web/references/type-support.md` exists.
- `SKILL.md` points agents to type-support guidance when import/type support is
  relevant.
- `references/usage-rules.md` states the public type import rules.

## Full Package Verify

Command:

```text
pnpm --filter @partner-up-dev/design-web run verify
```

Purpose:

```text
Run the existing package gate after focused packed-package checks pass.
```
