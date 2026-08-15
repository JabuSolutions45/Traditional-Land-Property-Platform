import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LocationSearchForm } from "@/components/location-search-form";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("LocationSearchForm predictive suggestions", () => {
  it("requests and presents accessible suggestions after two letters", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          suggestions: [
            {
              id: "place:ngove",
              name: "Ngove",
              typeLabel: "Main place",
              context: "Greater Giyani · Mopani · Limpopo",
              href: "/properties?q=Ngove",
            },
          ],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<LocationSearchForm />);

    const input = screen.getByRole("combobox", {
      name: /search the national area directory/i,
    });
    fireEvent.change(input, { target: { value: "ng" } });

    expect(
      await screen.findByRole("listbox", { name: "Suggested areas" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option")).toHaveTextContent(
      "NgoveMain placeGreater Giyani · Mopani · Limpopo",
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/locations/suggestions?q=ng",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );

    fireEvent.change(input, { target: { value: "ngo" } });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not request suggestions for one letter", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<LocationSearchForm />);

    fireEvent.change(
      screen.getByRole("combobox", {
        name: /search the national area directory/i,
      }),
      { target: { value: "n" } },
    );

    await waitFor(() => expect(fetchMock).not.toHaveBeenCalled());
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
