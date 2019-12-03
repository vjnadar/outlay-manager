import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

const Pagination = props => {
  return (
    <table>
      <tbody>
        <tr>
          <TablePagination
            rowsPerPageOptions={[1, 2, 3]}
            colSpan={3}
            count={props.rowLength}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onChangePage={props.handleChangePage}
            onChangeRowsPerPage={props.handleChangeRowsPerPage}
          />
        </tr>
      </tbody>
    </table>
  );
};
export default Pagination;
