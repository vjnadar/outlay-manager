import React from "react";

import { Card } from "../..";
import Table from "./Table";
import { PostProps } from "./types";

function Post({ entryFromDate }: PostProps) {
    return (
        <>
            {entryFromDate.income.length ? (
                <Card header="Income">
                    <Table entryFromDate={entryFromDate.income} />
                </Card>
            ) : null}
            &nbsp;
            {entryFromDate.expense.length ? (
                <Card header="Expense">{entryFromDate.expense ? <Table entryFromDate={entryFromDate.expense} /> : null}</Card>
            ) : null}
        </>
    );
}

export default Post;
