# Architecture

Umeli is a mobile-first Next.js application planned around a Supabase backend.
Phase 0 establishes the web foundation. The first location-search release uses a
generated read-only server index because the production Supabase region is not
yet approved.

## Location search boundary

`lib/locations/search.ts` is the application-facing search provider. It currently
reads the compact workbook-derived index on the server. No national dataset is
included in client code or returned to the browser.

The predictive-search client waits briefly after typing two letters, cancels
superseded requests and calls `/api/locations/suggestions`. The route validates
the query and returns no more than eight plain, non-sensitive result summaries.
The original HTML GET form remains usable without JavaScript.

When Supabase is approved, the provider will call an indexed PostgreSQL search
function using `pg_trgm` and accent-insensitive normalized names. The public UI
and result contract should not need to change.

Municipal places, wards and traditional-authority areas remain separate,
overlapping records. Historical ward-centroid matches are never treated as whole
village boundaries.

Future integrations—including maps, identity checks, SMS, email and monitoring—must be replaceable through provider interfaces. Municipal geography and traditional-authority geography remain separate, overlapping systems.
