# API

NestJS backend for Kartiiing — serves circuit data, race events, weather information, and championship details.

## Tech stack

- **Framework**: NestJS
- **Database**: PostgreSQL via TypeORM
- **Language**: TypeScript

## Scripts

| Command                   | Description                      |
| ------------------------- | -------------------------------- |
| `pnpm dev`                | Start dev server with watch mode |
| `pnpm build`              | Build the NestJS app             |
| `pnpm start`              | Start the server                 |
| `pnpm start:debug`        | Start with debug and watch mode  |
| `pnpm start:prod`         | Start production build           |
| `pnpm lint`               | Run ESLint                       |
| `pnpm typecheck`          | TypeScript type checking         |
| `pnpm test`               | Run unit tests (Jest)            |
| `pnpm test:watch`         | Run tests in watch mode          |
| `pnpm test:cov`           | Run tests with coverage          |
| `pnpm test:e2e`           | Run E2E tests                    |
| `pnpm migration:run`      | Run pending TypeORM migrations   |
| `pnpm migration:generate` | Generate a new migration         |
| `pnpm migration:revert`   | Revert the last migration        |
| `pnpm migration:show`     | Show migration status            |
| `pnpm db:seed`            | Seed the database                |
| `pnpm db:truncate`        | Truncate all database tables     |
| `pnpm db:reset`           | Reset and re-seed the database   |

## Architecture

See [`AGENTS.md`](AGENTS.md) for module architecture conventions and file naming guidelines.
