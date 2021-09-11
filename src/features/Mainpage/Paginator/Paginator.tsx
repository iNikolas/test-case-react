import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE } from "../../../common/Constants";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { changeCurrentTablePage } from "../transactionsSlice";

function Paginator() {
  const dispatch = useAppDispatch();
  const currentTablePage = useAppSelector(
    (state) => state.transactions.currentTablePage
  );
  const totalAmountEntriesOfTheTable = useAppSelector(
    (state) => state.transactions.totalAmountEntriesOfTheTable
  );
  const totalAmountOfPages = Math.ceil(
    totalAmountEntriesOfTheTable / AMOUNT_OF_ENTRIES_FOR_ONE_TABLE_PAGE
  );
  useEffect(() => {
    if (currentTablePage > totalAmountOfPages)
      dispatch(
        changeCurrentTablePage(
          totalAmountOfPages === 0 ? 1 : totalAmountOfPages
        )
      );
  }, [totalAmountOfPages]);

  const items: React.ReactElement[] = [];

  newIteration: for (
    let number = currentTablePage - 3;
    number <= currentTablePage + 3;
    number++
  ) {
    if (number < 1) continue newIteration;
    if (number > totalAmountOfPages) continue newIteration;
    items.push(
      <Pagination.Item
        onClick={() => handleCurrentPageClick(number)}
        key={number + "hgfh"}
        active={number === currentTablePage}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (currentTablePage < totalAmountOfPages - 3 && totalAmountOfPages > 3) {
    if (currentTablePage < totalAmountOfPages - 4)
      items.push(<Pagination.Ellipsis key={"Ellipsis"} />);
    items.push(
      <Pagination.Item
        onClick={() => handleCurrentPageClick(totalAmountOfPages)}
        key={totalAmountOfPages + "totalAmountOfPages"}
      >
        {totalAmountOfPages}
      </Pagination.Item>
    );
  }

  function handleCurrentPageClick(number: number) {
    dispatch(changeCurrentTablePage(number));
  }

  function handleNextClick() {
    if (currentTablePage < totalAmountOfPages)
      dispatch(changeCurrentTablePage(currentTablePage + 1));
  }

  function handlePrevClick() {
    if (currentTablePage > 1)
      dispatch(changeCurrentTablePage(currentTablePage - 1));
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => dispatch(changeCurrentTablePage(1))} />
      <Pagination.Prev onClick={handlePrevClick} />

      {items}

      <Pagination.Next onClick={handleNextClick} />
      <Pagination.Last
        onClick={() => dispatch(changeCurrentTablePage(totalAmountOfPages))}
      />
    </Pagination>
  );
}

export default Paginator;
