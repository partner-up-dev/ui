# PartnerUp Design

This is a monorepo of partner-up's design (design system in code, common components) for multiple platform (includes web, uniapp, clutter and more).

## Packages

- `@partner-up/uniapp-design` - Design system for UniApp

## Publishing

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing packages to GitHub Package Registry.

### Creating a Changeset

When you make changes to a package, create a changeset to document the changes:

```bash
pnpm changeset
```

Follow the prompts to:
1. Select which packages have changed
2. Specify the type of change (major, minor, patch)
3. Write a summary of the changes

### Automated Publishing

When changes are pushed to the `main` branch, the GitHub Actions workflow will:
1. Create a "Version Packages" PR if there are changesets
2. When the PR is merged, it will:
   - Update package versions
   - Update changelogs
   - Publish packages to GitHub Package Registry

### Manual Publishing

To manually publish packages (requires appropriate permissions):

```bash
pnpm run release
```

## Installation

To install a published package from GitHub Package Registry, configure your `.npmrc`:

```
@partner-up:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install the package:

```bash
npm install @partner-up/uniapp-design
```
