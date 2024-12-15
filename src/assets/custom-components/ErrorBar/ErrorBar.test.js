import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBar } from "./ErrorBar";
import "@testing-library/jest-dom";

describe("ErrorBar", () => {
  it("renders the error message", () => {
    const errorMessage = "This is an error message";
    render(<ErrorBar message={errorMessage} />);

    const errorBarElement = screen.getByText(errorMessage);
    expect(errorBarElement).toBeInTheDocument();
  });

  it("has the correct CSS class", () => {
    const errorMessage = "This is an error message";
    render(<ErrorBar message={errorMessage} />);

    const errorBarElement = screen.getByText(errorMessage);
    expect(errorBarElement).toHaveClass("error-bar");
  });
});
