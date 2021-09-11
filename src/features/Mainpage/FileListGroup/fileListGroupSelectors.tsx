import { createSelector } from "reselect";
import { useAppSelector } from "../../../common/hooks";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

export const selectFileList = createSelector(
  () => useAppSelector((state) => state.fileBlob.filesList),
  (fileList) =>
    fileList.map((entry, index) => (
      <ListGroup.Item key={entry + index} action variant="light">
        {entry}
      </ListGroup.Item>
    ))
);
