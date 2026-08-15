# Database design status

No production database migration has been applied yet. The connected Supabase
account currently exposes only an unrelated inactive European test project, and
Umeli's hosting region remains a product-owner decision.

## Planned location entities

- `countries`
- `provinces`
- `municipalities`
- `wards`
- `places`
- `place_names`
- `place_relationships`
- `traditional_authorities`
- `traditional_authority_areas`
- `authority_place_links`
- `location_sources`
- `location_import_jobs`

Municipal and traditional-authority geography must not share a forced parent
hierarchy. Their overlap belongs in dated relationship records with source
evidence.

## Planned search implementation

- PostgreSQL 17 or the currently supported Supabase default.
- `unaccent` for accent-insensitive normalized names.
- `pg_trgm` with GIN indexes for partial and spelling-tolerant matching.
- Explicit query length and result limits.
- Ranked context including place type, parent place, municipality and province.
- Historical and current geography kept in separately dated records.

## Data API and security

Production migrations must explicitly grant only the required privileges. RLS
must be enabled on every exposed table even when rows are intended for public
search. Internal import and audit tables must not be granted to `anon`.

The public search surface should be a bounded security-invoker function or view,
not unrestricted access to every source and import column. No service-role key may
be sent to the browser.

Database creation, region selection and migrations require explicit product-owner
approval and security testing.
