import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InvoiceList } from "./InvoiceList";
import "@testing-library/jest-dom";

describe("InvoiceList", () => {
  const mockStore = {
    getInvoices: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  };

  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders no invoices message when there are no invoices", () => {
    mockStore.getInvoices.mockReturnValue([]);

    render(<InvoiceList store={mockStore} onViewDetails={mockOnViewDetails} />);

    const noInvoicesMessage = screen.getByText("No invoices created yet.");
    expect(noInvoicesMessage).toBeInTheDocument();
  });

  it("renders the list of invoices correctly", () => {
    const invoices = [
      {
        id: 1,
        description: "Test Invoice 1",
        amount: 100,
        dueDate: "2024-12-25",
        status: "pending",
        note: "Test note 1",
      },
      {
        id: 2,
        description: "Test Invoice 2",
        amount: 200,
        dueDate: "2024-12-30",
        status: "paid",
        note: "Test note 2",
      },
    ];

    mockStore.getInvoices.mockReturnValue(invoices);

    render(<InvoiceList store={mockStore} onViewDetails={mockOnViewDetails} />);

    const invoiceRows = screen.getAllByRole("row");
    expect(invoiceRows).toHaveLength(invoices.length + 1); // including header row

    expect(screen.getByText("Test Invoice 1")).toBeInTheDocument();
    expect(screen.getByText("₹100")).toBeInTheDocument();
    expect(screen.getByText("2024-12-25")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText("Test note 1")).toBeInTheDocument();
  });

  it("handles dropdown toggle correctly", () => {
    const invoices = [
      {
        id: 1,
        description: "Test Invoice 1",
        amount: 100,
        dueDate: "2024-12-25",
        status: "pending",
        note: "Test note 1",
      },
    ];

    mockStore.getInvoices.mockReturnValue(invoices);

    render(<InvoiceList store={mockStore} onViewDetails={mockOnViewDetails} />);

    const dropdownButton = screen.getByText("⋮");
    fireEvent.click(dropdownButton);

    const dropdownMenu = screen.getByText("View");
    expect(dropdownMenu).toBeInTheDocument();

    fireEvent.click(dropdownButton);
    expect(dropdownMenu).not.toBeInTheDocument();
  });

  it("calls onViewDetails when 'View' button is clicked", () => {
    const invoices = [
      {
        id: 1,
        description: "Test Invoice 1",
        amount: 100,
        dueDate: "2024-12-25",
        status: "pending",
        note: "Test note 1",
      },
    ];

    mockStore.getInvoices.mockReturnValue(invoices);

    render(<InvoiceList store={mockStore} onViewDetails={mockOnViewDetails} />);

    fireEvent.click(screen.getByText("⋮"));
    fireEvent.click(screen.getByText("View"));

    expect(mockOnViewDetails).toHaveBeenCalledWith(invoices[0]);
  });

  it("hides dropdown menu when clicking outside", () => {
    const invoices = [
      {
        id: 1,
        description: "Test Invoice 1",
        amount: 100,
        dueDate: "2024-12-25",
        status: "pending",
        note: "Test note 1",
      },
    ];

    mockStore.getInvoices.mockReturnValue(invoices);

    render(<InvoiceList store={mockStore} onViewDetails={mockOnViewDetails} />);

    const dropdownButton = screen.getByText("⋮");
    fireEvent.click(dropdownButton);

    const dropdownMenu = screen.getByText("View");
    expect(dropdownMenu).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(dropdownMenu).not.toBeInTheDocument();
  });
});
