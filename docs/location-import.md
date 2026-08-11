# Location import notes

## Baseline

The first workbook uses Statistics South Africa Census 2011 geography distributed by UCT Libraries:

- 14,039 main places.
- 22,108 sub-places.
- 4,277 Census 2011 wards.

The workbook also records the Department of Sport, Arts and Culture South African Geographical Names Council 2024 complete database as a reconciliation source for a later controlled import.

## Village-to-ward mapping

The `Places` sheet includes:

- `primary_ward_code_2011`
- `primary_ward_number_2011`
- `ward_mapping_method`

These fields are calculated by placing each Stats SA place centroid inside the corresponding Census 2011 ward polygon, restricted first to the source municipality. The value describes the ward containing the centroid; it does not establish that the complete village boundary lies within one ward.

The `Ward_Mapping_QA` sheet records named checks and unresolved examples. A current village missing from the Census 2011 place source must be added from a newer authoritative dataset rather than guessed.

## National subarea categorisation

Every place record now carries:

- `subarea_category`
- `category_basis`
- `planning_enrichment_status`

The classification is intentionally conservative. It recognises only explicit source-name markers such as `Extension`, `Reception`, `Industrial`, `AH`, `NU`, `Nature Reserve`, `Section`, `Zone`, `Block` or `Unit`. A name ending in `SP` is recorded as `sub_place_unspecified`; it is not automatically treated as a village, suburb or informal settlement.

The `Subarea_Categories` sheet documents each code and its limitations. Municipal town-planning documents, township-layout records, informal-settlement registers and cadastral sources should later replace or enrich these provisional categories without overwriting the original source history.

## Formal public landmarks

Named schools and police stations are included as recognition markers for villages and settlements. They do not change the place hierarchy and do not imply that the facility is administered by the linked village.

- The DBE and Census files use different sub-place coding generations. School links therefore require an exact, unique source place name plus municipality match; the codes are not treated as equivalent.
- Police-station links use an exact, unique station/place name plus province match because the national SAPS station list does not supply coordinates.
- Ambiguous or unmatched facilities are counted in `Landmark_Mapping_QA` and are not assigned to a village by guesswork.
- The school masterlist used is a historical baseline and every row is marked as requiring current confirmation.

The `Places` sheet shows a landmark count and up to three example formal names for quick village recognition. `Public_Landmarks` provides a compact place-level summary with up to ten formal marker names. `Landmark_Mapping_QA` records national totals and unresolved links. Clinics and other public facilities can be appended later when a suitable authoritative national facility list is available.

## Important limitation

The Census 2011 place hierarchy is comprehensive for that census geography but is historical. Municipality names, municipal boundaries and ward boundaries may have changed. It must not be presented as the current legal or administrative boundary register.

Traditional-authority areas, headman areas, postal codes, alternative spellings, local-language names and current boundary geometries are not inferred. The workbook contains a nationally published 2016 baseline of 11 kingship/queenship structures and a small number of individually sourced office-holders. This is not a complete current national register.

## Traditional-authority hierarchy

Traditional governance is stored independently from municipal geography. The controlled hierarchy is:

1. King or queen.
2. Principal traditional leader, where applicable.
3. Senior traditional leader or chief.
4. Headman or headwoman.

`Traditional_Authorities` stores the institution or structure. `Traditional_Leaders` stores a person holding an office, with appointment dates and evidence. `Authority_Place_Links` connects an authority or leader to a place only when a dated source defines the jurisdiction. `Traditional_Role_Levels` provides the controlled vocabulary.

Local titles such as Inkosi, Kgoshi, Hosi, Induna or Ndhuna must be confirmed in their provincial and customary context; the workbook does not automatically equate them. Vacancies, disputes, regencies, acting appointments and successions must be versioned rather than overwritten.

Chief, headman and village-level coverage is currently pending provincial registers, government gazettes, municipal records or confirmed traditional-council documentation. A blank record means “not yet sourced”, not “no authority exists”.

## Proposed import order

1. `Countries`
2. `Provinces`
3. `Municipalities`
4. `Wards`
5. `Places`
6. `Place_Names`
7. `Place_Relationships`
8. `Traditional_Role_Levels`
9. `Traditional_Authorities`
10. `Traditional_Leaders`
11. `Authority_Place_Links`

Source identifiers must remain immutable. Application UUIDs should be generated by the database during import and mapped back to source identifiers.

## Reconciliation rules

- Preserve the original source name and code.
- Add name corrections or aliases as new `place_names` records.
- Do not overwrite source history.
- Store a new effective date and source record for every later dataset.
- Treat traditional-authority geography as overlapping municipal geography.
- Require human review for ambiguous names, boundary changes and authority mappings.

## Future funded mapping programme

The proposed village-boundary, traditional-jurisdiction, GIS-equipment, field-training and community-correction workstreams are organised in [`grant-mapping-programme.md`](grant-mapping-programme.md). These are future grant components and do not expand the current Excel-directory task.
