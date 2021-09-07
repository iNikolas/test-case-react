import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangeStatusPayloadActionType } from "./saga";

export interface TransactionEntry {
  Amount: string;
  ClientName: string;
  Status: "Completed" | "Cancelled" | "Pending";
  TransactionId: string;
  Type: "Withdrawal" | "Refill";
}

interface TransactionListByStatus {
  Cancelled: {
    [index: string]: TransactionEntry;
  };
  Completed: {
    [index: string]: TransactionEntry;
  };
  Pending: {
    [index: string]: TransactionEntry;
  };
}

type StatusFilters = Array<"Completed" | "Cancelled" | "Pending">;
type TypeFilters = Array<"Withdrawal" | "Refill">;

interface TransactionsState {
  transactionStatus: "initial" | "importing" | "imported" | "error";
  currentTablePage: number;
  totalAmountEntriesOfTheTable: number;
  transactionListByStatus: TransactionListByStatus;
  statusFilters: StatusFilters;
  typeFilters: TypeFilters;
}

const initialState: TransactionsState = {
  transactionStatus: "initial",
  currentTablePage: 1,
  totalAmountEntriesOfTheTable: 0,
  transactionListByStatus: {
    Cancelled: {
      "1": {
        Amount: "",
        ClientName: "",
        Status: "Completed",
        TransactionId: "",
        Type: "Withdrawal",
      },
    },
    Completed: {
      "1": {
        Amount: "",
        ClientName: "",
        Status: "Completed",
        TransactionId: "",
        Type: "Withdrawal",
      },
    },
    Pending: {
      "1": {
        Amount: "",
        ClientName: "",
        Status: "Completed",
        TransactionId: "",
        Type: "Withdrawal",
      },
    },
  },
  statusFilters: ["Completed", "Cancelled", "Pending"],
  typeFilters: ["Withdrawal", "Refill"],
};

const statusesForLookup = <StatusFilters>["Completed", "Cancelled", "Pending"];

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    saveFilteredTransactionsToState: (
      state,
      action: PayloadAction<TransactionListByStatus>
    ) => {
      state.transactionListByStatus = action.payload;
      state.transactionStatus = "imported";
    },
    changeCurrentTablePage: (state, action: PayloadAction<number>) => {
      state.currentTablePage = action.payload;
    },
    awaitingForData: (state) => {
      state.transactionStatus = "importing";
    },
    defineStatusFilters: (state, action: PayloadAction<StatusFilters>) => {
      state.statusFilters = action.payload;
    },
    defineTypeFilters: (state, action: PayloadAction<TypeFilters>) => {
      state.typeFilters = action.payload;
    },
    defineTotalAmountEntriesOfTheTable: (
      state,
      action: PayloadAction<number>
    ) => {
      state.totalAmountEntriesOfTheTable = action.payload;
    },
    changeTransactionStatus: (
      state,
      action: PayloadAction<ChangeStatusPayloadActionType>
    ) => {
      const id = action.payload.TransactionId;
      const newStatus = action.payload.Status;
      let transactionEntryContainer: TransactionEntry = {
        Amount: "",
        ClientName: "",
        Status: "Completed",
        TransactionId: "",
        Type: "Withdrawal",
      };

      statusesForLookup.forEach((status) => {
        if (state.transactionListByStatus[status][id]) {
          transactionEntryContainer = state.transactionListByStatus[status][id];
          transactionEntryContainer.Status = newStatus;
          delete state.transactionListByStatus[status][id];
        }
      });

      state.transactionListByStatus[newStatus][id] = transactionEntryContainer;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      statusesForLookup.forEach((status) => {
        delete state.transactionListByStatus[status][id];
      });
    },
  },
});

export const {
  saveFilteredTransactionsToState,
  changeCurrentTablePage,
  awaitingForData,
  defineStatusFilters,
  defineTypeFilters,
  defineTotalAmountEntriesOfTheTable,
  changeTransactionStatus,
  deleteTransaction,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
