import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import EditPopup from "../EditPopup/EditPopup";
import DeletePopup from "../DeletePopup/DeletePopup";

interface PropType {
  id: number;
  status: string;
}

function ActionButtons({ id, status }: PropType) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleEditEvent = () => {
    setShowEdit(true);
  };
  const handleDeleteEvent = () => {
    setShowDelete(true);
  };

  return (
    <>
      <ButtonGroup size="sm">
        <Button variant="primary" onClick={handleEditEvent}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDeleteEvent}>
          Delete
        </Button>
      </ButtonGroup>

      <EditPopup
        status={status}
        show={showEdit}
        setShow={setShowEdit}
        id={id}
      />
      <DeletePopup id={id} show={showDelete} setShow={setShowDelete} />
    </>
  );
}

export default ActionButtons;
