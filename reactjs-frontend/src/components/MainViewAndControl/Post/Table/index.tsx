import "./Table.scss";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Table as ReactstrapTable } from "reactstrap";

import { AppContext, MainPageContext } from "../../../../contexts";
import { MainPageContextType } from "../../../../contexts/types";
import DeletePopup from "./DeletePopup";
import Pagination from "./Pagination";
import { TableProps } from "./types";

function Table({ entryFromDate }: TableProps): JSX.Element {
    const mounted = useRef<boolean>();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [rowLength, setRowLength] = useState(0);
    const [entryArray, setEntryArray] = useState<typeof entryFromDate>([]);
    const { deleteDateEntry } = useContext<MainPageContextType>(MainPageContext);
    const { setRouteLock } = useContext(AppContext);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        const entryArrayCopy = [...entryFromDate] as typeof entryFromDate;
        setRowLength(entryFromDate.length);
        setEntryArray(entryArrayCopy);
        setPage(0);
    }, [entryFromDate]);

    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const goToEditPage = useCallback(
        (idOfEntry) => {
            const entries = [...entryFromDate];
            /* eslint-disable */
            const selectedEntry = entries.filter((entry) => entry._id === idOfEntry)[0];
            setRouteLock(false);
            navigate(`/editPage`, { state: { fromTable: selectedEntry } });
            // mainPageContext.history.push({
            //     pathname: `/editPage`,
            //     fromTable: selectedEntry
            // });
        },
        [entryArray, setRouteLock]
    );

    const getId = useCallback(
        (id) => {
            setId(id);
            setIsOpen(true);
        },
        [setId, setIsOpen]
    );

    const setModalOption = useCallback(() => {
        if (mounted) {
            setIsOpen(!isOpen);
        }
    }, []);

    const deleteEntry = useCallback(() => {
        deleteDateEntry(id, setModalOption);
    }, [id, deleteDateEntry, setModalOption]);

    return (
        <>
            <DeletePopup isOpen={isOpen} modalHandler={setModalOption} deleteDateEntry={deleteEntry} />
            <ReactstrapTable hover responsive borderless className="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entryArray && rowsPerPage > 0
                        ? entryArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
                              <React.Fragment key={index}>
                                  <tr>
                                      <td>{entry.type}</td>
                                      <td>&#8377;{entry.amount}</td>
                                      <td>
                                          <Button
                                              size="sm"
                                              outline
                                              color="info"
                                              onClick={() => {
                                                  goToEditPage(entry._id);
                                              }}
                                          >
                                              Edit
                                          </Button>
                                          &nbsp;
                                          <Button
                                              size="sm"
                                              outline
                                              color="danger"
                                              onClick={() => {
                                                  getId(entry._id);
                                              }}
                                          >
                                              Delete
                                          </Button>
                                      </td>
                                  </tr>
                              </React.Fragment>
                          ))
                        : null}
                </tbody>
            </ReactstrapTable>
            {rowLength > 2 ? (
                <Pagination
                    entryFromDate={entryFromDate}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    rowLength={rowLength}
                />
            ) : (
                <></>
            )}
        </>
    );
}

export default Table;
