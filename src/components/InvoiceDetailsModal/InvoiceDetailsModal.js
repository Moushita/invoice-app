import React from "react";
import { detailFields } from "../../assets/constants/InvoiceFormConfig";
import "./InvoiceDetailsModal.css";

export const InvoiceDetailsModal = ({ invoice, onClose }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal") {
      onClose();
    }
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-labelledby="invoice-details-title"
      onClick={handleBackgroundClick}
    >
      <div className="modal-content scrollable">
        <h2 id="invoice-details-title">Invoice Details</h2>

        <table className="invoice-table">
          <caption>General Invoice Details</caption>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {detailFields.map((field) => (
              <tr key={field.name}>
                <td>
                  <strong>{field.label}</strong>
                </td>
                <td>{invoice[field.name] ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoice.lineItems?.length > 0 && (
          <>
            <h3>Line Items</h3>
            <table className="line-items-table">
              <caption>Invoice Line Items</caption>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.rate)}</td>
                    <td>{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
