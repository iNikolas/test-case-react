import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "../features/Login/authorizationSlice";
import transactionReducer from "../features/Mainpage/transactionsSlice";
import fileBlobReducer from "../features/Mainpage/ExportButton/fileBlobSlice";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    transactions: transactionReducer,
    fileBlob: fileBlobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
