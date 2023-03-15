import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./index";

describe("The form's elements", () => {
  it("Form heading renders as expected when open is true", () => {
    render(<Form open={true} />);
    const headingElement = screen.getByText("Add new task");
    expect(headingElement).toBeTruthy();
  });

  describe("Check for form field renders", () => {
    it("The Input fields are rendered as expected - heading", async () => {
      render(<Form open={true} />);
      const titleBox = screen.getByRole("textbox", {
        name: "heading",
      });
      expect(titleBox).toBeInTheDocument();
    });

    it("The Input fields are rendered as expected - description", async () => {
      render(<Form open={true} />);
      const descBox = screen.getByRole("textbox", {
        name: "desc",
      });
      expect(descBox).toBeInTheDocument();
    });

    it("The Input fields are rendered as expected - deadline", async () => {
      render(<Form open={true} />);
      const deadlineBox = screen.getByRole("textbox", {
        name: "deadline",
      });
      expect(deadlineBox).toBeInTheDocument();
    });
  });

  describe("Check if the textbox is being populated", () => {
    it("Check for Heading change", async () => {
      render(<Form open={true} />);

      const headingBox = screen.getByRole("textbox", { name: "heading" });

      expect(headingBox).toBeInTheDocument();

      fireEvent.change(headingBox, { target: { value: "test heading" } });

      const headingBoxChanged = screen.getByRole("textbox", { name: "heading" });

      expect(headingBoxChanged.value).toBe("test heading");
    });
  });
});
