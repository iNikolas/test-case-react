import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorizationState {
  isAuthorized: boolean;
  errMessage: string;
}

const initialState: AuthorizationState = {
  isAuthorized: false,
  errMessage: "",
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    authSucceeded: (state) => {
      state.isAuthorized = true;
      state.errMessage = "";
    },
    authFailed: (state, action: PayloadAction<string>) => {
      state.isAuthorized = false;
      state.errMessage = action.payload;
    },
    cleanErrMessageField: (state) => {
      state.errMessage = "";
    },
  },
});

export const { authSucceeded, authFailed, cleanErrMessageField } =
  authorizationSlice.actions;

export default authorizationSlice.reducer;
