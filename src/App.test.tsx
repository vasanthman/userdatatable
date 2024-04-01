import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders SimpleTable with data", () => {
  render(<App />);
  
  const tableTitle = screen.getByText(/Simple Table/i);
  expect(tableTitle).toBeInTheDocument();

  const employeeCell = screen.getByText(/Aruni Jayawardena/i);
  expect(employeeCell).toBeInTheDocument();

  const leaveTypeCell = screen.getByText(/Casual Leave/i);
  expect(leaveTypeCell).toBeInTheDocument();

  const managerDecisionCell = screen.getByText(/Approved/i);
  expect(managerDecisionCell).toBeInTheDocument();
});
