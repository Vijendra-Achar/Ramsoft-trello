import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./index";

const props = {
  heading: "heading",
  desc: "description",
  deadline: "2 days",
};

describe("The Card's elements", () => {
  it("Card heading renders as expected", () => {
    render(<Card {...props} />);
    const headingElement = screen.getByText("heading");
    expect(headingElement).toBeTruthy();
  });

  it("Card description renders as expected", () => {
    render(<Card {...props} />);
    const descElement = screen.getByText("description");
    expect(descElement).toBeInTheDocument();
  });

  it("Card deadline renders as expected", () => {
    render(<Card {...props} />);
    const deadlineElement = screen.getByText("2 days");
    expect(deadlineElement).toBeTruthy();
  });
});
