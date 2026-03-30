"use client";
import React from "react";

import { OrderStockCalendar } from "@/components/calendar";
import { useCreateStock } from "./hooks/use-create";
import { useUpdateStock } from "./hooks/use-update";
import { useDeleteStock } from "./hooks/use-delete";
import { useStocks } from "./hooks/use-list";

export default function StockTableData() {
  // hooks
  const { create } = useCreateStock({
    onSuccessCallback: () => {},
  });
  const { update } = useUpdateStock({
    onSuccessCallback: () => {},
  });
  const { deleted } = useDeleteStock({
    onSuccessCallback: () => {},
  });
  const { data, isPending } = useStocks();

  return (
    <>
      <OrderStockCalendar
        data={data}
        loading={
          isPending || create.isPending || update.isPending || deleted.isPending
        }
        onCreate={create.mutate}
        onUpdate={update.mutate}
        onDelete={deleted.mutate}
      />
    </>
  );
}
