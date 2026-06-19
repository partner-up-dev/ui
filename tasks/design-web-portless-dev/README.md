# Design Web Portless Dev

## Goal

Make the web package Histoire dev server available through the PartnerUp
portless naming scheme.

## Decisions

- The design-system web story server uses the app name `design-web.partner-up`.
- The normal local URL is `https://design-web.partner-up.localhost`.
- LAN mode uses portless LAN routing and expects
  `https://design-web.partner-up.local`.
- Non-LAN scripts set `PORTLESS_LAN=0` so a previously-started LAN proxy does
  not silently change the expected `.localhost` route.
- Root scripts own ensure behavior so agents can start or reuse the dev server
  without memorizing package-local commands.

## Verification

- Passed: syntax-check new Node scripts.
- Blocked locally: `pnpm dev:ensure` requests
  `https://design-web.partner-up.localhost`, but the currently running root
  portless proxy is still in LAN mode and rejects non-LAN startup until it is
  restarted outside LAN mode.
- Passed: `pnpm dev:ensure:lan` reports
  `https://design-web.partner-up.local` ready.
- Passed: `curl -k -I https://design-web.partner-up.local/` returns HTTP 200.
