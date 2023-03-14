import { render, screen } from "@testing-library/react";
import App from "./App";

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
});
