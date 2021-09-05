import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE } from "../../../Redux/Constants";
import {
  TransactionEntry,
  defineTotalAmountEntriesOfTheTable,
} from "../../../Redux/transactionsSlice";
import ActionButtons from "../ActionButtons/ActionButtons";
import { fileRequestFinished } from "../../../Redux/fileBlobSlice";
import Papa from "papaparse";
import { saveAs } from "file-saver";

function TransactionsTable() {
  const dispatch = useAppDispatch();
  const transactionsByStatus = useAppSelector(
    (state) => state.transactions.transactionListByStatus
  );
  const exportTransactionsRequest = useAppSelector(
    (state) => state.fileBlob.fileRequested
  );
  const statusFilters = useAppSelector(
    (state) => state.transactions.statusFilters
  );
  const typeFilters = useAppSelector((state) => state.transactions.typeFilters);

  let filteredTransactions = {};

  statusFilters.forEach((statusFilter) => {
    if (typeFilters.length === 2) {
      filteredTransactions = { ...filteredTransactions, ...transactionsByStatus[statusFilter] };
    } else {
      const filteredList = Object.entries(transactionsByStatus[statusFilter]).filter(
        (transEntry) => transEntry[1].Type === typeFilters[0]
      );
      filteredTransactions = {
        ...filteredTransactions,
        ...Object.fromEntries(filteredList),
      };
    }
  });

  const transactionListValues: Array<TransactionEntry> =
    Object.values(filteredTransactions);

  useEffect(() => {
    if (exportTransactionsRequest) {
      const unparsedTableData = Papa.unparse(transactionListValues);
      const blob = new Blob([unparsedTableData], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "transaction.csv");
      dispatch(fileRequestFinished());
    }
  }, [exportTransactionsRequest]);
  useEffect(() => {
    dispatch(defineTotalAmountEntriesOfTheTable(transactionListValues.length));
  });

  const currentTablePage = useAppSelector(
    (state) => state.transactions.currentTablePage
  );

  let header: JSX.Element[] = [];
  const tableData: JSX.Element[] = transactionListValues
    .slice(
      (currentTablePage - 1) * AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE,
      currentTablePage * AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE
    )
    .map((arrEntryRow) => {
      const arrEntryRowCells = Object.values(arrEntryRow);
      const transactionRow = arrEntryRowCells.map((cellEntry, index) => (
        <td key={cellEntry + String(currentTablePage - 1) + String(index)}>
          {cellEntry}
        </td>
      ));
      return (
        <tr key={arrEntryRow.TransactionId + "trt"}>
          {transactionRow}
          <td>
            <ActionButtons
              status={
                arrEntryRow.Status as "Pending" | "Completed" | "Cancelled"
              }
              id={+arrEntryRow.TransactionId}
            />
          </td>
        </tr>
      );
    });

  if (transactionListValues.length) {
    const headerCaptions = Object.keys(transactionListValues[0]);
    header = headerCaptions.map((caption, index) => (
      <th key={caption + index}>{caption}</th>
    ));
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {header}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </Table>
  );
}

export default TransactionsTable;
