import React, { useState } from "react";
import {
  createInvoiceFields,
  lineItemFields,
} from "../../assets/constants/InvoiceFormConfig";
import { LineItemList } from "../LineItemList/LineItemList";
import { GeneralField } from "../../assets/custom-components/GeneralField/GeneralField";
import { ErrorBar } from "../../assets/custom-components/ErrorBar/ErrorBar";
import "./InvoiceFormModal.css";

export const InvoiceFormModal = ({ store, onClose }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [lineItems, setLineItems] = useState([]);
  const [error, setError] = useState("");

  const handleFieldChange = (field, value) => {
    const fieldSetters = {
      description: setDescription,
      amount: (val) => {
        setError(isNaN(val) || parseFloat(val) < 0 ? "Invalid amount" : "");
        setAmount(val);
      },
      note: setNote,
      dueDate: setDueDate,
      status: setStatus,
    };
    fieldSetters[field]?.(value);
  };

  const validateInvoice = () => {
    if (!description) return "Please enter a description.";
    if (lineItems.length === 0 && !amount) return "Please enter an amount.";
    if (lineItems.length === 0 && (isNaN(amount) || parseFloat(amount) <= 0))
      return "Amount must be a valid positive number.";
    if (
      lineItems.some(
        (item) => !item.description || !item.quantity || !item.rate
      )
    )
      return "Complete all line items before saving.";
    return "";
  };

  const handleSaveInvoice = () => {
    const validationError = validateInvoice();
    if (validationError) {
      setError(validationError);
      return;
    }

    const today = new Date();
    const dueDateValue =
      dueDate ||
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
    const calculatedStatus =
      dueDate && new Date(dueDate) < today ? "overdue" : "pending";

    const newInvoice = {
      id: Date.now(),
      description,
      amount: lineItems.length > 0 ? invoiceTotal : parseFloat(amount),
      note,
      dueDate: dueDateValue,
      status: status || calculatedStatus,
      lineItems,
    };

    store.addInvoice(newInvoice);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setNote("");
    setDueDate("");
    setStatus("");
    setLineItems([]);
    setError("");
  };

  const invoiceTotal = lineItems.reduce((total, item) => total + item.total, 0);

  return (
    <div className="modal">
      <div className="modal-content scrollable">
        <h2>Create Invoice</h2>
        {error && <ErrorBar message={error} />}
        {createInvoiceFields.map((field) => (
          <GeneralField
            key={field.name}
            field={field}
            value={
              field.name === "description"
                ? description
                : field.name === "amount"
                ? amount
                : field.name === "note"
                ? note
                : field.name === "dueDate"
                ? dueDate
                : field.name === "status"
                ? status
                : ""
            }
            onChange={handleFieldChange}
            lineItems={lineItems}
          />
        ))}
        <LineItemList
          lineItems={lineItems}
          setLineItems={setLineItems}
          lineItemFields={lineItemFields}
        />
        <div className="modal-buttons">
          <button className="save-button" onClick={handleSaveInvoice}>
            Save Invoice
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
