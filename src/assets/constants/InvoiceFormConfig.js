export const createInvoiceFields = [
  {
    type: "text",
    name: "description",
    placeholder: "Description",
    value: "",
    onChange: "setDescription",
  },
  {
    type: "number",
    name: "amount",
    placeholder: "Amount",
    value: "",
    onChange: "setAmount",
    condition: (lineItems) => lineItems.length === 0,
  },
  {
    type: "textarea",
    name: "note",
    placeholder: "Notes",
    value: "",
    onChange: "setNote",
  },
  {
    type: "date",
    name: "dueDate",
    placeholder: "Due Date",
    value: "",
    onChange: "setDueDate",
  },
  {
    type: "select",
    name: "status",
    options: [
      { value: "", label: "Default" },
      { value: "paid", label: "Paid" },
      { value: "pending", label: "Pending" },
      { value: "overdue", label: "Overdue" },
    ],
    value: "",
    onChange: "setStatus",
  },
];

export const lineItemFields = [
  { type: "text", name: "description", placeholder: "Description" },
  { type: "number", name: "quantity", placeholder: "Quantity" },
  { type: "number", name: "rate", placeholder: "Rate" },
];

export const detailFields = [
  { label: "Title", name: "description" },
  { label: "Amount", name: "amount" },
  { label: "Notes", name: "note" },
  { label: "Due Date", name: "dueDate" },
  { label: "Status", name: "status" },
];
