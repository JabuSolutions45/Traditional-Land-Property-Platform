# Security policy

## Reporting

Do not place suspected vulnerabilities, identity information, exact private property coordinates or credentials in a public issue. Report them privately to the project owner through an approved project channel.

## Current security posture

Phase 0 contains no authentication, production database, identity-document storage, property listings or payment processing.

## Rules

- Never commit `.env` files or real credentials.
- Never expose a Supabase service-role credential to browser code.
- Treat identity records, private documents and exact property coordinates as restricted.
- Redact sensitive values from errors and logs.
- Enforce access and status transitions on the server and database in later phases.
- Enable explicit Row Level Security policies on every future user-facing table.
- Record material security and approval actions in an append-only audit trail.

## Dependencies

Dependencies are checked during continuous integration. Security-sensitive upgrades must be tested before release.
