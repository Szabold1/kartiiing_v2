# Agent Guidelines — kartiiing API (Backend)

This document captures shared conventions for writing reliable, maintainable code in the `api` (NestJS) package. AI agents and contributors should follow these rules when generating or modifying code.

---

## Code Style & Formatting

### TypeScript — No `any`

Never use `any` as a type. Use `unknown` when the type is genuinely unknown, then narrow it. Use proper generics or defined interfaces everywhere else.

```typescript
// ❌ Bad
function process(data: any) { ... }

// ✅ Good
function process(data: unknown) {
  if (typeof data === "string") { ... }
}
```

### Formatting

All code is formatted with Prettier. Config: `singleQuote: true`, `trailingComma: "all"` (see `.prettierrc`). Do not add `// eslint-disable` or `// prettier-ignore` comments to silence rules — if a rule is genuinely wrong for this project, disable it in `eslint.config.mjs` with a comment explaining why.

---

## Module Architecture

Every domain module (e.g., `circuits/`, `race-events/`) follows a strict layered structure. Each layer has a single responsibility.

```
circuits/
  circuits.controller.ts     ← HTTP handling, delegates to service
  circuits.service.ts        ← business logic
  circuits.persistence.ts    ← database queries (TypeORM)
  circuit.resource.ts        ← entity → shared DTO transformation
  dtos.ts                    ← request validation (query/body DTOs)
  circuits.module.ts         ← NestJS dependency injection wiring
  circuits.controller.spec.ts
  circuits.service.spec.ts
```

### Layer Responsibilities

| Layer           | Responsibility                                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Controller**  | Receives HTTP requests, validates input via DTOs, delegates to service, returns HTTP responses. No business logic.                     |
| **Service**     | Contains all business logic. Orchestrates persistence calls, applies domain rules. Decorated with `@Injectable()`.                     |
| **Persistence** | All TypeORM query logic. Creates query builders, applies filters, executes queries. No business logic. Decorated with `@Injectable()`. |
| **Resource**    | Pure functions that transform database entities into shared response types (e.g., `toICircuit(entity): ICircuit`). No side effects.    |
| **DTOs**        | Request validation schemas using `class-validator` decorators. Defines the shape of incoming data.                                     |
| **Module**      | Registers the controller, service, and persistence with NestJS dependency injection.                                                   |

### Dependency Injection

Services and persistence classes use `@Injectable()` with constructor injection:

```typescript
@Injectable()
export class CircuitsService {
  constructor(private readonly persistence: CircuitsPersistence) {}
}
```

## File Naming

- **Services**: `*.service.ts` (e.g., `circuits.service.ts`)
- **Controllers**: `*.controller.ts` (e.g., `circuits.controller.ts`)
- **Persistence**: `*.persistence.ts` (e.g., `circuits.persistence.ts`)
- **Resources**: `*.resource.ts` (e.g., `circuit.resource.ts`)
- **DTOs**: `dtos.ts` per module
- **Modules**: `*.module.ts` (e.g., `circuits.module.ts`)
- **Entities**: PascalCase in `entities/` directory (e.g., `circuit.entity.ts`)
- **Tests**: `*.spec.ts` next to what they test (e.g., `circuits.service.spec.ts`)
