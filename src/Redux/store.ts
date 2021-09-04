import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./authorizationSlice";
import transactionReducer from "./transactionsSlice";
import fileBlobReducer from "./fileBlobSlice";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga";

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
