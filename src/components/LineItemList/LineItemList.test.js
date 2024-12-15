import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LineItemList } from "./LineItemList";
import "@testing-library/jest-dom";

describe("LineItemList", () => {
  const mockSetLineItems = jest.fn();
  const lineItemFields = [
    { name: "description" },
    { name: "quantity" },
    { name: "rate" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders line items and their fields", () => {
    const lineItems = [
      { description: "Item 1", quantity: "2", rate: "10", total: 20 },
    ];

    render(
      <LineItemList
        lineItems={lineItems}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );
    expect(screen.getByDisplayValue("Item 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();
  });

  it("calculates the combined total correctly", () => {
    const lineItems = [
      { description: "Item 1", quantity: "2", rate: "10", total: 20 },
      { description: "Item 2", quantity: "3", rate: "5", total: 15 },
    ];

    render(
      <LineItemList
        lineItems={lineItems}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );

    const combinedTotal = screen.getByText("Combined Total: $35.00");
    expect(combinedTotal).toBeInTheDocument();
  });

  it("adds a new line item when the 'Add Line Item' button is clicked", () => {
    const lineItems = [
      { description: "Item 1", quantity: "2", rate: "10", total: 20 },
    ];

    render(
      <LineItemList
        lineItems={lineItems}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );

    fireEvent.click(screen.getByText("Add Line Item"));

    expect(mockSetLineItems).toHaveBeenCalledWith([
      ...lineItems,
      { description: "", quantity: "", rate: "", total: 0 },
    ]);
  });

  it("updates line item fields correctly", () => {
    const lineItems = [
      { description: "Item 1", quantity: "2", rate: "10", total: 20 },
    ];

    render(
      <LineItemList
        lineItems={lineItems}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );

    fireEvent.change(screen.getByDisplayValue("2"), { target: { value: "3" } });
    fireEvent.change(screen.getByDisplayValue("10"), {
      target: { value: "5" },
    });

    expect(mockSetLineItems).toHaveBeenCalledWith([
      { description: "Item 1", quantity: "3", rate: "5", total: 15 },
    ]);
  });

  it("removes a line item when the 'Remove' button is clicked", () => {
    const lineItems = [
      { description: "Item 1", quantity: "2", rate: "10", total: 20 },
      { description: "Item 2", quantity: "3", rate: "5", total: 15 },
    ];

    render(
      <LineItemList
        lineItems={lineItems}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );

    fireEvent.click(screen.getAllByText("Remove")[0]);

    expect(mockSetLineItems).toHaveBeenCalledWith([
      { description: "Item 2", quantity: "3", rate: "5", total: 15 },
    ]);
  });

  it("displays the 'Add Line Item' button", () => {
    render(
      <LineItemList
        lineItems={[]}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );

    const addButton = screen.getByText("Add Line Item");
    expect(addButton).toBeInTheDocument();
  });

  it("does not render the 'Line Items' title when no line items are present", () => {
    render(
      <LineItemList
        lineItems={[]}
        setLineItems={mockSetLineItems}
        lineItemFields={lineItemFields}
      />
    );

    const title = screen.queryByText("Line Items");
    expect(title).not.toBeInTheDocument();
  });
});
