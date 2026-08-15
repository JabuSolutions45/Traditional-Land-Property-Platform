# Generated location search data

`location-search.json` is the compact manifest for read-only server search
index shards generated from the national Excel master by
`scripts/build-location-search.py`. The bounded shards are named
`location-search-00.json` through `location-search-11.json`.

They are not sent to the browser. Next.js searches them on the server and
returns a small ranked result list. The index preserves historical-source
labels and known data gaps; it does not turn a Census 2011 centroid into a
current legal boundary or infer a traditional-authority jurisdiction.

The generated index is temporary application infrastructure until an approved
South African Supabase region and production database are configured.
