import { database, defineRailway, github, postgres, preserve, project, service, volume } from "railway/iac";

export default defineRailway(() => {
  const personalWebsite = github("komolbek/personal-website", { checkSuites: false, rootDirectory: "/" });

  const Postgres4uD0 = postgres("Postgres-4uD0", { region: "us-west2" });
  // Pinned: this database runs 17.x. The postgres() helper defaults to
  // postgres:18, which would be a major version upgrade of live data.
  const Postgres = database("Postgres", "postgres", { image: "postgres:17", region: "us-west2" });
  const postgresVolume = volume("postgres-volume", { alerts: { usage: { "100": {}, "80": {}, "95": {} } }, allowOnlineResize: true, region: "us-west2", sizeMB: 5000 });
  const postgresVolumeV8bM = volume("postgres-volume-v8bM", { alerts: { usage: { "100": {}, "80": {}, "95": {} } }, allowOnlineResize: true, region: "us-west2", sizeMB: 50000 });
  const Necto = service("Necto", {
    source: personalWebsite,
    build: { buildEnvironment: "V3", builder: "DOCKERFILE", dockerfilePath: "/apps/web/Dockerfile", watchPatterns: ["apps/web/**", "packages/db/**", "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "turbo.json"] },
    replicas: { "us-west2": 1 },
    deploy: { sleepApplication: true },
    domains: ["necto.uz"],
    networking: { privateNetworkEndpoint: "necto" },
    env: { DATABASE_URL: preserve(), HUB_INTAKE_SECRET: preserve(), HUB_INTAKE_URL: preserve(), NEXT_PUBLIC_SITE_URL: preserve(), TELEGRAM_ADMIN_CHAT_ID: preserve(), TELEGRAM_BOT_TOKEN: preserve() },
  });
  const NectoAdmin = service("Necto Admin", {
    source: personalWebsite,
    build: { buildEnvironment: "V3", builder: "DOCKERFILE", dockerfilePath: "/apps/admin/Dockerfile", watchPatterns: ["apps/admin/**", "packages/db/**", "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "turbo.json"] },
    replicas: { "us-west2": 1 },
    deploy: { sleepApplication: true },
    domains: ["admin.necto.uz"],
    networking: { privateNetworkEndpoint: "necto-admin" },
    env: { ADMIN_SECRET: preserve(), DATABASE_URL: preserve(), NEXT_PUBLIC_SITE_URL: preserve() },
  });
  const NectoHub = service("Necto Hub", {
    source: personalWebsite,
    build: { buildEnvironment: "V3", builder: "DOCKERFILE", dockerfilePath: "/apps/hub/Dockerfile", watchPatterns: ["apps/hub/**", "packages/db-hub/**", "packages/db/**", "package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "turbo.json"] },
    replicas: { "us-west2": 1 },
    deploy: { sleepApplication: true },
    domains: ["hub.necto.uz"],
    networking: { privateNetworkEndpoint: "personal-website" },
    env: { HUB_ADMIN_SECRET: preserve(), HUB_DATABASE_URL: preserve(), HUB_INTAKE_SECRET: preserve(), NEXT_PUBLIC_SITE_URL: preserve(), NODE_ENV: preserve() },
  });

  return project("Necto", {
    resources: [Postgres4uD0, Postgres, Necto, NectoAdmin, NectoHub, postgresVolume, postgresVolumeV8bM],
  });
});
