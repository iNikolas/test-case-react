import { createSelector } from "reselect";
import { useAppSelector } from "../Redux/hooks";
import { TransactionEntry } from "../Redux/transactionsSlice";
import { AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE } from "../Redux/Constants";
import ActionButtons from "../Components/Mainpage/ActionButtons/ActionButtons";
import React from "react";

const selectTransactionsByStatus = () =>
  useAppSelector((state) => state.transactions.transactionListByStatus);
const selectStatusFilters = () =>
  useAppSelector((state) => state.transactions.statusFilters);
const selectTypeFilters = () =>
  useAppSelector((state) => state.transactions.typeFilters);
export const selectExportTransactionsRequest = () =>
  useAppSelector((state) => state.fileBlob.fileRequested);

export const selectFilteredTransactions = createSelector(
  selectTransactionsByStatus,
  selectStatusFilters,
  selectTypeFilters,
  (transactionsByStatus, statusFilters, typeFilters) => {
    let filteredTransactions = {};

    statusFilters.forEach((statusFilter) => {
      if (typeFilters.length === 2) {
        filteredTransactions = {
          ...filteredTransactions,
          ...transactionsByStatus[statusFilter],
        };
      } else {
        if (transactionsByStatus[statusFilter]) {
          const filteredList = Object.entries(
            transactionsByStatus[statusFilter]
          ).filter((transEntry) => transEntry[1].Type === typeFilters[0]);
          filteredTransactions = {
            ...filteredTransactions,
            ...Object.fromEntries(filteredList),
          };
        }
      }
    });
    return filteredTransactions;
  }
);

export const selectTransactionListValues = createSelector(
  selectFilteredTransactions,
  (filteredTransactions): Array<TransactionEntry> => {
    return Object.values(filteredTransactions);
  }
);

const selectCurrentTablePage = () =>
  useAppSelector((state) => state.transactions.currentTablePage);

export const selectTableData = createSelector(
  selectTransactionListValues,
  selectCurrentTablePage,
  (transactionListValues, currentTablePage): JSX.Element[] => {
    return transactionListValues
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
  }
);

export const selectHeaderCaptions = createSelector(
  selectTransactionListValues,
  (transactionListValues): JSX.Element[] => {
    if (transactionListValues.length) {
      return Object.keys(transactionListValues[0]).map((caption, index) => (
        <th key={caption + index}>{caption}</th>
      ));
    }
    return [];
  }
);
