import React, { useEffect, useState, useRef } from "react";
import "./InvoiceList.css";

export const InvoiceList = ({ store, onViewDetails }) => {
  const [invoices, setInvoices] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const updateHandler = () => setInvoices([...store.getInvoices()]);
    setInvoices([...store.getInvoices()]);
    store.on("update", updateHandler);
    return () => store.off("update", updateHandler);
  }, [store]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const sendInvoiceEmail = (invoice) => {
    console.log(`Sending invoice via email...`);
    setTimeout(() => {
      alert(`Invoice sent successfully via email!`);
    }, 1000);
  };

  return (
    <div className="invoice-list">
      {invoices.length === 0 ? (
        <p>No invoices created yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, index) => (
              <tr
                key={inv.id}
                className={
                  inv.status === "overdue"
                    ? "overdue-row"
                    : inv.status === "paid"
                    ? "paid-row"
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>{inv.description}</td>
                <td>₹{inv.amount}</td>
                <td>{inv.dueDate}</td>
                <td>{inv.status}</td>
                <td>{inv.note}</td>
                <td>
                  <div
                    className="dropdown"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <button
                      className="dropdown-toggle"
                      onClick={() => toggleDropdown(index)}
                    >
                      ⋮
                    </button>
                    {openDropdown === index && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            onViewDetails(inv);
                            setOpenDropdown(null);
                          }}
                        >
                          View
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            sendInvoiceEmail(inv);
                            setOpenDropdown(null);
                          }}
                        >
                          Send via Email
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
