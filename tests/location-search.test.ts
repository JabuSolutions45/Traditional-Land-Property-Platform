import { describe, expect, it } from "vitest";

import {
  locationDatasetSummary,
  searchLocations,
} from "@/lib/locations/search";

describe("national location search", () => {
  it("loads the complete national place baseline", () => {
    expect(locationDatasetSummary.placeCount).toBe(36_147);
    expect(locationDatasetSummary.searchRecordCount).toBeGreaterThan(40_000);
  });

  it("finds Giyani with enough geographic context", () => {
    const results = searchLocations("Giyani");

    expect(results[0]?.name).toBe("Giyani");
    expect(results[0]?.municipality).toBe("Greater Giyani");
    expect(results[0]?.province).toBe("Limpopo");
  });

  it.each([
    ["Homu", "KaHomu"],
    ["Mhinga", "Ka-Mhinga"],
    ["Nkuzana", "Nkuzana"],
    ["Diepsloot", "Diepsloot"],
  ])("matches the community search %s", (query, expectedName) => {
    const results = searchLocations(query);

    expect(results.some((result) => result.name === expectedName)).toBe(true);
  });

  it("returns an honest data-gap result for Siyandhani", () => {
    const results = searchLocations("Siyandhani");
    const gap = results.find((result) => result.kind === "data_gap");

    expect(gap?.name).toContain("Siyandhani");
    expect(gap?.warning).toMatch(/does not yet have a reliable current/i);
    expect(gap?.wardNumber2011).toBeNull();
  });

  it("tolerates a minor spelling error", () => {
    const results = searchLocations("Malamulel");

    expect(results.some((result) => result.name === "Malamulele")).toBe(true);
  });

  it("rejects unusably short or oversized queries", () => {
    expect(searchLocations("g")).toEqual([]);
    expect(searchLocations("x".repeat(81))).toEqual([]);
  });
});
