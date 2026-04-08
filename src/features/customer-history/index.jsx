"use client";
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
    data,
    isPending,
  } = useTableData();

  return (
    <>
      {/* toolbar */}
      <TableToolbar queryParams={queryParams} setQueryParams={setQueryParams} />
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
