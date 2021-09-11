import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChangeStatusPayloadActionType,
  TransactionsPayloadType,
} from "../../app/saga/saga";
import { normalize, schema } from "normalizr";
import { OptionsType, OptionTypeBase } from "react-select";

export interface TransactionEntry {
  Amount: string;
  ClientName: string;
  Status: "Completed" | "Cancelled" | "Pending";
  TransactionId: string;
  Type: "Withdrawal" | "Refill";
}

interface FilteredTransactionsData {
  entities: {
    Cancelled: {
      [index: string]: TransactionEntry;
    };
    Completed: {
      [index: string]: TransactionEntry;
    };
    Pending: {
      [index: string]: TransactionEntry;
    };
  };
  result: { id: string; schema: string };
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
      action: PayloadAction<TransactionsPayloadType>
    ) => {
      const PendingSchema = new schema.Entity(
        "Pending",
        {},
        { idAttribute: "TransactionId" }
      );
      const CompletedSchema = new schema.Entity(
        "Completed",
        {},
        { idAttribute: "TransactionId" }
      );
      const CancelledSchema = new schema.Entity(
        "Cancelled",
        {},
        { idAttribute: "TransactionId" }
      );
      const transactionsNormalizedByStatus = new schema.Array(
        {
          Pending: PendingSchema,
          Completed: CompletedSchema,
          Cancelled: CancelledSchema,
        },
        (input) => {
          return `${input.Status}`;
        }
      );

      const filteredTransactionsData: FilteredTransactionsData = normalize(
        action.payload,
        transactionsNormalizedByStatus
      );

      const expectedStatuses: StatusFilters = [
        "Completed",
        "Cancelled",
        "Pending",
      ];

      expectedStatuses.forEach((status) => {
        if (!filteredTransactionsData.entities[status]) {
          filteredTransactionsData.entities[status] = {};
        }
      });

      state.transactionListByStatus = filteredTransactionsData.entities;
      state.transactionStatus = "imported";
    },
    changeCurrentTablePage: (state, action: PayloadAction<number>) => {
      state.currentTablePage = action.payload;
    },
    awaitingForData: (state) => {
      state.transactionStatus = "importing";
    },
    defineStatusFilters: (
      state,
      action: PayloadAction<OptionTypeBase | OptionsType<OptionTypeBase> | null>
    ) => {
      state.statusFilters = action.payload?.map(
        (val: { value: string; label: string }) => val.value
      );
    },
    defineTypeFilters: (
      state,
      action: PayloadAction<OptionTypeBase | OptionsType<OptionTypeBase> | null>
    ) => {
      state.typeFilters = action.payload?.map(
        (val: { value: string; label: string }) => val.value
      );
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
