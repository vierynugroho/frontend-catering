"use client";
import React, { useState } from "react";
import { TableToolbar } from "./components/table-toolbar";
import { CardData } from "./components/card-data";
import { Cart } from "./components/cart";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MenuData() {
  const [queryParams, setQueryParams] = useState({
    search: "",
    from: "",
    to: "",
  });
  return (
    <div className="flex gap-6 flex-row h-[calc(100vh-12rem)] min-h-0 overflow-hidden">
      <div className="w-9/12 pt-1">
        <TableToolbar
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        {/* Gunakan ScrollArea dengan flex-1 h-full */}
        <ScrollArea className="flex-1 h-full mt-6 pr-4">
          <CardData queryParams={queryParams} />
        </ScrollArea>
      </div>
      <div className="w-3/12 hidden flex-col gap-4 group-data-[theme-content-layout=centered]/layout:h-[calc(100vh-8rem)] group-data-[theme-content-layout=full]/layout:h-[calc(100vh-6rem)] lg:col-span-2 lg:flex ">
        <Cart />
      </div>
    </div>
  );
}
