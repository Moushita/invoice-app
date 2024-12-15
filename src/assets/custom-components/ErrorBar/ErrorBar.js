import React from "react";
import "./ErrorBar.css";

export const ErrorBar = ({ message }) => (
  <div className="error-bar">{message}</div>
);
