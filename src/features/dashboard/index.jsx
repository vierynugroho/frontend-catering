"use client";
import React, { useState } from "react";
import { SectionCards } from "./components/section-cards";
import {
  useCustomerReport,
  useMenuReport,
  useOrderReport,
  useShippingReport,
  useStockReport,
} from "./hooks/use-reports";
import { SectionCharts } from "./components/setcion-chart";
import { Spinner } from "@/components/ui/spinner";
import { SectionLeaderboards } from "./components/section-leaderboard";
import HeaderSection from "./components/section-header";
export default function DashboardData() {
  const [range, setRange] = useState(undefined);

  console.log("ngal tangal", range);

  const { data: menuReport, isPending: menuIsPending } = useMenuReport({
    from: range?.from,
    to: range?.to,
  });
  const { data: stockReport, isPending: stockIsPending } = useStockReport({
    from: range?.from,
    to: range?.to,
  });
  const { data: shippingReport, isPending: shippingIsPending } =
    useShippingReport({
      from: range?.from,
      to: range?.to,
    });
  const { data: customerReport, isPending: customerIsPending } =
    useCustomerReport({
      from: range?.from,
      to: range?.to,
    });
  const { data: orderReport, isPending: orderIsPending } = useOrderReport({
    from: range?.from,
    to: range?.to,
  });

  const isPending =
    menuIsPending ||
    stockIsPending ||
    shippingIsPending ||
    customerIsPending ||
    orderIsPending;

  return (
    <>
      <HeaderSection setRange={setRange} range={range} />

      {isPending && (
        <div className="flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      )}

      {!isPending && (
        <>
          <SectionCards
            orderReport={orderReport}
            shippingReport={shippingReport}
            stockReport={stockReport}
          />
          <SectionCharts orderReport={orderReport} stockReport={stockReport} />
          <SectionLeaderboards
            menuReport={menuReport}
            customerReport={customerReport}
          />
        </>
      )}
    </>
  );
}
