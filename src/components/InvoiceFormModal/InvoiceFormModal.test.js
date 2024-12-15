import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InvoiceFormModal } from "./InvoiceFormModal";
import "@testing-library/jest-dom";
import { createInvoiceFields } from "../../assets/constants/InvoiceFormConfig";

describe("InvoiceFormModal", () => {
  const mockStore = {
    addInvoice: jest.fn(),
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders invoice form fields", () => {
    render(<InvoiceFormModal store={mockStore} onClose={mockOnClose} />);

    createInvoiceFields.forEach((field) => {
      if (field.placeholder) {
        const inputElement = screen.getByPlaceholderText(field.placeholder);
        expect(inputElement).toBeInTheDocument();
      }
    });
  });

  it("updates field values correctly", () => {
    render(<InvoiceFormModal store={mockStore} onClose={mockOnClose} />);

    const descriptionField = screen.getByPlaceholderText("Description");
    fireEvent.change(descriptionField, { target: { value: "Test Invoice" } });
    expect(descriptionField.value).toBe("Test Invoice");

    const amountField = screen.getByPlaceholderText("Amount");
    fireEvent.change(amountField, { target: { value: "100" } });
    expect(amountField.value).toBe("100");
  });

  it("shows error message when validation fails", async () => {
    render(<InvoiceFormModal store={mockStore} onClose={mockOnClose} />);

    const saveButton = screen.getByText("Save Invoice");
    fireEvent.click(saveButton);

    const errorMessage = await screen.findByText("Please enter a description.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("saves invoice and resets form on successful submission", async () => {
    render(<InvoiceFormModal store={mockStore} onClose={mockOnClose} />);

    const descriptionField = screen.getByPlaceholderText("Description");
    fireEvent.change(descriptionField, { target: { value: "Test Invoice" } });

    const amountField = screen.getByPlaceholderText("Amount");
    fireEvent.change(amountField, { target: { value: "100" } });

    const saveButton = screen.getByText("Save Invoice");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockStore.addInvoice).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    expect(descriptionField.value).toBe("");
    expect(amountField.value).toBe("");
  });

  it("closes modal when cancel button is clicked", () => {
    render(<InvoiceFormModal store={mockStore} onClose={mockOnClose} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
