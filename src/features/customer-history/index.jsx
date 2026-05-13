"use client";
import Cookies from "js-cookie";

import React from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";

export default function OrderHistoryTableData() {
  // table data
  const {
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    range,
    setRange,
    data,
    isPending,
  } = useTableData();

  return (
    <>
      {/* toolbar */}
      <TableToolbar
        queryParams={queryParams}
        setRange={setRange}
        range={range}
        setQueryParams={setQueryParams}
      />
      {/* table */}
      <TableData
        table={table}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isPending={isPending}
      />
    </>
  );
}
