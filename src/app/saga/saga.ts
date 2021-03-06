import "../../common/API/API";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  AUTHORIZATION_REQUESTED,
  PUT_TRANSACTIONS_REQUESTED,
  CHANGE_TRANSACTION_STATUS_REQUESTED,
  DELETE_TRANSACTION_REQUESTED,
} from "../../common/Constants";
import {
  authFailed,
  authSucceeded,
} from "../../features/Login/authorizationSlice";
import {
  saveFilteredTransactionsToState,
  changeTransactionStatus,
  deleteTransaction,
} from "../../features/Mainpage/transactionsSlice";
import { TransactionEntry } from "../../features/Mainpage/transactionsSlice";

interface AuthPayloadType {
  username: string;
  password: string;
}

interface AuthActionType {
  type: typeof AUTHORIZATION_REQUESTED;
  payload: AuthPayloadType;
}

function* authorizeUser(action: AuthActionType): Generator {
  try {
    const authRespond: any = yield call(requestAuth, action.payload);
    if (authRespond.resultCode !== 0) throw new Error(authRespond.messages[0]);
    yield put(authSucceeded());
  } catch (e: any) {
    yield put(authFailed(e.message));
  }
}

export type TransactionsPayloadType = Array<TransactionEntry>;

interface TransactionsActionType {
  type: typeof PUT_TRANSACTIONS_REQUESTED;
  payload: TransactionsPayloadType;
}

function* fetchTransactions(action: TransactionsActionType): Generator {
  try {
    yield put(saveFilteredTransactionsToState(action.payload));
  } catch (e: any) {
    yield alert(e.message);
  }
}

export interface ChangeStatusPayloadActionType {
  Status: "Pending" | "Completed" | "Cancelled";
  TransactionId: string;
}

interface ChangeStatusActionType {
  type: typeof CHANGE_TRANSACTION_STATUS_REQUESTED;
  payload: ChangeStatusPayloadActionType;
}

function* changeTransactionStatusRequested(
  action: ChangeStatusActionType
): Generator {
  try {
    yield put(changeTransactionStatus(action.payload));
  } catch (e: any) {
    yield alert(e.message);
  }
}

interface DeleteTransactionActionType {
  type: typeof DELETE_TRANSACTION_REQUESTED;
  payload: string;
}

function* deleteTransactionRequested(
  action: DeleteTransactionActionType
): Generator {
  try {
    yield put(deleteTransaction(action.payload));
  } catch (e: any) {
    yield alert(e.message);
  }
}

function* mySaga() {
  yield takeEvery(AUTHORIZATION_REQUESTED, authorizeUser);
  yield takeEvery(PUT_TRANSACTIONS_REQUESTED, fetchTransactions);
  yield takeEvery(
    CHANGE_TRANSACTION_STATUS_REQUESTED,
    changeTransactionStatusRequested
  );
  yield takeEvery(DELETE_TRANSACTION_REQUESTED, deleteTransactionRequested);
}

async function requestAuth(params: AuthPayloadType) {
  const respond = await axios.post("auth", params);
  return respond.data;
}

export default mySaga;
