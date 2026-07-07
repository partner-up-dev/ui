# Design Web Portless Homelab DNS

## Objective & Hypothesis

Objective: align the design web Histoire dev-server workflow with the PartnerUp
homelab portless model so the story UI can run as:

- `design-web.partner-up.d.home.arpa`

Hypothesis:

- The root `scripts/ensure-dev-servers.mjs` should keep owning route readiness
  and post-readiness DNS/hosts hooks.
- `scripts/portless.mjs` should remain the thin portless wrapper.
- Homelab-specific values must stay configurable through CLI args or env vars.
- VS Code tasks and launch config should use the same TLD/IP contract as shell
  workflows, but `.vscode/` remains ignored workspace-local configuration.

## Configuration Contract

- `--tld <suffix>` / `PORTLESS_TLD`
- `--dns-provider technitium` / `DEV_DNS_PROVIDER=technitium`
- `--dns-ip <ipv4>` / `DEV_DNS_TARGET_IP`
- `DEV_DNS_ZONE`
- `DEV_DNS_TTL`
- `DEV_DNS_STRICT=1`
- `TECHNITIUM_API_URL`
- `TECHNITIUM_API_TOKEN`
- `DEV_HOSTS_SYNC=1`
- `DEV_HOSTS_IP=127.0.0.1`

Example:

```bash
TECHNITIUM_API_URL=http://<technitium-host>:5380 \
TECHNITIUM_API_TOKEN=<api-token> \
DEV_DNS_PROVIDER=technitium \
DEV_DNS_ZONE=partner-up.d.home.arpa \
PORTLESS_TLD=partner-up.d.home.arpa \
pnpm dev:ensure --lan --ip <reachable-lan-ip>
```

## Implementation Notes

- App identity stays `design-web`; the TLD `partner-up.d.home.arpa` produces
  `design-web.partner-up.d.home.arpa`.
- DNS registration is opt-in and writes only selected ready routes.
- Hosts sync is opt-in and writes the base suffix plus known design dev route
  hosts to the configured hosts file.

## Verification

- `node --check scripts/ensure-dev-servers.mjs`
- `node --check scripts/portless.mjs`
- `node --check tasks/dev-portless-homelab-dns/technitium-dns-smoke.mjs`
- JSON parse checks for `.vscode/tasks.json`, `.vscode/launch.json`, and
  `package.json`
- `pnpm --filter @partner-up-dev/design-web run type-check`
- Task-local Technitium dry-run/apply smoke after `.env` is configured.

## Verification Results

- `node --check scripts/ensure-dev-servers.mjs` passed.
- `node --check scripts/portless.mjs` passed.
- `node --check tasks/dev-portless-homelab-dns/technitium-dns-smoke.mjs`
  passed.
- `package.json`, `packages/web/package.json`, `.vscode/tasks.json`, and
  `.vscode/launch.json` parse as valid JSON.
- Task-local DNS dry-run computed:
  `design-web.partner-up.d.home.arpa -> 172.16.249.14`.
- VS Code DNS env was synchronized from the `mvp-HA` workspace-local VS Code
  config; no task-local `.env` is kept.
- Task-local Technitium apply passed and verified:
  `design-web.partner-up.d.home.arpa -> 172.16.249.14`.
- `pnpm --filter @partner-up-dev/design-web exec vue-tsc --noEmit` passed.
- `pnpm --filter @partner-up-dev/design-web run type-check` is currently
  blocked by an existing generated-file check:
  `Generated file is stale: src/version.ts`.
