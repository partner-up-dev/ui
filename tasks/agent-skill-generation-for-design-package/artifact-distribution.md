# Artifact Distribution

## Primary direction: TanStack Intent

TanStack Intent matches this task because the goal is to ship a skill with the
npm package it describes.

Relevant properties:

```
skills live in installed packages
skills version with the npm package
agents load from node_modules
intent install writes lightweight loading guidance to agent config
intent load prints the installed package skill content
intent validate and stale support maintainer checks
```

Candidate consumer flow:

```sh
pnpm add @partner-up-dev/design-web
pnpm dlx @tanstack/intent@latest install
```

Candidate manual load:

```sh
pnpm dlx @tanstack/intent@latest load @partner-up-dev/design-web#design-web
```

Exact skill name is open. Prefer a short package-specific name:

```
design-web
```

## Secondary reference: Vercel skills CLI

Vercel `skills` is useful for Git-repository skill packages and public skill
directories.

It is less aligned with this task because:

```
skill source is a Git repo or path, not the installed npm dependency version
updates are managed by skills update, not npm update
the skill can drift from the installed package version
```

It may still be useful for:

```
publishing a generic design-system authoring skill
installing organization-wide workflow skills
testing generated skills in native agent skill directories
```

## Postinstall decision

Do not add a default npm `postinstall` that mutates user agent configuration.

Reasons:

```
npm lifecycle scripts execute during dependency installation
automatic writes to AGENTS.md, CLAUDE.md, .cursorrules, or agent skill
directories are surprising
security-conscious consumers often disable lifecycle scripts
interactive agent detection is a poor fit for package install
```

Allowed alternatives:

```
document an explicit setup command
provide a package script such as design-web-agent-skill-install
provide a non-mutating command that prints instructions
support TanStack Intent discovery from node_modules
```

## Package.json implications

Expected package additions if TanStack Intent is adopted:

```
keyword: tanstack-intent
files: include skills/
devDependency or CI command: @tanstack/intent
validation command: intent validate
staleness command: intent stale
```

The exact package.json edits should happen during implementation, not in this
planning packet.

