import { Table } from "reactstrap";

import { GrandTotalTableProps } from "./types";

function GrandTotalTable({ income, expense, totalBalance }: GrandTotalTableProps) {
    return (
        <Table borderless dark hover>
            <thead>
                <tr>
                    <th>Total Income</th>
                    <th>Total Expense</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>&#8377;{income}</td>
                    <td>&#8377;{expense}</td>
                    <td>&#8377;{totalBalance}</td>
                </tr>
            </tbody>
        </Table>
    );
}
export default GrandTotalTable;
