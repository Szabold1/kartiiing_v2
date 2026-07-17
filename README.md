# Kartiiing

Welcome to **Kartiiing**, a platform for karting enthusiasts to explore the world of go-kart racing! Whether you're a beginner or a seasoned racer, Kartiiing provides easy access to championship details, race results, tracks, and general info about the sport.

🚧 This project is still a **work in progress** — feel free to explore and give feedback!

🌐 Check it out live: [kartiiing.com](https://kartiiing.com)

---

## 📋 Features

- **Calendar** — Browse races from current and past years with results
- **Circuits** — Discover karting tracks from around the world with past and future races
- **Race Details** — View detailed race information including results, weather, and fastest laps
- **Wiki** — Learn about karting categories, engine types, championships, and more
- **User Accounts** _(planned)_ — Save favorite events and circuits
- **My Sessions** _(planned)_ — Track personal training and race sessions, including lap times, notes, number of laps, and setup details

---

## Monorepo layout

- `kartiiing/` — Next.js frontend (App Router, Tailwind CSS v4, shadcn/ui components)
- `api/` — NestJS backend (TypeORM + PostgreSQL)
- `shared/` — shared TypeScript types and utilities

## Requirements

- **Node.js ≥ 22**
- **pnpm ≥ 11.0.9** (via Corepack)
- **Docker** (for local PostgreSQL)

## Quick start (local)

```bash
corepack enable
pnpm install
docker compose up -d
```

Create a local env file at `api/.env`:

```
DB_HOST=localhost
DB_PORT=55432
DB_USERNAME=kartiiing_user
DB_PASSWORD=kartiiing_password
DB_NAME=kartiiing_db
```

Run database migrations and seeds:

```bash
pnpm --filter api migration:run
pnpm --filter api db:seed
```

Start dev servers:

```bash
pnpm dev
```

Web runs on http://localhost:3000 and API on http://localhost:3001.

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start all dev servers                         |
| `pnpm build`        | Build all packages and apps                   |
| `pnpm format:check` | Check formatting (Prettier)                   |
| `pnpm format:run`   | Fix formatting                                |
| `pnpm lint`         | Run ESLint across all packages and apps       |
| `pnpm typecheck`    | TypeScript type checking                      |
| `pnpm test`         | Run unit tests (Jest for API, Vitest for web) |
| `pnpm ci:check`     | Run the full CI check locally                 |

## Development

See the following agent guideline files for coding conventions and architecture details:

- [`AGENTS.md`](AGENTS.md) — monorepo-level conventions and commit message format
- [`kartiiing/AGENTS.md`](kartiiing/AGENTS.md) — frontend component conventions and testing best practices
- [`api/AGENTS.md`](api/AGENTS.md) — backend module architecture and file naming

## CI

GitHub Actions runs on every push / PR — format, lint, typecheck, unit tests, and production build.
