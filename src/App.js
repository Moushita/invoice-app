import React, { useState } from "react";
import { InvoiceList } from "./components/InvoiceList/InvoiceList";
import { InvoiceFormModal } from "./components/InvoiceFormModal/InvoiceFormModal";
import { InvoiceDetailsModal } from "./components/InvoiceDetailsModal/InvoiceDetailsModal";
import { Header } from "./assets/custom-components/Header/Header";

export const App = ({ store }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeInvoiceDetails = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="app-container">
      <Header headerName="Invoicing App" />
      <div className="action-bar">
        <button onClick={toggleModal} className="action-button">
          Create Invoice
        </button>
      </div>
      <InvoiceList store={store} onViewDetails={openInvoiceDetails} />
      {isModalOpen && <InvoiceFormModal store={store} onClose={toggleModal} />}
      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          onClose={closeInvoiceDetails}
        />
      )}
    </div>
  );
};
