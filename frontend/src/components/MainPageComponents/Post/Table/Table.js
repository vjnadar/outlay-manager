import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Table as ReactstrapTable, Button } from "reactstrap";

import DeletePopup from "./DeletePopup/DeletePopup";
import { MainPageContext, AppContext } from "../../../../contexts/contexts";
import Pagination from "../../Pagination/Pagination";

import "./Table.scss";

const Table = (props) => {
  const mounted = useRef();
  const [modal, setModal] = useState(false);
  const [_id, set_Id] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [rowLength, setRowLength] = useState(0);
  const [entryArray, setEntryArray] = useState([]);
  const mainPageContext = useContext(MainPageContext);
  const appContext = useContext(AppContext);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const entryArrayCopy = [...props.entryFromDate];
    setRowLength(props.entryFromDate.length);
    setEntryArray(entryArrayCopy);
    setPage(0);
  }, [props.entryFromDate]);

  const handleChangePage = useCallback((_ = undefined, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const goToEditPage = useCallback(
    (id) => {
      const entries = [...props.entryFromDate];
      let selectedEntry = entries.filter((entry) => entry._id === id)[0];
      appContext.lockRoute(false);
      mainPageContext.history.push({
        pathname: `/editPage`,
        fromTable: selectedEntry,
      });
    },
    [props, appContext, mainPageContext]
  );

  const getId = useCallback(
    (id) => {
      set_Id(id);
      setModal(true);
    },
    [set_Id, setModal]
  );

  const setModalOption = useCallback(() => {
    if (mounted) {
      setModal((prevModalValue) => {
        return !prevModalValue;
      });
    }
  }, []);

  const deleteDateEntry = useCallback(() => {
    mainPageContext.deleteDateEntry(_id, setModalOption);
  }, [_id, mainPageContext, setModalOption]);

  return (
    <>
      <DeletePopup
        modal={modal}
        modalHandler={setModalOption}
        deleteDateEntry={deleteDateEntry}
      />
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
            ? entryArray
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((entry, index) => (
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
          entryFromDate={props.entryFromDate}
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
};

export default Table;
