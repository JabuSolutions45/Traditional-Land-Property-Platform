# ADR 0001: Temporary server-side location search index

Status: Accepted for the review pilot  
Date: 2026-08-12

## Context

The national Excel master contains more than 36,000 place records, historical
ward links, municipal context, public-landmark examples and controlled records
for known data gaps. The review website needs genuine search now, but the only
Supabase project available to the account is an unrelated inactive European
test project. The Umeli hosting region remains a product-owner decision.

The complete national dataset must not be downloaded into a user's browser.

## Decision

Generate a compact read-only JSON index from the workbook and search it only in
Next.js server code. The browser sends an ordinary GET query and receives only
the rendered top results. No personal information is collected.

The search provider is kept behind `lib/locations/search.ts` so the same user
interface can later use indexed PostgreSQL search without changing its public
contract.

## Consequences

- National place search works without activating a production database.
- Low-cost phones do not download the national data file.
- Results retain historical and data-gap warnings.
- Updates require regenerating and redeploying the index.
- Type-ahead, community corrections and live imports wait for Supabase.
- Production PostgreSQL must explicitly grant only required Data API access,
  enable RLS, use trigram indexes and keep traditional geography separate from
  municipal geography.
