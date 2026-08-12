# Umeli

Umeli is a proposed mobile-first South African platform for recording customary and traditional-land property workflows without claiming to determine ownership or legal title.

## Current project phase

Phase 0 provides a secure, testable web foundation and preserves the completed location-data work:

- A Next.js application using strict TypeScript.
- A responsive, accessible seven-page public service prototype.
- Review journeys for finding an area, preparing to sell, mobile registration,
  understanding checks, programme information and safety guidance.
- Genuine server-side national search across 36,147 place records, municipalities,
  historical Census 2011 wards, sourced traditional-authority baselines and known
  mapping gaps.
- A JSON health endpoint at `/health`.
- Environment validation and documented Supabase placeholders.
- Automated linting, type-checking, tests and production builds.
- A national Excel location master based on Stats SA Census 2011 main places, sub-places and wards.
- A historical primary-ward link for each place whose centroid falls inside a Census 2011 ward.
- Conservative national subarea categories derived from explicit source-name evidence.
- Database-ready sheets aligned to the proposed location entities.
- Source, limitation and import-audit sheets.

Area search is active. The remaining review journeys are intentionally
informational: they do not collect personal information or present sample areas
as live property listings. Authentication, listings, identity checks, approval
workflows, payments and a production database have not been implemented.

## Review pages

- `/` — search-led service home.
- `/properties` — working national area search with source limitations.
- `/sell` — seller preparation journey.
- `/account` — mobile registration and sign-in explanation.
- `/how-it-works` — descriptive checks and geographic model.
- `/about` — programme purpose and limitations.
- `/help` — user safety and correction guidance.

## Local setup

Requirements:

- Node.js 24
- pnpm 11.9.0

Install and start the project:

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. The health check is available at `http://localhost:3000/health`.

The Phase 0 application starts without Supabase credentials. Before a future Supabase phase, replace the placeholders in `.env.local` with development-project values. Never commit `.env.local` or a service-role credential.

## Project checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The same checks run in GitHub Actions for pull requests and changes to `main`.

## Project structure

- `app/` — Next.js routes and layouts.
- `components/` — shared user-interface components.
- `features/` — feature modules reserved for later phases.
- `lib/` — shared validation and future service adapters.
- `supabase/` — future migrations, seed data and functions.
- `tests/` — automated tests.
- `docs/` — architecture, data and grant-programme notes.
- `outputs/` — user-facing data deliverables.

## Location workbook

The workbook is stored in `outputs/Umeli_South_Africa_Location_Master.xlsx`.

The Census 2011 hierarchy is a national statistical baseline, not a statement of current municipal, ward, postal or traditional-authority boundaries. See `docs/location-import.md` before importing it into a database.

The ward link is a centroid-based historical mapping. It does not prove that an entire village lies in one ward and must not be presented as a current ward assignment.

Subarea categories never infer formal or informal status from a place name alone. Ambiguous records remain `unclassified_subarea` pending municipal, planning or community evidence.

## Location search index

Run the repeatable read-only extraction after an approved workbook update:

```bash
python3 scripts/build-location-search.py
```

The generated `data/location-search.json` file remains on the server. Users receive
only the small ranked result page. Search supports partial names and minor spelling
errors and retains historical-ward and known-data-gap warnings.

## Security

Read `SECURITY.md` before adding authentication, identity information, private documents or exact property coordinates. Repository conventions and required checks are in `AGENTS.md`.
