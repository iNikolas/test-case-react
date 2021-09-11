import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppSelector } from "../../../common/hooks";

function FileListGroup() {
  const fileList = useAppSelector((state) => state.fileBlob.filesList).map(
    (entry, index) => (
      <ListGroup.Item key={entry + index} action variant="light">
        {entry}
      </ListGroup.Item>
    )
  );

  return <ListGroup className="mh-100">{fileList}</ListGroup>;
}

export default FileListGroup;
