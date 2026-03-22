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

Repository: [github.com/ikindred/wedding-invitation](https://github.com/ikindred/wedding-invitation).

Import the project in the [Vercel dashboard](https://vercel.com/new) → **Add New** → **Project** → import `ikindred/wedding-invitation` (after your code is pushed to GitHub).

## 4. Environment variables

In **Project → Settings → Environment Variables**, the app needs **one** Postgres URL. It checks, in order:

1. `DATABASE_URL`
2. `POSTGRES_PRISMA_URL` (often set automatically by **Vercel Postgres**)
3. `POSTGRES_URL`

| Name                   | When to use |
|------------------------|-------------|
| `DATABASE_URL`         | Neon, Supabase, or any manual URL — **recommended** if you paste from Neon’s dashboard. |
| `POSTGRES_PRISMA_URL`  | Usually present if you use the **Vercel Postgres** integration; no extra step after this code change. |
| `POSTGRES_URL`         | Fallback from some Vercel / template setups. |

- Enable **Production** and **Preview** (and **Development** if you use `vercel dev`) so RSVP works on deployed URLs.
- If you only had variables in **Development**, Production deployments will still see “database URL not set” — re-add for **Production**.
- After changing env vars, **Redeploy** (Deployments → … → Redeploy) so serverless functions pick up new values.

## 5. Build command

In **Project → Settings → General → Build & Development Settings**:

- **Build Command:** `npm run vercel:build`
- **Install Command:** `npm install` (default)
- **Output:** Next.js default (no change needed)

`vercel:build` runs `prisma migrate deploy` (applies pending migrations to the database your `DATABASE_URL` points at), then `next build`. `npm install` already runs `postinstall` → `prisma generate`.

**Important:** At least one of the URLs above must be set for the environment that runs the build (usually Production and Preview), or `migrate deploy` will fail. The same URL is used at **runtime** for `/api/rsvp`.

## 6. Runtime

The RSVP API route uses the **Node.js** runtime (`nodejs`) and the `pg` driver adapter — compatible with Vercel’s default Node serverless functions.

## 7. After first deploy

- Open your production URL and submit a test RSVP.
- In Neon/Supabase/your host, confirm a row appears in the `rsvps` table.

## Troubleshooting

- **Too many connections / connection errors:** Use your provider’s **pooled** or **transaction** pooler URL for `DATABASE_URL`, not the direct session URL, when deploying serverless.
- **Migration already applied:** If you applied SQL manually, run `npx prisma migrate resolve` against that database (see Prisma docs) so history matches.
- **Build works but RSVP fails:** Confirm `DATABASE_URL` is set for **Runtime** (same as build for serverless) and that the database allows connections from Vercel’s regions (IP allowlists: allow Vercel or `0.0.0.0/0` per your provider’s guidance).
