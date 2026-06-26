# Agent Guidelines — kartiiing Frontend

This document captures shared conventions for writing reliable, maintainable code and tests in the `kartiiing` (Next.js) package. AI agents and contributors should follow these rules when generating or modifying code.

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

All code is formatted with Prettier (via ESLint). Do not add `// eslint-disable` or `// prettier-ignore` comments to silence rules — if a rule is genuinely wrong for this project, disable it in `eslint.config.mjs` with a comment explaining why.

---

## Component Conventions

### Use `cn()` for Conditional Classes

Never concatenate Tailwind classes with template literals. Use the `cn()` utility from `@/lib/utils/classNameUtils`.

```typescript
// ❌ Bad
className={`flex ${isActive ? "bg-blue-500" : "bg-gray-200"}`}

// ✅ Good
className={cn("flex", isActive ? "bg-blue-500" : "bg-gray-200")}
```

### Prefer Named Exports for Components

Always use named exports for components, not default exports. This makes refactoring and auto-import more reliable.

```typescript
// ❌ Bad
export default function CircuitCard() { ... }

// ✅ Good
export function CircuitCard() { ... }
```

### Keep Components Focused

If a component handles more than one concern, extract sub-components, hooks, or utility functions. A single component should have one clear responsibility.

### Use `type` for Component Props

Always use `type` for component props, not `interface`. This keeps props declarations consistent across the codebase.

```typescript
// ❌ Bad
interface Props {
  description: string;
  selectedYear: number;
}

// ✅ Good
type Props = {
  description: string;
  selectedYear: number;
};
```

---

## Zustand Stores

Stores live in `lib/stores/` and follow the `useXStore` naming pattern:

```
lib/stores/
  circuitsStore.ts   → useCircuitsStore
  calendarStore.ts   → useCalendarStore
```

- Export the hook as a named export
- Keep selectors typed
- Mock stores at the module boundary in tests with `vi.mock`

---

## API Client Pattern

API modules live in `lib/api/` and follow a consistent pattern: named async functions that build a URL with `getApiBase()`, use `URLSearchParams` for query parameters, call `fetch`, and return typed JSON responses.

```
lib/api/
  base.ts         ← getApiBase() helper
  circuits.ts     ← circuit-specific endpoints
  race-events.ts  ← race event endpoints
  index.ts        ← re-exports
```

```typescript
// ✅ Good — follows the established pattern
export async function getCircuits(options?: {
  page?: number;
  limit?: number;
}): Promise<IPaginatedResponse<ICircuit>> {
  const params = new URLSearchParams();
  if (options?.page) params.set("page", options.page.toString());

  const url = `${getApiBase()}/circuits?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: MS_DAY } });

  if (!res.ok) {
    throw new Error(`Failed to fetch circuits: ${res.status}`);
  }

  return res.json();
}
```

## Testing Best Practices

### Use Constants & Enums

Never hardcode values that are defined as constants or enums in the application code. Tests should use the same source of truth.

```typescript
// ❌ Bad — fragile, no type checking
viewMode: "grid";
expect(setViewMode).toHaveBeenCalledWith("list");

// ✅ Good — compile-time safety, single source of truth
import { CircuitsViewMode } from "@/lib/constants/circuits";
viewMode: CircuitsViewMode.GRID;
expect(setViewMode).toHaveBeenCalledWith(CircuitsViewMode.LIST);
```

If a value changes in the enum, tests that use the enum will fail at compile time or give a clear signal — tests using raw strings may silently pass with outdated values.

### Extract Repeated Values Into Constants

If a value is reused across multiple tests in the same file, define it once at the top of the file rather than repeating it.

```typescript
// ❌ Bad — repeated inline, easy to mistype, hard to update
render(<GridViewToggle options={[{ value: "grid", ... }, { value: "list", ... }]} />)

// ✅ Good — single definition, reused everywhere
const OPTIONS = [
  { value: "grid", icon: <Grid />, label: "Grid view" },
  { value: "list", icon: <List />, label: "List view" },
];

render(<GridViewToggle options={OPTIONS} />)
```

This applies to button labels, option arrays, mock data shapes, and any string that appears more than once.

### Test Files in `__tests__/` Folders

Place test files in a `__tests__/` folder next to the component or module they test. Use the `.test.tsx` suffix.

```
components/
  calendar/
    CalendarHeader.tsx
    __tests__/
      CalendarHeader.test.tsx   ✅
  circuit/
    FastestLapsList.tsx
    __tests__/
      FastestLapsList.test.tsx  ✅
```

Global test setup lives in `vitest.setup.ts`. Shared test fixtures live in `test/fixtures.ts`.

### Prefer `getByRole` for Queries

Use accessibility role queries as the default way to find elements. They reflect how users actually interact with the page and encourage accessible markup.

```typescript
// ❌ Bad — brittle, tied to implementation details
screen.getByTestId("map-button");

// ✅ Good — tests the accessible interface
screen.getByRole("button", { name: "Open map view" });
```

### Use `queryByRole` + `.not.toBeInTheDocument()` for Absence

When asserting that something is **not** rendered, use `queryByRole` (returns `null` if missing) rather than `getByRole` (throws if missing).

```typescript
// ❌ Bad — will throw if element is missing, obscuring the assertion
expect(
  screen.getByRole("button", { name: "Close map" }),
).not.toBeInTheDocument();

// ✅ Good — clear intent, no exception swallowing
expect(
  screen.queryByRole("button", { name: "Close map" }),
).not.toBeInTheDocument();
```

### Mock at the Module Boundary with `vi.mock`

Replace external dependencies (stores, API clients, child components) at the import boundary rather than passing spies through props.

```typescript
vi.mock("@/lib/stores/circuitsStore", () => ({
  useCircuitsStore: vi.fn(),
}));

// Control the return value in beforeEach or per-test
vi.mocked(circuitsStore.useCircuitsStore).mockReturnValue({
  viewMode: CircuitsViewMode.GRID,
  setViewMode: vi.fn(),
});
```

### Use `userEvent.setup()` for Interactions

Simulate clicks, typing, and other interactions through `@testing-library/user-event` rather than directly calling event handlers or using `fireEvent`.

```typescript
const user = userEvent.setup();

// ✅ Reflects real user behavior (focus, keyboard, sequencing)
await user.click(screen.getByRole("button", { name: "Open map view" }));
await user.type(screen.getByRole("textbox"), "query");
```

Always mark interaction tests as `async` and `await` the interaction.

### One Behavior Per Test

Each `it` block should verify a single observable behavior. If a test has multiple `expect` calls testing unrelated things, split it.

```typescript
// ❌ Bad — tests rendering AND interaction in one test
it("renders and toggles modal", () => { ... })

// ✅ Good — separate concerns
it("renders the MapButton", () => { ... })
it("opens the map modal when MapButton is clicked", () => { ... })
```

### Use `beforeEach` for Shared Setup

If every test in a suite needs the same mock configuration, put it in `beforeEach` so each test starts from a clean state.

```typescript
describe("CircuitsActions", () => {
  beforeEach(() => {
    vi.mocked(circuitsStore.useCircuitsStore).mockReturnValue({
      viewMode: CircuitsViewMode.GRID,
      setViewMode: vi.fn(),
    });
  });

  // Tests can override the mock when needed
  it("calls setViewMode", async () => {
    const setViewMode = vi.fn();
    vi.mocked(circuitsStore.useCircuitsStore).mockReturnValue({
      viewMode: CircuitsViewMode.GRID,
      setViewMode,
    });
  });
});
```

### Describe Tests in Behavioral Language

Name tests after what the user sees or what the component does, not how it's implemented.

```typescript
// ❌ Bad — describes implementation
it("calls useState setter");
it("renders a div with flex class");

// ✅ Good — describes behavior
it("opens the map modal when MapButton is clicked");
it("does not render GridViewToggle in small mode");
```

---

## File & Folder Naming

- **Components**: PascalCase (`CircuitCard.tsx`)
- **Hooks**: camelCase prefixed with `use` (`useCircuitsStore.ts`)
- **Utilities / helpers**: camelCase (`formatLapTime.ts`)
- **Constants**: camelCase file, SCREAMING_SNAKE_CASE exports (`circuitsConstants.ts` → `export const DEFAULT_VIEW_MODE`)
- **Folders**: kebab-case (`circuit-details/`)
