import React from "react";
import Button from "react-bootstrap/cjs/Button";
import { fileRequestStarted } from "../../../Redux/fileBlobSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

function ExportButton() {
  const dispatch = useAppDispatch();
  const fileRequest = useAppSelector((state) => state.fileBlob.fileRequested);

  const handleClick = () => {
    dispatch(fileRequestStarted());
  };

  return (
    <Button variant="primary" disabled={fileRequest} onClick={handleClick}>
      {fileRequest ? "Exporting…" : "Export"}
    </Button>
  );
}

export default ExportButton;
