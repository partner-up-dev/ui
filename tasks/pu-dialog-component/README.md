# PuDialog Component

## State

Execute.

## Request

Add a public `PuDialog` component to the web design-system package.

## Scope

- Add `packages/web/src/components/puDialog/`.
- Add Histoire coverage under `packages/web/src/stories/overlay/`.
- Register the component through the package generators.
- Add generated skill reference coverage through `packages/web/skill.seed.json`.

## Design Claims

- `PuDialog` is a composed, opinionated dialog for confirmation and short
  focused workflows.
- It reuses the existing overlay accessibility model from `PuModal`: body
  scroll lock, escape handling, focus return, focus trap, and id generation.
- Fine-grained slots keep the default shell useful while allowing title,
  description, icon, and action customization without replacing the whole
  dialog.

## Verification

- `pnpm --filter @partner-up-dev/design-web run generate`
- `pnpm --filter @partner-up-dev/design-web run skill:generate`
- `pnpm --filter @partner-up-dev/design-web run type-check`
- `pnpm --filter @partner-up-dev/design-web run story:coverage`
- `pnpm --filter @partner-up-dev/design-web run build`
- `pnpm --filter @partner-up-dev/design-web run story:build`
