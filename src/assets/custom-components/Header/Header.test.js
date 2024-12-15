import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("renders the header name", () => {
    const headerName = "Invoice Management";
    render(<Header headerName={headerName} />);
    const headerElement = screen.getByRole("heading", { name: headerName });
    expect(headerElement).toBeInTheDocument();
  });

  it("has the correct CSS class", () => {
    const headerName = "Invoice Management";
    render(<Header headerName={headerName} />);
    const headerElement = screen.getByRole("heading", {
      name: headerName,
    }).parentElement;
    expect(headerElement).toHaveClass("invoice-app-header");
  });
});
