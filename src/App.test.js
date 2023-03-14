import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Test the Main App", () => {
  it("Renders main heading", () => {
    render(<App />);
    const header = screen.getByTestId("header").innerHTML;
    expect(header).toEqual("Ramsoft's Trello");
  });
});
