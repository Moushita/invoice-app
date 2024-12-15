# invoice-app
**FEATURES:**

**Create Invoices:**
- Add essential details such as Description, Amount, Notes, Due Date, and Payment Status.
- Include line items for more detailed invoices.

**View Invoices:**
- View a list of all invoices in a tabular format.
- Click on View to see detailed information about each invoice.

**Add Notes:**
- Add custom notes to the invoice, such as payment instructions, where to send checks, or any required additional details.

**View Invoice status:**
- All invoices have a default status of `pending`
- If the current date is past due date, the invoice is marked `overdue`
- Users can set status as `paid`

**Due Date for Invoices:**
- By default, invoices are assigned a due date one week later to the current date
- Users can also input a custom due date

**Send Invoice Via Email:**
- Currently only shows an alert saying `Invoice sent via mail`
- Can be made working in the future.

**Validation for Inputs:**
- Does not let the user save the invoice without adding a description or a proper amount (alphabets, negatives not allowed)
- If adding line items, does not let the user save the invoice without filling all required inputs of line items.

**Responsive Design:**
- The app is fully responsive and can be accessed on various devices, including desktops, tablets, and mobile phones.

**Unit Tests:**
- Comprehensive unit tests to ensure functionality and reliability of the app.

**STEPS TO RUN:**
- `npm install`
- `npm start`

**FOR UNIT TESTS:**
- run `npm test`
