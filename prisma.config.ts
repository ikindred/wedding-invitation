import "dotenv/config";
import { defineConfig } from "prisma/config";
import { getDatabaseUrl } from "./src/lib/database-url";

/**
 * Prisma CLI reads `.env` via dotenv above. Same URL resolution as runtime (`getDatabaseUrl`).
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDatabaseUrl() ?? "",
  },
});
