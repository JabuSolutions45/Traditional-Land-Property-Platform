# Generated location search data

`location-search.json` is a compact, read-only server search index generated
from the national Excel master by `scripts/build-location-search.py`.

It is not sent to the browser. Next.js searches it on the server and returns a
small ranked result list. The index preserves historical-source labels and
known data gaps; it does not turn a Census 2011 centroid into a current legal
boundary or infer a traditional-authority jurisdiction.

The generated index is temporary application infrastructure until an approved
South African Supabase region and production database are configured.
