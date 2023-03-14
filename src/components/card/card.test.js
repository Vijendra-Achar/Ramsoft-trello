import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("The Card's elements", () => {
  it("Card heading renders as expected", () => {
    render(<Card heading="heading" desc="desc" deadline="2 days" />);
    const headingElement = screen.getByText("heading");
    expect(headingElement).toBeTruthy();
  });

  it("Card description renders as expected", () => {
    render(<Card heading="heading" desc="desc" deadline="2 days" />);
    const descElement = screen.getByText("desc");
    expect(descElement).toBeInTheDocument();
  });

  it("Card deadline renders as expected", () => {
    render(<Card heading="heading" desc="desc" deadline="2 days" />);
    const deadlineElement = screen.getByText("2 days");
    expect(deadlineElement).toBeTruthy();
  });
});
