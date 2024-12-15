import React from "react";
import "./LineItemList.css";
import { GeneralField } from "../../assets/custom-components/GeneralField/GeneralField";

export const LineItemList = ({ lineItems, setLineItems, lineItemFields }) => {
  const updateLineItem = (index, field, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][field] = value;
    if (["quantity", "rate"].includes(field)) {
      const quantity = parseFloat(updatedLineItems[index].quantity) || 0;
      const rate = parseFloat(updatedLineItems[index].rate) || 0;
      updatedLineItems[index].total = quantity * rate;
    }
    setLineItems(updatedLineItems);
  };

  const removeLineItem = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: "", rate: "", total: 0 },
    ]);
  };

  const invoiceTotal = lineItems.reduce((total, item) => total + item.total, 0);

  return (
    <div>
      {lineItems.length > 0 && <h3>Line Items</h3>}
      {lineItems.map((item, index) => (
        <div key={index} className="line-item">
          {lineItemFields.map((field) => (
            <GeneralField
              key={field.name}
              field={field}
              value={item[field.name]}
              onChange={(name, value) => updateLineItem(index, name, value)}
              lineItems={lineItems} // Pass lineItems for conditions if needed
            />
          ))}
          <span>Total: ${item.total.toFixed(2)}</span>
          <button
            className="remove-button"
            onClick={() => removeLineItem(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button className="add-button" onClick={addLineItem}>
        Add Line Item
      </button>

      {lineItems.length > 0 && (
        <div className="total-box">
          <h4>Combined Total: ${invoiceTotal.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
};
