import React from "react";
import "./SimpleTable.css";
import Label from "./Label";

interface ColumnDef {
  headerName: string;
  field: string;
  cellRenderer?: (data: Record<string, any>) => React.ReactNode;
}

interface SimpleTableProps {
  columnDefs: ColumnDef[];
  data: Record<string, any>[];
}

const decisionColumns = ["manager_decision", "other_decision_column"];

const SimpleTable: React.FC<SimpleTableProps> = ({ columnDefs, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columnDefs.map((column, index) => (
            <th key={index}>{column.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columnDefs.map((column, colIndex) => (
              <td key={colIndex} data-title={column.headerName}>
                {decisionColumns.includes(column.field) ? (
                  <Label decision={row[column.field]} />
                ) : column.cellRenderer ? (
                  column.cellRenderer(row)
                ) : (
                  row[column.field]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;
