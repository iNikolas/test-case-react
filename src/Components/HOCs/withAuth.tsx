import React from "react";
import { useAppSelector } from "../../Redux/hooks";
import { Login } from "../Login/Login";

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
