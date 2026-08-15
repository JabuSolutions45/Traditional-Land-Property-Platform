import { describe, expect, it } from "vitest";

import { GET } from "@/app/api/locations/suggestions/route";

describe("location suggestion API", () => {
  it("returns a small sourced suggestion list", async () => {
    const response = GET(
      new Request("https://umeli.test/api/locations/suggestions?q=ngov"),
    );
    const body = (await response.json()) as {
      suggestions: Array<{
        name: string;
        context: string;
        href: string;
      }>;
    };

    expect(response.status).toBe(200);
    expect(body.suggestions.length).toBeGreaterThan(0);
    expect(body.suggestions.length).toBeLessThanOrEqual(8);
    expect(body.suggestions.some((item) => /ngove/i.test(item.name))).toBe(
      true,
    );
    expect(body.suggestions[0]?.href).toMatch(/^\/properties\?q=/);
  });

  it("rejects short and oversized queries", async () => {
    const shortResponse = GET(
      new Request("https://umeli.test/api/locations/suggestions?q=n"),
    );
    const longResponse = GET(
      new Request(
        `https://umeli.test/api/locations/suggestions?q=${"x".repeat(81)}`,
      ),
    );

    expect(shortResponse.status).toBe(400);
    expect(longResponse.status).toBe(400);
    expect(shortResponse.headers.get("Cache-Control")).toBe("no-store");
  });
});
