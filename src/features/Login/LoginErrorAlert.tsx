import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { cleanErrMessageField } from "./authorizationSlice";
import { useAppDispatch, useAppSelector } from "../../common/hooks";

function LoginErrorAlert() {
  const alertMessage = useAppSelector(
    (state) => state.authorization.errMessage
  );
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  useEffect(
    function () {
      if (alertMessage) setShow(true);
    },
    [alertMessage]
  );

  if (show) {
    return (
      <Alert
        variant="danger"
        onClose={() => {
          setShow(false);
          dispatch(cleanErrMessageField());
        }}
        dismissible
      >
        {alertMessage}
      </Alert>
    );
  } else return null;
}

export default LoginErrorAlert;
