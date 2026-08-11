import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home", () => {
  it("explains the service without making a legal ownership claim", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /a clearer path for property information/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not determine ownership, title or legal validity/i),
    ).toBeInTheDocument();
  });

  it("presents three plain-language starting points", () => {
    render(<Home />);

    expect(screen.getByText("Find the right area")).toBeInTheDocument();
    expect(screen.getByText("Understand the checks")).toBeInTheDocument();
    expect(screen.getByText("Follow the Limpopo pilot")).toBeInTheDocument();
  });

  it("does not collect personal information on the launch page", () => {
    const { container } = render(<Home />);

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector("input")).not.toBeInTheDocument();
  });
});
