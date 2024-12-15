import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GeneralField } from "./GeneralField";
import "@testing-library/jest-dom";

describe("GeneralField", () => {
  test("renders an input field when type is 'text'", () => {
    const field = {
      type: "text",
      name: "username",
      placeholder: "Enter your username",
    };
    const value = "JohnDoe";
    const onChange = jest.fn();

    render(<GeneralField field={field} value={value} onChange={onChange} />);

    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(value);

    fireEvent.change(inputElement, { target: { value: "JaneDoe" } });
    expect(onChange).toHaveBeenCalledWith("username", "JaneDoe");
  });

  test("renders a select field when type is 'select'", () => {
    const field = {
      type: "select",
      name: "country",
      options: [
        { label: "USA", value: "usa" },
        { label: "Canada", value: "canada" },
      ],
    };
    const value = "usa";
    const onChange = jest.fn();

    render(<GeneralField field={field} value={value} onChange={onChange} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.value).toBe(value);

    fireEvent.change(selectElement, { target: { value: "canada" } });
    expect(onChange).toHaveBeenCalledWith("country", "canada");
  });

  test("renders a textarea when type is 'textarea'", () => {
    const field = {
      type: "textarea",
      name: "description",
      placeholder: "Enter your description",
    };
    const value = "This is a description.";
    const onChange = jest.fn();

    render(<GeneralField field={field} value={value} onChange={onChange} />);

    const textareaElement = screen.getByPlaceholderText(
      /Enter your description/i
    );
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement.value).toBe(value);

    fireEvent.change(textareaElement, {
      target: { value: "Updated description." },
    });
    expect(onChange).toHaveBeenCalledWith(
      "description",
      "Updated description."
    );
  });

  test("does not render the field if the condition function returns false", () => {
    const field = {
      type: "text",
      name: "username",
      placeholder: "Enter your username",
      condition: () => false,
    };
    const value = "JohnDoe";
    const onChange = jest.fn();

    render(
      <GeneralField
        field={field}
        value={value}
        onChange={onChange}
        lineItems={[]}
      />
    );

    const inputElement = screen.queryByPlaceholderText(/Enter your username/i);
    expect(inputElement).not.toBeInTheDocument();
  });

  test("renders the field if the condition function returns true", () => {
    const field = {
      type: "text",
      name: "username",
      placeholder: "Enter your username",
      condition: () => true,
    };
    const value = "JohnDoe";
    const onChange = jest.fn();

    render(
      <GeneralField
        field={field}
        value={value}
        onChange={onChange}
        lineItems={[]}
      />
    );

    const inputElement = screen.getByPlaceholderText(/Enter your username/i);
    expect(inputElement).toBeInTheDocument();
  });
});
