import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditPopupDropdown from "./EditPopupDropdown/EditPopupDropdown";
import { useAppDispatch } from "../../../Redux/hooks";
import { changeTransactionStatusRequested } from "../../../Redux/actions";

interface PropType {
  id: number;
  show: boolean;
  setShow: CallableFunction;
  status: "Pending" | "Completed" | "Cancelled";
}

function EditPopup({ id, show, setShow, status }: PropType) {
  const dispatch = useAppDispatch();
  const [updatedStatus, setUpdatedStatus] = useState(status);

  const handleClose = () => setShow(false);
  const handleSaveChanges = () => {
    if (updatedStatus !== status) {
      const action = {
        Status: updatedStatus,
        TransactionId: String(id),
      };
      dispatch(changeTransactionStatusRequested(action));
    }
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Transaction ID: {id}.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className={"font-weight-bold"}>Edit status:</span>
        <EditPopupDropdown
          status={updatedStatus}
          setStatus={setUpdatedStatus}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPopup;
