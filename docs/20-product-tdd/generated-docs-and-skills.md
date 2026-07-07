# Generated Docs And Skills

Generated output is not durable source.

## Web Skill

The generated web skill lives under:

```text
packages/web/skills/ui-web/
```

Source inputs:

```text
packages/web/skill.seed.json
packages/web/src/component-registry.ts
packages/web/src/stories/
docs/30-unit-tdd/web/composition-principles.md
```

Regeneration command:

```powershell
pnpm --filter @partner-up-dev/ui-web run skill:generate
```

Check command:

```powershell
pnpm --filter @partner-up-dev/ui-web run skill:generate:check
```

## Source Ownership

The generator reads the SVC Unit TDD source directly. Do not recreate
package-local docs under `packages/web/docs/`.
