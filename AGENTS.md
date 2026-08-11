# Umeli repository rules

## Scope and safety

- Read `CODEX_HANDOVER.md` before changing the project.
- Implement only the requested phase.
- Never silently change authentication, roles, payments, identity rules, traditional-authority approval rules, legal wording, production environment variables or Row Level Security.
- Keep municipal and traditional-authority geography as overlapping systems.
- Never claim that Umeli determines ownership, legal title or legal validity.
- Never commit secrets or expose service-role credentials to the browser.

## Coding conventions

- Use TypeScript strict mode and avoid undocumented `any`.
- Validate external input with shared schemas.
- Prefer small modules, explicit errors and accessible interfaces.
- Keep third-party services behind replaceable interfaces.
- Preserve source history and version significant records.

## Required checks

Run before handing off a completed change:

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Repository conventions

- Application routes: `app/`
- Shared UI: `components/`
- Feature modules: `features/`
- Shared services and validation: `lib/`
- Supabase migrations, seed data and functions: `supabase/`
- Tests: `tests/`
- Project documentation: `docs/`
- Static public files: `public/`
- User-facing generated data artifacts: `outputs/`

Database migrations must include a clear description. Material architectural decisions require an Architecture Decision Record.
