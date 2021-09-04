import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { ChangeStatusPayloadActionType } from "./saga";

export interface TransactionEntry {
  Amount: string;
  ClientName: string;
  Status: string;
  TransactionId: string;
  Type: string;
}

interface TransactionListByStatus {
  entities: {
    Cancelled: Array<TransactionEntry>;
    Completed: Array<TransactionEntry>;
    Pending: Array<TransactionEntry>;
  };
  result: { id: string; schema: string };
}

interface TransactionListByType {
  entities: {
    Withdrawal: Array<TransactionEntry>;
    Refill: Array<TransactionEntry>;
  };
  result: { id: string; schema: string };
}

type StatusFilters = Array<"Completed" | "Cancelled" | "Pending">;
type TypeFilters = Array<"Withdrawal" | "Refill">;

interface TransactionsState {
  transactionsList: Array<TransactionEntry>;
  transactionStatus: "initial" | "importing" | "imported" | "error";
  currentTablePage: number;
  totalAmountEntriesOfTheTable: number;
  transactionListByStatus: TransactionListByStatus;
  transactionListByType: TransactionListByType;
  statusFilters: StatusFilters;
  typeFilters: TypeFilters;
}

const initialState: TransactionsState = {
  transactionsList: [],
  transactionStatus: "initial",
  currentTablePage: 1,
  totalAmountEntriesOfTheTable: 0,
  transactionListByStatus: {
    entities: {
      Cancelled: [],
      Completed: [],
      Pending: [],
    },
    result: { id: "", schema: "" },
  },
  statusFilters: ["Completed", "Cancelled", "Pending"],
  typeFilters: ["Withdrawal", "Refill"],
  transactionListByType: {
    entities: {
      Withdrawal: [],
      Refill: [],
    },
    result: {
      id: "",
      schema: "",
    },
  },
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    saveTransactionsToState: (
      state,
      action: PayloadAction<TransactionEntry[]>
    ) => {
      state.transactionsList = action.payload;
      state.transactionStatus = "imported";
    },
    changeCurrentTablePage: (state, action: PayloadAction<number>) => {
      state.currentTablePage = action.payload;
    },
    awaitingForData: (state) => {
      state.transactionStatus = "importing";
    },
    filterTransactionsData: (state) => {
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

      const RefillSchema = new schema.Entity(
        "Refills",
        {},
        { idAttribute: "TransactionId" }
      );
      const WithdrawalSchema = new schema.Entity(
        "Withdrawals",
        {},
        { idAttribute: "TransactionId" }
      );
      const transactionsNormalizedByType = new schema.Array(
        {
          Refills: RefillSchema,
          Withdrawals: WithdrawalSchema,
        },
        (input) => {
          return `${input.Type}s`;
        }
      );

      state.transactionListByType = normalize(
        state.transactionsList,
        transactionsNormalizedByType
      );

      state.transactionListByStatus = normalize(
        state.transactionsList,
        transactionsNormalizedByStatus
      );
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
      state.transactionsList = state.transactionsList.map((transaction) => {
        if (transaction.TransactionId !== action.payload.TransactionId)
          return transaction;
        return { ...transaction, Status: action.payload.Status };
      });
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactionsList = state.transactionsList.filter(
        (transaction) => transaction.TransactionId !== action.payload
      );
    },
  },
});

export const {
  saveTransactionsToState,
  changeCurrentTablePage,
  awaitingForData,
  filterTransactionsData,
  defineStatusFilters,
  defineTypeFilters,
  defineTotalAmountEntriesOfTheTable,
  changeTransactionStatus,
  deleteTransaction,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
