# Umeli Codex Handover

Project owner: Jabulani Mabobo  
Initial market: South Africa  
Initial pilot: Limpopo, beginning with Giyani, Malamulele and Venda

## Product purpose

Umeli is intended to record property-listing, identity-information, community-review and traditional-authority workflows on customary and traditional land. It must maintain precise, auditable descriptions of what was checked and must never claim to determine ownership, title or legal validity.

## Current task boundary

The national Excel location master is preserved as the first data-foundation
deliverable. Phase 0 is complete. The review application now includes a genuine
server-side national location search generated from the workbook. The search is
read-only and temporary until an approved Supabase region and production
database are configured.

Authentication, listings, identity checks, approval workflows, payments and
production database work remain separate security-sensitive phases. The public
review site must not present those explanatory journeys as active services.

## Non-negotiable controls

- Do not silently change database architecture, authentication, roles, payments, identity rules, authority approval rules, legal wording, environment variables or Row Level Security.
- Escalate legal, privacy, financial and customary-governance decisions.
- Keep municipal and traditional-authority geography as overlapping systems rather than forcing them into one hierarchy.
- Do not expose secrets or sensitive identity and exact-location data.

## Deferred decisions

Final name, identity and SMS providers, map provider, hosting region, retention periods, public location precision, authority onboarding evidence, delegation rules, legal notices, disputes, payments, fees, languages and pilot authorities remain product-owner decisions.
