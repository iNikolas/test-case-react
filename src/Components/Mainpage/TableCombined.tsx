import React from "react";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import Paginator from "./Paginator/Paginator";
import withLoading from "../HOCs/withLoading";

function TableCombined() {
  return (
    <div>
      <TransactionsTable />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paginator />
      </div>
    </div>
  );
}

export default withLoading(TableCombined);
