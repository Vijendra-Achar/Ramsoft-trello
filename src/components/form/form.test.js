import React from "react";
import { render, screen } from "@testing-library/react";
import Form from "./index";

describe("The form's elements", () => {
  it("Form heading renders as expected when open is true", () => {
    render(<Form open={true} />);
    const headingElement = screen.getByText("Add new task");
    expect(headingElement).toBeTruthy();
  });

  it("The Input fields are rendered as expected", () => {
    const titleBox = screen.findByRole("text", {
      name: "heading",
    });
    expect(titleBox).toBeTruthy();
  });
});
