# Kartiiing Frontend

Next.js web application for Kartiiing — the user-facing platform for browsing race calendars, circuits, race details, and the karting wiki.

## Tech stack

- **Framework**: Next.js (App Router)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **State**: Zustand
- **Maps**: Mapbox GL JS / react-map-gl
- **Animation**: Framer Motion
- **Language**: TypeScript

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm dev`       | Start Next.js dev server |
| `pnpm build`     | Build for production     |
| `pnpm start`     | Start production server  |
| `pnpm lint`      | Run ESLint               |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm test`      | Run unit tests (Vitest)  |
| `pnpm test:ui`   | Run tests with Vitest UI |

## Architecture

See [`AGENTS.md`](AGENTS.md) for component conventions, testing best practices, and coding guidelines.
