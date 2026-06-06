# References

## Local evidence

```text
packages/web/package.json
  Package entry points, exports, scripts, peer dependencies, and package name.

packages/web/src/index.ts
  Web package exports, style import, and Vue plugin install function.

packages/web/src/component-registry.ts
  Generated public component registry.

packages/web/types/components.d.ts
  Generated global component declarations.

packages/web/scripts/generate-component-registry.mjs
  Public component discovery and generated output logic.

packages/web/scripts/check-story-coverage.mjs
  Story coverage logic and @pu-story-covers marker support.

packages/web/docs/component-contract.md
  Package-level component naming, variant, props, slots, events, accessibility,
  and styling contract.

tasks/content-presentation-components/
  Existing multi-file task packet structure and infrastructure notes.

tasks/file-upload-component/
  Existing compact task packet structure.
```

## External evidence

TanStack Intent:

```
https://tanstack.com/intent/latest
https://tanstack.com/intent/latest/docs/getting-started/quick-start-consumers
https://tanstack.com/intent/latest/docs/getting-started/quick-start-maintainers
https://tanstack.com/intent/latest/docs/cli/intent-load
https://tanstack.com/blog/from-docs-to-agents
```

Vercel skills ecosystem:

```
https://vercel.com/docs/agent-resources/skills
https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context
https://vercel.com/kb/guide/tanstack-intent-vs-skills
https://skills.sh/docs/cli
https://github.com/vercel-labs/skills
```

Supply-chain and install-script context:

```
https://docs.npmjs.com/cli/v11/commands/npm-install/
https://tanstack.com/blog/npm-supply-chain-compromise-postmortem
```

## Working conclusions from external evidence

```
TanStack Intent is the better primary path for skills shipped inside npm
packages because discovery happens from installed dependencies and skill content
versions with the package.

Vercel skills CLI is better for Git-hosted skill packages and broad ecosystem
installation, but it does not naturally bind the skill to the installed package
version.

Default postinstall mutation is not recommended because npm lifecycle scripts
execute during dependency installation and can surprise or violate downstream
consumer security expectations.
```

