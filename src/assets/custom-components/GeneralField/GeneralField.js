import React from "react";
import "./GeneralField.css";

export const GeneralField = ({ field, value, onChange, lineItems }) => {
  if (field.condition && !field.condition(lineItems)) return null;
  const handleChange = (e) => onChange(field.name, e.target.value);
  return field.type === "select" ? (
    <select className="general-input" value={value} onChange={handleChange}>
      {field.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ) : field.type === "textarea" ? (
    <textarea
      className="general-input"
      placeholder={field.placeholder}
      value={value}
      onChange={handleChange}
    />
  ) : (
    <input
      className="general-input"
      type={field.type}
      placeholder={field.placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
