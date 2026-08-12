import locationManifest from "@/data/location-search.json";
import shard00 from "@/data/location-search-00.json";
import shard01 from "@/data/location-search-01.json";
import shard02 from "@/data/location-search-02.json";
import shard03 from "@/data/location-search-03.json";
import shard04 from "@/data/location-search-04.json";
import shard05 from "@/data/location-search-05.json";
import shard06 from "@/data/location-search-06.json";
import shard07 from "@/data/location-search-07.json";
import shard08 from "@/data/location-search-08.json";
import shard09 from "@/data/location-search-09.json";
import shard10 from "@/data/location-search-10.json";
import shard11 from "@/data/location-search-11.json";
import { z } from "zod";

export const locationQuerySchema = z
  .string()
  .trim()
  .min(2, "Enter at least 2 letters.")
  .max(80, "Search must be 80 characters or fewer.");

type LocationKind =
  | "place"
  | "municipality"
  | "province"
  | "ward"
  | "traditional_authority"
  | "data_gap";

type RawLocationRow = readonly [
  id: string,
  kind: LocationKind,
  name: string,
  normalizedName: string,
  level: string,
  province: string | null,
  district: string | null,
  municipality: string | null,
  parent: string | null,
  category: string | null,
  wardCode2011: string | null,
  wardNumber2011: number | null,
  landmarks: string | null,
  status: string,
  latitude: number | null,
  longitude: number | null,
];

interface RawLocationData {
  version: string;
  source: string;
  counts: {
    places: number;
    totalSearchRecords: number;
  };
  shards: string[];
}

export interface LocationSearchResult {
  id: string;
  kind: LocationKind;
  name: string;
  typeLabel: string;
  province: string | null;
  district: string | null;
  municipality: string | null;
  parent: string | null;
  category: string | null;
  wardCode2011: string | null;
  wardNumber2011: number | null;
  landmarks: string[];
  status: string;
  warning: string | null;
}

const data = locationManifest as unknown as RawLocationData;
const rows = [
  ...shard00.rows,
  ...shard01.rows,
  ...shard02.rows,
  ...shard03.rows,
  ...shard04.rows,
  ...shard05.rows,
  ...shard06.rows,
  ...shard07.rows,
  ...shard08.rows,
  ...shard09.rows,
  ...shard10.rows,
  ...shard11.rows,
] as unknown as RawLocationRow[];

if (rows.length !== data.counts.totalSearchRecords) {
  throw new Error("The location search index is incomplete.");
}

export const locationDatasetSummary = {
  version: data.version,
  source: data.source,
  placeCount: data.counts.places,
  searchRecordCount: data.counts.totalSearchRecords,
} as const;

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-ZA")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function bigrams(value: string): Set<string> {
  const compact = value.replaceAll(" ", "");
  if (compact.length < 2) return new Set([compact]);
  const result = new Set<string>();
  for (let index = 0; index < compact.length - 1; index += 1) {
    result.add(compact.slice(index, index + 2));
  }
  return result;
}

function diceCoefficient(left: string, right: string): number {
  const leftBigrams = bigrams(left);
  const rightBigrams = bigrams(right);
  if (leftBigrams.size === 0 || rightBigrams.size === 0) return 0;
  let overlap = 0;
  for (const pair of leftBigrams) {
    if (rightBigrams.has(pair)) overlap += 1;
  }
  return (2 * overlap) / (leftBigrams.size + rightBigrams.size);
}

function typeLabel(kind: LocationKind, level: string): string {
  if (kind === "data_gap") return "Known place · current source needed";
  if (kind === "traditional_authority") return "Traditional authority";
  if (kind === "ward") return "Ward · historical 2011 geography";
  if (kind === "municipality") {
    return level === "district" ? "District municipality" : "Municipality";
  }
  if (kind === "province") return "Province";
  return level === "main_place" ? "Main place" : "Sub-place";
}

const preparedRecords = rows.map((row) => {
  const [
    id,
    kind,
    name,
    normalizedName,
    level,
    province,
    district,
    municipality,
    parent,
    category,
    wardCode2011,
    wardNumber2011,
    landmarks,
    status,
  ] = row;
  const context = normalize(
    [
      name,
      normalizedName,
      level,
      province,
      district,
      municipality,
      parent,
      category,
      landmarks,
      wardNumber2011 ? `ward ${wardNumber2011}` : null,
    ]
      .filter(Boolean)
      .join(" "),
  );
  return {
    id,
    kind,
    name,
    normalizedName: normalize(normalizedName || name),
    level,
    province,
    district,
    municipality,
    parent,
    category,
    wardCode2011,
    wardNumber2011,
    landmarks,
    status,
    context,
  };
});

const sourcedPlaceNames = new Set(
  preparedRecords
    .filter((record) => record.kind === "place")
    .map((record) => record.normalizedName),
);

const currentSourceGapNames = new Set(
  preparedRecords
    .filter((record) => record.kind === "data_gap")
    .map((record) => record.normalizedName),
);

function scoreRecord(
  record: (typeof preparedRecords)[number],
  query: string,
): number {
  const name = record.normalizedName;
  const queryTokens = query.split(" ").filter(Boolean);
  let score = 0;

  if (name === query) score = 1_000;
  else if (name.startsWith(query)) score = 900;
  else if (name.includes(query)) score = 820;
  else if (record.context.includes(query)) score = 700;
  else if (queryTokens.every((token) => record.context.includes(token))) {
    score = 620;
  } else if (query.length >= 4) {
    const similarity = diceCoefficient(name, query);
    if (similarity >= 0.42) score = 350 + Math.round(similarity * 300);
  }

  if (score === 0) return 0;
  if (record.kind === "data_gap") score += 45;
  if (record.kind === "place" && record.level === "main_place") score += 35;
  if (record.kind === "municipality") score += 15;
  return score;
}

function warningFor(record: (typeof preparedRecords)[number]): string | null {
  if (record.kind === "data_gap") {
    return "This name is known, but the workbook does not yet have a reliable current place or ward record. No location is guessed.";
  }
  if (record.kind === "traditional_authority") {
    return "Published baseline only. Current office-holder and jurisdiction links still require confirmation.";
  }
  if (currentSourceGapNames.has(record.normalizedName)) {
    return "Historical Census 2011 geography. A current-source reconciliation is still open; confirm the present ward and boundaries before relying on this result.";
  }
  if (record.kind === "ward" || record.status === "historical_baseline") {
    return "Historical Census 2011 geography. Confirm current boundaries before relying on this result.";
  }
  return null;
}

export function searchLocations(
  untrustedQuery: string,
  limit = 15,
): LocationSearchResult[] {
  const parsed = locationQuerySchema.safeParse(untrustedQuery);
  if (!parsed.success) return [];
  const query = normalize(parsed.data);
  if (query.length < 2) return [];

  return preparedRecords
    .filter(
      (record) =>
        record.kind !== "data_gap" ||
        !sourcedPlaceNames.has(record.normalizedName),
    )
    .map((record) => ({ record, score: scoreRecord(record, query) }))
    .filter(({ score }) => score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.record.name.localeCompare(right.record.name, "en-ZA"),
    )
    .slice(0, Math.min(Math.max(limit, 1), 25))
    .map(({ record }) => ({
      id: record.id,
      kind: record.kind,
      name: record.name,
      typeLabel: typeLabel(record.kind, record.level),
      province: record.province,
      district: record.district,
      municipality: record.municipality,
      parent: record.parent,
      category: record.category,
      wardCode2011: record.wardCode2011,
      wardNumber2011: record.wardNumber2011,
      landmarks: record.landmarks
        ? record.landmarks.split(";").map((item) => item.trim())
        : [],
      status: record.status,
      warning: warningFor(record),
    }));
}
