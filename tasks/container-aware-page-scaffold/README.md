# Container-Aware PageScaffold Task Packet

Purpose:

```
Trial container-query driven component behavior in packages/web.
Use PuPageScaffold as the first boundary because it owns page geometry,
aside collapse policy, sticky aside behavior, and content-width composition.
```

Status:

```
Implemented as a first slice on 2026-06-06.
Awaiting visual review.
```

Confirmed decisions:

```
1. Treat container queries as a component implementation tool, not a design
   token feature.

2. Use PuPageScaffold as the first trial surface. PageScaffold has enough
   layout ownership to justify a named query boundary.

3. Preserve token roles. Keep breakpoints local to component behavior until a
   repeated shared threshold proves it should become a named policy.

4. Prefer container width over viewport width for PageScaffold aside collapse.
   A narrow embedded scaffold should behave like a narrow page even inside a
   wide browser viewport.

5. Use PuPageHeader as the first nested consumer. It owns header wrapping and
   action placement, so it should respond to its own available inline size.
```

Implementation record:

```
packages/web/src/components/puPageScaffold/puPageScaffold.scss
  - adds named inline-size container `pu-page` on the scaffold root
  - adds named inline-size container `pu-page-content` on header/main/footer
  - changes aside collapse from viewport media query to `@container pu-page`

packages/web/src/components/puPageHeader/puPageHeader.scss
  - adds named inline-size container `pu-page-header`
  - changes header wrapping from viewport media query to
    `@container pu-page-header`

packages/web/src/stories/layout/PuPageScaffold.story.vue
  - adds a Narrow Container variant to prove scaffold behavior responds to
    parent width, not browser viewport width
```

Verification:

```
pnpm --filter @partner-up-dev/design-web run build
  passed

pnpm --filter @partner-up-dev/design-web run type-check
  passed after regenerating current generated skill references

pnpm --filter @partner-up-dev/design-web run story:build
  passed
  note: existing story build warning remains:
        "Group layout not found for story ... PuPageScaffold.story.vue"

pnpm --filter @partner-up-dev/design-web run story:coverage
  passed
  covered: 38/39 public components
  missing backlog: PuScrollView
```

Follow-up risks:

```
1. Visual review is still needed for sticky aside and header wrapping inside
   nested layout contexts.

2. `container-type: inline-size` creates containment behavior. The current
   slice uses it only on layout boundaries that already own width, but future
   use should avoid arbitrary leaf components.

3. `cqw` and `clamp()` remain candidates for component-local sizing when a
   component needs fluid internals. This trial did not introduce them because
   PageScaffold needed a discrete layout policy first.
```
