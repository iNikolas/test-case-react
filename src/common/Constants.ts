export const AUTHORIZATION_REQUESTED =
  "react-test-case/login/AUTHORIZATION_REQUESTED";
export const PUT_TRANSACTIONS_REQUESTED =
  "react-test-case/transactions/PUT_TRANSACTIONS_REQUESTED";
export const CHANGE_TRANSACTION_STATUS_REQUESTED =
  "react-test-case/transactions/CHANGE_TRANSACTION_STATUS_REQUESTED";
export const DELETE_TRANSACTION_REQUESTED =
  "react-test-case/transactions/DELETE_TRANSACTION_REQUESTED";

export const AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE = 10;
export const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];
export const TYPE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "Refill", label: "Refill" },
  { value: "Withdrawal", label: "Withdrawal" },
];
