import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppSelector } from "../../../common/hooks";
import { selectFileList } from "./fileListGroupSelectors";

function FileListGroup() {
  const fileList = useAppSelector(selectFileList);

  return <ListGroup className="mh-100">{fileList}</ListGroup>;
}

export default FileListGroup;
