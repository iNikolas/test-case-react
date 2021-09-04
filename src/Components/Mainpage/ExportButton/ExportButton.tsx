import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { EXPORT_CSV_FILE_REQUESTED } from "../../../Redux/Constants";

function ExportButton() {
  const dispatch = useAppDispatch();
  const fileRequest = useAppSelector((state) => state.fileBlob.fileRequested);

  const handleClick = () => {
    dispatch({ type: EXPORT_CSV_FILE_REQUESTED, payload: true });
  };

  return (
    <Button variant="primary" disabled={fileRequest} onClick={handleClick}>
      {fileRequest ? "Exporting…" : "Export"}
    </Button>
  );
}

export default ExportButton;
