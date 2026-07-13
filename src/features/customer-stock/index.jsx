"use client";
import React from "react";

import { OrderStockCalendar } from "@/components/calendar";
import { useStockCalendar } from "@/hooks/use-stock-calendar";

export default function CustomerStockCalendar() {
  const { data, isPending } = useStockCalendar();

  return <OrderStockCalendar data={data} loading={isPending} readOnly />;
}
