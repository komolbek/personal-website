// Generated into ../generated/client rather than the default location, so it
// does not collide with the public site's client in node_modules.
import { PrismaClient } from "../generated/client";

const globalForPrisma = globalThis as unknown as {
  hubPrisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.hubPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.hubPrisma = prisma;

export { PrismaClient };
export * from "../generated/client";
