import TablePagination from "@material-ui/core/TablePagination";
import React from "react";

import { PaginationProps } from "./types";

function Pagination({ rowLength, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }: PaginationProps): JSX.Element {
    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={[1, 2, 3]}
            colSpan={3}
            count={rowLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
        />
    );
}
export default Pagination;
