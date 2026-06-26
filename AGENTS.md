# Agent Guidelines — kartiiing_v2 Monorepo

- `kartiiing/` — Next.js frontend. See [kartiiing/agents.md](kartiiing/agents.md)
- `api/` — NestJS backend. See [api/agents.md](api/agents.md)
- `shared/` — Types and utilities shared across packages. Types that cross the frontend/backend boundary live here. Never duplicate them in `kartiiing/` or `api/`. Import from `@kartiiing/shared`.
- Testing conventions are documented per package.

---

## Git & Commits

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

feat(circuits): add grid/list view toggle
fix(auth): handle expired session redirect
chore(deps): update vitest to v2
test(circuits): add CircuitsActions unit tests
refactor(ui): extract MapButton into separate component
```

| Type       | When to use                                          |
| ---------- | ---------------------------------------------------- |
| `feat`     | New feature or functionality                         |
| `fix`      | Bug fix                                              |
| `chore`    | Tooling, dependencies, config changes (no app logic) |
| `test`     | Adding or updating tests                             |
| `refactor` | Code restructuring (no behavior change)              |
| `docs`     | Documentation only                                   |
| `style`    | Formatting, whitespace, linting (no code change)     |
| `perf`     | Performance improvements                             |
