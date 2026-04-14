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
import { DownloadModal } from "./components/modal-download";
import { useModal } from "@/hooks/use-modal";
import { useDownloadReport } from "./hooks/use-download-report";
import { downloadSchema } from "./schema";
export default function DashboardData() {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate, isPending: isDownloading } = useDownloadReport();
  const [errors, setErrors] = useState({});
  const [range, setRange] = useState(undefined);
  const [payloadData, setPayloadData] = useState({
    from: undefined,
    to: undefined,
    type: "pdf",
  });

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

  const handleSubmitModal = async () => {
    console.log("error", errors);

    const result = downloadSchema.safeParse(payloadData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const { type, ...params } = result.data;
    mutate({ type, params });
  };

  return (
    <>
      <HeaderSection
        onOpenModal={openModal}
        setRange={setRange}
        range={range}
      />

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

      <DownloadModal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
        }}
        onSubmit={handleSubmitModal}
        isPending={isDownloading}
        errors={errors}
        payloadData={payloadData}
        setPayloadData={setPayloadData}
      />
    </>
  );
}
