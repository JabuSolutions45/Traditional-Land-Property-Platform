import { describe, expect, it } from "vitest";

import { validatePublicEnvironment } from "@/lib/validation/env";

describe("validatePublicEnvironment", () => {
  it("allows an empty Phase 0 environment", () => {
    expect(validatePublicEnvironment({})).toEqual({});
  });

  it("accepts documented Supabase placeholders when supplied", () => {
    expect(
      validatePublicEnvironment({
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "public-anon-key",
      }),
    ).toEqual({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "public-anon-key",
    });
  });

  it("rejects an invalid Supabase URL", () => {
    expect(() =>
      validatePublicEnvironment({
        NEXT_PUBLIC_SUPABASE_URL: "not-a-url",
      }),
    ).toThrow();
  });
});
