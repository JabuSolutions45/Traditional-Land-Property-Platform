import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home", () => {
  it("explains the service without making a legal ownership claim", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /find the place. understand the process/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /does not determine ownership, title or legal validity/i,
      ),
    ).not.toHaveLength(0);
  });

  it("presents three plain-language starting points", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Find a property" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sell a property" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Understand Umeli" }),
    ).toBeInTheDocument();
  });

  it("does not collect personal information on the launch page", () => {
    const { container } = render(<Home />);

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector("input")).not.toBeInTheDocument();
  });
});
