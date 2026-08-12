import type { Metadata } from "next";
import Link from "next/link";

import { LocationSearchForm } from "@/components/location-search-form";
import { PageShell } from "@/components/page-shell";
import {
  locationDatasetSummary,
  locationQuerySchema,
  searchLocations,
  type LocationSearchResult,
} from "@/lib/locations/search";

export const metadata: Metadata = {
  title: "Find an area",
  description:
    "Search South African villages, towns, municipalities, historical wards and sourced traditional-authority records.",
};

interface PropertiesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function contextParts(result: LocationSearchResult): string[] {
  return [result.parent, result.municipality, result.district, result.province]
    .filter((value): value is string => Boolean(value))
    .filter((value, index, values) => values.indexOf(value) === index);
}

function SearchResult({ result }: { result: LocationSearchResult }) {
  const context = contextParts(result);
  return (
    <li
      className={
        result.kind === "data_gap"
          ? "location-result data-gap"
          : "location-result"
      }
    >
      <div className="result-heading">
        <div>
          <span className="result-type">{result.typeLabel}</span>
          <h2>{result.name}</h2>
        </div>
        {result.wardNumber2011 ? (
          <span className="ward-chip">2011 ward {result.wardNumber2011}</span>
        ) : null}
      </div>
      {context.length > 0 ? (
        <p className="result-context">{context.join(" · ")}</p>
      ) : null}
      {result.landmarks.length > 0 ? (
        <p className="landmark-note">
          <strong>Recognition markers:</strong>{" "}
          {result.landmarks.slice(0, 3).join("; ")}
        </p>
      ) : null}
      {result.warning ? (
        <p className="result-warning">{result.warning}</p>
      ) : null}
      {result.kind !== "data_gap" ? (
        <p className="result-source">Source record: {result.id}</p>
      ) : null}
    </li>
  );
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const rawQuery = firstValue(params.q).trim();
  const parsedQuery = rawQuery ? locationQuerySchema.safeParse(rawQuery) : null;
  const results = parsedQuery?.success ? searchLocations(parsedQuery.data) : [];

  return (
    <PageShell>
      <section className="page-hero search-page-hero">
        <div className="shell narrow">
          <p className="eyebrow">National area directory</p>
          <h1>Start with the area you know</h1>
          <p>
            Search villages, towns, sub-places, municipalities, historical wards
            and sourced traditional-authority records. Similar names include
            geographic context.
          </p>
          <LocationSearchForm defaultValue={rawQuery} />
        </div>
      </section>

      <section className="section search-results-section" aria-live="polite">
        <div className="shell narrow">
          <div className="dataset-note" role="note">
            <strong>
              {locationDatasetSummary.placeCount.toLocaleString("en-ZA")} place
              records available
            </strong>
            <span>
              National Census 2011 baseline with municipal context, historical
              centroid-to-ward links and selected public landmarks. Current
              boundaries still require reconciliation.
            </span>
          </div>

          {!rawQuery ? (
            <div className="search-start-state">
              <h2>Search by the name people use</h2>
              <p>
                The complete directory stays on the server, so your phone
                receives only a small result page—not the full national
                workbook.
              </p>
              <div className="query-examples" aria-label="Example searches">
                {[
                  "Giyani",
                  "Homu",
                  "Mhinga",
                  "Nkuzana",
                  "Siyandhani",
                  "Diepsloot",
                ].map((example) => (
                  <Link
                    key={example}
                    href={`/properties?q=${encodeURIComponent(example)}`}
                  >
                    {example}
                  </Link>
                ))}
              </div>
            </div>
          ) : parsedQuery && !parsedQuery.success ? (
            <div className="empty-search" role="alert">
              <h2>Search needs a little more detail</h2>
              <p>{parsedQuery.error.issues[0]?.message}</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="results-summary">
                <div>
                  <p className="eyebrow">Search results</p>
                  <h2>Best matches for “{parsedQuery?.data}”</h2>
                </div>
                <span>{results.length} shown</span>
              </div>
              <ul className="location-results">
                {results.map((result) => (
                  <SearchResult key={result.id} result={result} />
                ))}
              </ul>
            </>
          ) : (
            <div className="empty-search">
              <h2>No reliable match found for “{parsedQuery?.data}”</h2>
              <p>
                Try another spelling or a nearby municipality. A missing result
                does not mean the place does not exist; newer community and
                municipal records still need to be added.
              </p>
            </div>
          )}

          <div className="empty-help">
            <h2>Is information missing or incorrect?</h2>
            <p>
              Community corrections will be reviewed against source records. A
              suggestion will not silently replace official or historical data.
            </p>
            <Link className="button button-primary" href="/help">
              Learn about corrections
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
