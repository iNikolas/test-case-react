import React from "react";
import { useAppSelector } from "../hooks";
import Loader from "../Loader/Loader";

function withLoader(Component: React.ComponentType) {
  function WithLoaderComponent() {
    const transactionStatus = useAppSelector(
      (state) => state.transactions.transactionStatus
    );
    if (transactionStatus === "initial")
      return <div>Please import *.csv file to start work</div>;
    if (transactionStatus === "importing")
      return (
        <div>
          <Loader />
        </div>
      );
    if (transactionStatus === "imported") return <Component />;
    return null;
  }

  return WithLoaderComponent;
}

export default withLoader;
