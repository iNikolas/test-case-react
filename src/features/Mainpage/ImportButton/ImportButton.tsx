import Papa from "papaparse";
import React, { ChangeEvent, useRef, useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import { useAppDispatch } from "../../../common/hooks";
import { awaitingForData } from "../transactionsSlice";
import { updateFileList } from "../ExportButton/fileBlobSlice";
import { putTransactionRequested } from "../../../app/saga/sagaActions";

function ImportButton() {
  const [isLoading, setLoading] = useState(false);
  const fileEL = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!isLoading) fileEL.current?.click();
  };

  const handleFileDownloading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      setLoading(true);
      dispatch(awaitingForData());
      dispatch(updateFileList(e.currentTarget.files[0].name));
      Papa.parse(e.currentTarget.files[0], {
        complete: (results) => {
          setLoading(false);
          dispatch(putTransactionRequested(results.data));
        },
        delimiter: ",",
        header: true,
        worker: true,
      });
    }
  };

  return (
    <span>
      <input
        accept=".csv"
        onChange={handleFileDownloading}
        ref={fileEL}
        style={{ visibility: "hidden", position: "fixed" }}
        type="file"
      />
      <Button
        className="m-1"
        variant="primary"
        disabled={isLoading}
        onClick={handleClick}
      >
        {isLoading ? "Importing…" : "Import"}
      </Button>
    </span>
  );
}

export default ImportButton;
