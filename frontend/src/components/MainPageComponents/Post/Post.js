import React from "react";

import { default as Card } from "../../../components/UI/Card/Card";
import Table from "./Table/Table";

const Post = props => {
  return (
    <>
      {props.entryFromDate.income.length ? (
        <Card header="Income">
          <Table entryFromDate={props.entryFromDate.income} type="income" />
        </Card>
      ) : (
        <></>
      )}
      &nbsp;
      {props.entryFromDate.expense.length ? (
        <Card header="Expense">
          {props.entryFromDate.expense ? (
            <Table entryFromDate={props.entryFromDate.expense} type="expense" />
          ) : (
            <></>
          )}
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default Post;
