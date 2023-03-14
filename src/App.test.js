import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Form from "./components/form";

describe("Test the Main App", () => {
  it("Renders main heading", () => {
    render(<App />);
    const header = screen.getByTestId("header").innerHTML;
    expect(header).toEqual("Ramsoft's Trello");
  });

  describe("Check if the 3 main columns are being rendered", () => {
    it("Renders Todo Column", () => {
      render(<App />);
      const toDoColumn = screen.getByText("Todo");
      expect(toDoColumn).toBeInTheDocument();
    });

    it("Renders in progress Column", () => {
      render(<App />);
      const progressColumn = screen.getByText("InProgress");
      expect(progressColumn).toBeInTheDocument();
    });

    it("Renders in Done Column", () => {
      render(<App />);
      const doneColumn = screen.getByText("Done");
      expect(doneColumn).toBeInTheDocument();
    });
  });

  it("Test creating a task", async () => {
    render(<App />);
    const addButton = screen.getByText("Add Card");

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const headingElement = await screen.getByRole("textbox", { name: "heading" });
    expect(headingElement).toBeInTheDocument();

    fireEvent.change(headingElement, { target: { value: "test heading" } });
    const submitButton = screen.getByRole("button", { type: "submit" });

    fireEvent.click(submitButton);
    const newTask = await screen.findByText("test heading");

    expect(newTask).toBeInTheDocument();
  });
});
