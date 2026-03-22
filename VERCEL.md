# Deploying this app on Vercel (with PostgreSQL)

## 1. Create a PostgreSQL database

Use any managed Postgres. Common options:

- **[Neon](https://neon.tech)** — serverless-friendly; use the **pooled** connection string for serverless (recommended for `DATABASE_URL` on Vercel).
- **[Supabase](https://supabase.com)** — use the **connection pooling** URI when available.
- **Vercel Postgres** (if available on your plan) — follow Vercel’s docs to create the DB and copy the connection string.

You need a single URL Prisma can use: `postgresql://...` (often with `?sslmode=require`).

## 2. Apply migrations locally (optional check)

With `DATABASE_URL` pointing at your **dev** database:

```bash
npx prisma migrate deploy
```

That runs the SQL in `prisma/migrations/` and creates the `rsvps` table. You can also use `npx prisma migrate dev` during development.

## 3. Connect the Git repo to Vercel

Import the project in the [Vercel dashboard](https://vercel.com/new) and select this repository.

## 4. Environment variables

In **Project → Settings → Environment Variables**, add:

| Name            | Value                                      | Environments        |
|-----------------|--------------------------------------------|---------------------|
| `DATABASE_URL`  | Your Postgres URL (pooled URL if offered) | Production, Preview |

- Use the **same** database for Preview and Production only if you intend to; otherwise create a separate DB for previews and add a Preview-specific `DATABASE_URL`.
- `postinstall` already runs `prisma generate`; `vercel:build` runs `prisma generate` again before `next build` so the client always matches the schema on CI.

## 5. Build command

In **Project → Settings → General → Build & Development Settings**:

- **Build Command:** `npm run vercel:build`
- **Install Command:** `npm install` (default)
- **Output:** Next.js default (no change needed)

`vercel:build` runs `prisma migrate deploy` (applies pending migrations to the database your `DATABASE_URL` points at), then `next build`. `npm install` already runs `postinstall` → `prisma generate`.

**Important:** `DATABASE_URL` must be set for the environment that runs the build (usually Production and Preview), or `migrate deploy` will fail.

## 6. Runtime

The RSVP API route uses the **Node.js** runtime (`nodejs`) and the `pg` driver adapter — compatible with Vercel’s default Node serverless functions.

## 7. After first deploy

- Open your production URL and submit a test RSVP.
- In Neon/Supabase/your host, confirm a row appears in the `rsvps` table.

## Troubleshooting

- **Too many connections / connection errors:** Use your provider’s **pooled** or **transaction** pooler URL for `DATABASE_URL`, not the direct session URL, when deploying serverless.
- **Migration already applied:** If you applied SQL manually, run `npx prisma migrate resolve` against that database (see Prisma docs) so history matches.
- **Build works but RSVP fails:** Confirm `DATABASE_URL` is set for **Runtime** (same as build for serverless) and that the database allows connections from Vercel’s regions (IP allowlists: allow Vercel or `0.0.0.0/0` per your provider’s guidance).
