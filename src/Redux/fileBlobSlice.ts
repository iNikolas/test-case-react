import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileBlobState {
  fileRequested: boolean;
  filesList: Array<string>;
}

const initialState: FileBlobState = {
  fileRequested: false,
  filesList: [],
};

export const fileBlobSlice = createSlice({
  name: "fileBlobSlice",
  initialState,
  reducers: {
    fileRequestStarted: (state) => {
      state.fileRequested = true;
    },
    fileRequestFinished: (state) => {
      state.fileRequested = false;
    },
    updateFileList: (state, action: PayloadAction<string>) => {
      state.filesList.push(action.payload);
    },
  },
});

export const { fileRequestStarted, fileRequestFinished, updateFileList } =
  fileBlobSlice.actions;

export default fileBlobSlice.reducer;
