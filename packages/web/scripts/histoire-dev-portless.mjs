import { spawn } from "node:child_process";

const args = ["dev"];

if (process.env.PORT) {
  args.push("--port", process.env.PORT);
}

if (process.env.HOST) {
  args.push("--host", process.env.HOST);
}

const child = spawn("histoire", args, {
  shell: process.platform === "win32",
  stdio: "inherit",
});

child.on("error", (error) => {
  if (error.code === "ENOENT") {
    console.error("histoire is not available. Run pnpm install from the repository root.");
    process.exit(1);
  }

  console.error(`histoire failed to start: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
