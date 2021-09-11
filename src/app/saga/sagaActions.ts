import { createAction } from "@reduxjs/toolkit";
import {
  AUTHORIZATION_REQUESTED,
  CHANGE_TRANSACTION_STATUS_REQUESTED,
  DELETE_TRANSACTION_REQUESTED,
  PUT_TRANSACTIONS_REQUESTED,
} from "../../common/Constants";

interface StatusAction {
  Status: "Pending" | "Completed" | "Cancelled";
  TransactionId: string;
}

export const authorizationRequested = createAction<FormData>(
  AUTHORIZATION_REQUESTED
);
export const deleteTransactionRequested = createAction<string>(
  DELETE_TRANSACTION_REQUESTED
);
export const changeTransactionStatusRequested = createAction<StatusAction>(
  CHANGE_TRANSACTION_STATUS_REQUESTED
);
export const putTransactionRequested = createAction<unknown[]>(
  PUT_TRANSACTIONS_REQUESTED
);
