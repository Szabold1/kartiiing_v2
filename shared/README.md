# @kartiiing/shared

Shared TypeScript types and utilities used across the monorepo. Types that cross the frontend/backend boundary live here — never duplicate them in `kartiiing/` or `api/`.

## Usage

Import from the package in any workspace:

```typescript
import { ICircuit, IRaceEvent } from '@kartiiing/shared';
```

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm build`     | Compile TypeScript       |
| `pnpm dev`       | Watch mode               |
| `pnpm clean`     | Remove build output      |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm lint`      | Run ESLint               |
