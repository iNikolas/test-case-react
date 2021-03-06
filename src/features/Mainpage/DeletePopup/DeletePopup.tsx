import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../../../common/hooks";
import { deleteTransactionRequested } from "../../../app/saga/sagaActions";

interface PropType {
  id: number;
  show: boolean;
  setShow: CallableFunction;
}

function DeletePopup({ id, show, setShow }: PropType) {
  const dispatch = useAppDispatch();

  const handleClose = () => setShow(false);
  const handleDeleteClick = () => {
    dispatch(deleteTransactionRequested(String(id)));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation needed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className={"font-weight-bold"}>
          Are you sure you want irreversibly Delete Transaction with id {id}?
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          CANCEL
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          DELETE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletePopup;
