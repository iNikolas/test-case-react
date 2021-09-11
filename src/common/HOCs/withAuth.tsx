import React from "react";
import { useAppSelector } from "../hooks";
import { Login } from "../../features/Login/Login";

function withAuth(Component: React.ComponentType) {
  function AuthenticatedComponent() {
    const isAuthorized = useAppSelector(
      (state) => state.authorization.isAuthorized
    );
    return <div>{isAuthorized ? <Component /> : <Login />}</div>;
  }

  return AuthenticatedComponent;
}

export default withAuth;
