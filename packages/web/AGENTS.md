# AGENTS.md of PartnerUp Design Web

This package owns the Vue web implementation of the PartnerUp design system.
Root workflow and release policy are owned by `../../AGENTS.md` and
`../../CONTRIBUTING.md`.

## Package Layout

```text
packages/web/
|-- docs/                 # Durable web component and composition contracts
|-- scripts/              # Registry, story coverage, and skill generation tools
|-- skills/design-web/    # Generated agent-facing usage skill
|-- src/
|   |-- components/       # Pu* web components
|   |-- composables/      # Web-only Vue composables
|   |-- stories/          # Histoire stories
|   |-- styles/           # Token, mixin, dcs, and UnoCSS preset sources
|   |-- types/
|   |-- utils/
|   `-- index.ts          # Package entry
|-- types/                # Generated/global component declarations
|-- histoire.config.ts
`-- vite.config.ts
```

## Development Workflow

- Use `pnpm --filter @partner-up-dev/design-web run story:dev` for local component exploration.
- Use `pnpm --filter @partner-up-dev/design-web run generate` after component registry-affecting changes.
- Use `pnpm --filter @partner-up-dev/design-web run skill:generate` after public component docs or seed changes.
- Use `pnpm --filter @partner-up-dev/design-web run verify` before considering broad web package changes complete.
- Build output is `dist/`; it is package output, not source.

## Local Rules

- Keep the `Pu*` public API aligned with UniApp when the platform model allows it.
- Prefer web-native DOM behavior for accessibility, focus, overlays, keyboard interaction, and forms.
- Components should use package tokens and shared utilities before introducing local styling vocabulary.
- Histoire stories are the primary local inspection surface for component variants and states.
- Generated skill references should reflect stable package behavior, not task-local implementation notes.

## Documentation Index

- `README.md`: consumer install and usage.
- `docs/component-contract.md`: component contract guidance.
- `docs/composition-principles.md`: composition guidance for web package consumers.
- `skills/design-web/SKILL.md`: generated agent-facing web design-system skill.
- `skills/design-web/references/component-map.md`: generated component reference index.
- `../../tasks/agent-skill-generation-for-design-package/`: background and records for skill generation work.
- `../../tasks/web-token-rem-rework/`: token and rem migration records.
- `../../tasks/content-presentation-components/`: content component implementation records.
