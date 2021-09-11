import React, { useRef } from "react";
import FormBootstrap from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Form, Field } from "react-final-form";
import { minLength, required } from "./validators/validators";
import Overlay from "react-bootstrap/cjs/Overlay";
import css from "./Login.module.css";
import { useAppDispatch } from "../../common/hooks";
import LoginErrorAlert from "./LoginErrorAlert";
import { authorizationRequested } from "../../app/saga/sagaActions";

interface PropsType {
  style?: React.CSSProperties;
}

export const Login = (props: PropsType) => {
  const username = useRef(null);
  const password = useRef(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormData) => {
    dispatch(authorizationRequested(e));
  };

  return (
    <div className={css.wrapper}>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <LoginErrorAlert />
      </div>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, invalid, submitting }) => {
          return (
            <FormBootstrap onSubmit={handleSubmit}>
              <Field
                validate={required}
                name="username"
                render={({ input, meta }) => (
                  <div
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    <FormBootstrap.Group className="mb-3" controlId="username">
                      <FormBootstrap.Label>Username</FormBootstrap.Label>
                      <FormBootstrap.Control
                        ref={username}
                        {...input}
                        placeholder="Username"
                      />
                    </FormBootstrap.Group>
                    {meta.touched && meta.error && (
                      <Overlay
                        target={username.current}
                        show={true}
                        placement="right"
                      >
                        {({
                          placement,
                          arrowProps,
                          show: _show,
                          popper,
                          ...props
                        }) => (
                          <div
                            {...props}
                            style={{
                              backgroundColor: "rgba(255, 100, 100, 0.85)",
                              padding: "2px 10px",
                              color: "white",
                              borderRadius: 3,
                              ...props.style,
                            }}
                          >
                            {meta.error}
                          </div>
                        )}
                      </Overlay>
                    )}
                  </div>
                )}
              />
              <Field
                validate={minLength(4)}
                name="password"
                render={({ input, meta }) => (
                  <div
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    <FormBootstrap.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <FormBootstrap.Label>Password</FormBootstrap.Label>
                      <FormBootstrap.Control
                        ref={password}
                        {...input}
                        type="password"
                        placeholder="Password"
                      />
                    </FormBootstrap.Group>
                    {meta.touched && meta.error && (
                      <Overlay
                        target={password.current}
                        show={true}
                        placement="right"
                      >
                        {({
                          placement,
                          arrowProps,
                          show: _show,
                          popper,
                          ...props
                        }) => (
                          <div
                            {...props}
                            style={{
                              backgroundColor: "rgba(255, 100, 100, 0.85)",
                              padding: "2px 10px",
                              color: "white",
                              borderRadius: 3,
                              ...props.style,
                            }}
                          >
                            {meta.error}
                          </div>
                        )}
                      </Overlay>
                    )}
                  </div>
                )}
              />

              <Button
                variant="primary"
                type="submit"
                disabled={submitting || invalid}
              >
                Login
              </Button>
            </FormBootstrap>
          );
        }}
      />
    </div>
  );
};
