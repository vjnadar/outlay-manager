import React from "react";
import { Table } from "reactstrap";

const GrandTotalTable = props => {
  return (
    <Table borderless dark hover>
      <thead>
        <tr>
          <th>Total Income</th>
          <th>Total Expenditure</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>&#8377;{props.income}</td>
          <td>&#8377;{props.expense}</td>
          <td>&#8377;{props.totalBalance}</td>
        </tr>
      </tbody>
    </Table>
  );
};
export default GrandTotalTable;
