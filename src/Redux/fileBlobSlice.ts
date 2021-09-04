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
    fileRequest: (state, action: PayloadAction<boolean>) => {
      state.fileRequested = action.payload;
    },
    updateFileList: (state, action: PayloadAction<string>) => {
      state.filesList.push(action.payload);
    },
  },
});

export const { fileRequest, updateFileList } = fileBlobSlice.actions;

export default fileBlobSlice.reducer;
