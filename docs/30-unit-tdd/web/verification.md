# Web Verification

This document owns durable verification constraints for
`@partner-up-dev/ui-web`.

## Histoire

Histoire is the primary local inspection surface for component variants and
states. Story files live under `packages/web/src/stories/` and are not package
runtime source.

Run Histoire checks from the repository root:

```powershell
pnpm --filter @partner-up-dev/ui-web run story:coverage
pnpm --filter @partner-up-dev/ui-web run story:build
```

Use `story:dev` for local visual and interaction inspection:

```powershell
pnpm --filter @partner-up-dev/ui-web run story:dev
```

## Color Scheme In Stories

The web package token layer switches runtime color tokens through
`html[data-theme="light"]`, `html[data-theme="dark"]`, and the browser
`prefers-color-scheme` media query.

Histoire 1.0 story sandbox switches its own dark mode by adding or removing the
`dark` class on the sandbox document element. It does not write
`data-theme`.

The story setup bridge in `packages/web/src/stories/histoire.setup.ts` must keep
these two systems aligned:

```
Histoire sandbox html.dark
-> packages/web setTheme("dark")
-> html[data-theme="dark"]
-> --sys-* color variables resolve to dark tokens
```

When Histoire removes the `dark` class, the bridge should set the story sandbox
theme to `light`. This is intentional for Histoire because
`packages/web/histoire.config.ts` defaults the Histoire color scheme to light;
without an explicit light theme, an operating system dark preference can
override the story tokens through `prefers-color-scheme`.

Verification for changes touching Histoire setup, token theme behavior, or
story rendering should include a runtime smoke check:

1. Start `story:dev`.
2. Open any committed story variant.
3. Toggle Histoire dark mode from the toolbar or keyboard shortcut.
4. Confirm the story iframe document element has matching `data-theme`:
   `dark` when Histoire applies `html.dark`, and `light` when it removes it.
5. Confirm a token variable such as `--sys-color-surface` changes between the
   light and dark token values.

If Histoire `theme.darkClass` is customized in the future, update the bridge and
this document together.
