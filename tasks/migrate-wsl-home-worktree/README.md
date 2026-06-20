# Migrate WSL Home Worktree

## Objective & Hypothesis

Move the PartnerUp Design workspace from `/mnt/f/CODING/Project/Anana/Application/design2` to `/home/yyh/development/Anana/design` and align Histoire dev-server startup around the root `dev:ensure` workflow.

## Guardrails Touched

- Preserve the `/mnt/f/.../design2` source workspace.
- Keep current `.git` state and task-local files.
- Reinstall dependencies in the WSL-native target rather than copying `node_modules`.
- Keep `design-web.partner-up` as the stable portless app identity.

## Verification

- Copy completed into `/home/yyh/development/Anana/design`.
- `node_modules` and generated Histoire output were excluded from the copy.
- `.git` state and `tasks/web-spacing-audit/` were preserved.
- `pnpm install --frozen-lockfile`: passed.
- `pnpm --filter @partner-up-dev/design-web run verify`: passed.
- `.vscode/tasks.json` now starts Histoire through root `pnpm run dev:ensure -- --lan --ip 172.29.144.156 --foreground`, so VS Code keeps the Histoire dev-server console attached. The task is a background task whose problem matcher ends on `DEV_ENSURE_FOREGROUND_READY`.
- Old `/mnt/f/.../design2` Histoire/portless processes were stopped before validation.
- `pnpm dev:ensure --lan --ip 172.29.144.156`: passed.
- `pnpm dev:ensure --foreground` foreground mode added.
- `pnpm dev:ensure --lan --ip 172.29.144.156 --foreground` with VS Code-equivalent env kept Histoire logs attached, printed `DEV_ENSURE_FOREGROUND_READY`, and served `https://design-web.partner-up.local/`: HTTP 200.
- Default headless `pnpm dev:ensure --lan --ip 172.29.144.156 --timeout-seconds=120 --poll-interval-seconds=2`: passed and exited after readiness.
- `curl -k -I --max-time 5 https://design-web.partner-up.local/`: HTTP 200.
- Active route during validation: `https://design-web.partner-up.local` -> `localhost:4908`.
- Validation route was stopped afterward; `portless list` reports no active app routes.

## Current Step

Migration and foreground/headless dev-server modes validated. Use `/home/yyh/development/Anana/design` as the WSL-native design-system workspace.
