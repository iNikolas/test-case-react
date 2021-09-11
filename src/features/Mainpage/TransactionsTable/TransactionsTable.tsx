import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import {
  TransactionEntry,
  defineTotalAmountEntriesOfTheTable,
} from "../transactionsSlice";
import { fileRequestFinished } from "../ExportButton/fileBlobSlice";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  selectExportTransactionsRequest,
  selectHeaderCaptions,
  selectTableData,
  selectTransactionListValues,
} from "./transactionsTableSelectors";

function TransactionsTable() {
  const dispatch = useAppDispatch();
  const isExportTransactionsRequest = selectExportTransactionsRequest();
  const transactionListValues: Array<TransactionEntry> = useAppSelector(
    selectTransactionListValues
  );
  const header: JSX.Element[] = useAppSelector(selectHeaderCaptions);
  const tableData: JSX.Element[] = useAppSelector(selectTableData);

  useEffect(() => {
    if (isExportTransactionsRequest) {
      const unparsedTableData = Papa.unparse(transactionListValues);
      const blob = new Blob([unparsedTableData], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "transaction.csv");
      dispatch(fileRequestFinished());
    }
  }, [isExportTransactionsRequest]);
  useEffect(() => {
    dispatch(defineTotalAmountEntriesOfTheTable(transactionListValues.length));
  });

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
