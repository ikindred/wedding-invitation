/**
 * Single place to resolve the Postgres connection string.
 * Vercel Postgres / templates often expose POSTGRES_PRISMA_URL or POSTGRES_URL;
 * Neon and local dev typically use DATABASE_URL.
 */
export function getDatabaseUrl(): string | undefined {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL;
  return typeof url === "string" && url.trim() !== "" ? url.trim() : undefined;
}
