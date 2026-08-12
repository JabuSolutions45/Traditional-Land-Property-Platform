import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import PropertiesPage from "@/app/properties/page";

afterEach(cleanup);

describe("PropertiesPage", () => {
  it("renders a sourced national location result", async () => {
    render(
      await PropertiesPage({
        searchParams: Promise.resolve({ q: "Nkuzana" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Nkuzana" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Makhado · Vhembe · Limpopo/i)).toBeInTheDocument();
    expect(screen.getByText(/2011 ward 8/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/historical Census 2011 geography/i).length,
    ).toBeGreaterThan(0);
  });

  it("does not guess a ward for a known data gap", async () => {
    render(
      await PropertiesPage({
        searchParams: Promise.resolve({ q: "Siyandhani" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: /Siyandani.*Siyandhani/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No location is guessed/i)).toBeInTheDocument();
  });
});
