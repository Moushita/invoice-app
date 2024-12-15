import { EventEmitter } from "events";

class InvoiceStoreClass extends EventEmitter {
  constructor() {
    super();
    this.invoices = [];
  }

  getInvoices() {
    return this.invoices;
  }

  addInvoice(invoice) {
    this.invoices.push(invoice);
    this.emit("update");
  }
}

export const InvoiceStore = new InvoiceStoreClass();
