import { readFileSync, writeFileSync } from "node:fs";

const routeDefinitions = [{ portlessName: "ui-web" }];

const normalizeEnvValue = (value) => {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const getPortlessTld = () => normalizeEnvValue(process.env.PORTLESS_TLD) ?? "localhost";

const getEffectivePortlessName = (route, domainBase) =>
  domainBase ? `${route.portlessName}.${domainBase}` : route.portlessName;

const getKnownDevHostnames = () => {
  const portlessTld = getPortlessTld();
  const portlessDomainBase = normalizeEnvValue(process.env.PORTLESS_DOMAIN_BASE);
  const baseHostname = portlessDomainBase ? `${portlessDomainBase}.${portlessTld}` : portlessTld;

  return [
    baseHostname,
    ...routeDefinitions.map(
      (route) => `${getEffectivePortlessName(route, portlessDomainBase)}.${portlessTld}`,
    ),
  ];
};

const syncHostsFile = () => {
  const hostsPath = normalizeEnvValue(process.env.DEV_HOSTS_PATH) ?? "/etc/hosts";
  const hostsTargetIp = normalizeEnvValue(process.env.DEV_HOSTS_IP) ?? "127.0.0.1";
  const hostnames = [...new Set(getKnownDevHostnames())];
  const block = [
    "# BEGIN PartnerUp UI web dev hosts",
    ...hostnames.map((hostname) => `${hostsTargetIp} ${hostname}`),
    "# END PartnerUp UI web dev hosts",
  ].join("\n");

  const existingHosts = readFileSync(hostsPath, "utf8");
  const blockPattern =
    /(?:^|\n)# BEGIN PartnerUp (?:design|UI) web dev hosts\n[\s\S]*?\n# END PartnerUp (?:design|UI) web dev hosts/g;
  const nextHosts = blockPattern.test(existingHosts)
    ? existingHosts.replace(blockPattern, `\n${block}`)
    : `${existingHosts.trimEnd()}\n\n${block}\n`;

  writeFileSync(hostsPath, nextHosts.endsWith("\n") ? nextHosts : `${nextHosts}\n`);
  console.log(`Synced ${hostnames.length} PartnerUp UI web dev host entries to ${hostsPath}.`);
};

syncHostsFile();
