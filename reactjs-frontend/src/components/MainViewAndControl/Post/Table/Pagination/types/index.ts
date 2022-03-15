import { ChangeEvent, MouseEvent } from "react";

import { Expense, Income } from "../../../../../../store/mainPage/types";

export type PaginationProps = {
    entryFromDate: Expense[] | Income[] | [];
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: MouseEvent | KeyboardEvent | null, page: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
    rowLength: number;
};
