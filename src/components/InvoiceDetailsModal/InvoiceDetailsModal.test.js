import React from "react";
import { render, screen } from "@testing-library/react";
import { InvoiceDetailsModal } from "./InvoiceDetailsModal";
import "@testing-library/jest-dom";

const mockInvoice = {
  field1: "Title",
  field2: "Amount",
  lineItems: [
    { description: "Item 1", quantity: 2, rate: 50, total: 100 },
    { description: "Item 2", quantity: 1, rate: 100, total: 100 },
  ],
};

describe("InvoiceDetailsModal", () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal with invoice details", () => {
    render(<InvoiceDetailsModal invoice={mockInvoice} onClose={onCloseMock} />);

    expect(screen.getByText("Invoice Details")).toBeInTheDocument();

    const detailFields = [
      { name: "field1", label: "Title" },
      { name: "field2", label: "Amount" },
    ];

    detailFields.forEach((field) => {
      expect(screen.getByText(field.label)).toBeInTheDocument();
      expect(screen.getByText(mockInvoice[field.name])).toBeInTheDocument();
    });
  });

  test("renders line items if present", () => {
    render(<InvoiceDetailsModal invoice={mockInvoice} onClose={onCloseMock} />);

    expect(screen.getByText("Line Items")).toBeInTheDocument();
    mockInvoice.lineItems.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.quantity.toString())).toBeInTheDocument();
      expect(screen.getByText(/\$50\.00/)).toBeInTheDocument(); // Flexible matching for the rate
      expect(screen.getAllByText(/\$100\.00/)).toHaveLength(3); // Assert two occurrences of $100.00
    });
  });

  test("does not render line items section if no line items are present", () => {
    const invoiceWithoutLineItems = { ...mockInvoice, lineItems: [] };
    render(
      <InvoiceDetailsModal
        invoice={invoiceWithoutLineItems}
        onClose={onCloseMock}
      />
    );
    expect(screen.queryByText("Line Items")).not.toBeInTheDocument();
  });

  test("closes the modal when the close button is clicked", () => {
    render(<InvoiceDetailsModal invoice={mockInvoice} onClose={onCloseMock} />);
    screen.getByText("Close").click();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
