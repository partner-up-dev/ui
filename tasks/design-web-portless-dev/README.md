# Design Web Portless Dev

## Goal

Make the web package Histoire dev server available through the PartnerUp
portless naming scheme.

## Decisions

- The design-system web story server uses the app name `design-web`.
- The normal local URL is `https://design-web.localhost`.
- LAN mode uses portless LAN routing and expects `https://design-web.local`
  unless an explicit TLD is provided.
- Homelab mode uses `PORTLESS_TLD=partner-up.d.home.arpa`, producing
  `https://design-web.partner-up.d.home.arpa`.
- Technitium DNS registration and WSL hosts sync are opt-in through
  `DEV_DNS_PROVIDER=technitium` and `DEV_HOSTS_SYNC=1`.
- Non-LAN scripts set `PORTLESS_LAN=0` so a previously-started LAN proxy does
  not silently change the expected `.localhost` route.
- Root scripts own ensure behavior so agents can start or reuse the dev server
  without memorizing package-local commands.
- `pnpm dev:ensure --foreground` keeps the same route contract while attaching
  Histoire output to the current terminal for human/VS Code workflows. It prints
  `DEV_ENSURE_FOREGROUND_READY` after HTTP readiness so VS Code background task
  problem matchers can release `preLaunchTask` while Histoire keeps running.

## Verification

Historical verification before the homelab TLD update:

- Passed: syntax-check new Node scripts.
- Passed: `pnpm dev:ensure:lan` reports
  `https://design-web.partner-up.local` ready.
- Passed: `curl -k -I https://design-web.partner-up.local/` returns HTTP 200.
- Passed: `pnpm dev:ensure --lan --ip 172.29.144.156 --foreground` keeps
  Histoire output attached, prints `DEV_ENSURE_FOREGROUND_READY`, and serves
  `https://design-web.partner-up.local/`.
- Passed: default headless
  `pnpm dev:ensure --lan --ip 172.29.144.156 --timeout-seconds=120 --poll-interval-seconds=2`
  exits after readiness.

## Homelab Update

- `scripts/ensure-dev-servers.mjs` now honors `--tld` / `PORTLESS_TLD` before
  LAN `.local` fallback.
- DNS registration writes selected ready routes only after HTTP readiness.
- Foreground mode runs DNS and hosts hooks before printing
  `DEV_ENSURE_FOREGROUND_READY`.
