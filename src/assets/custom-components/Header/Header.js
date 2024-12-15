import React from "react";
import "./Header.css";

export const Header = ({ headerName }) => {
  return (
    <header className="invoice-app-header">
      <h1>{headerName}</h1>
    </header>
  );
};
