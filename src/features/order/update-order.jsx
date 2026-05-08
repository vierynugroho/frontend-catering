"use client";
import React, { useEffect, useState } from "react";
import { useCheckOrderStock } from "../customer-order/hooks/use-check-order-stock";
import { usePublicMenu } from "../customer-menu/hooks/use-list";
import { orderSchema } from "./schema";
import { toast } from "sonner";
import { useDetailOrder } from "./hooks/use-detail";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import UpdateOrderForm from "./components/update-form";
import { useUpdateOrder } from "./hooks/use-update";
import { formatPhoneToLocal } from "@/lib/utils";

export default function UpdateOrderData() {
  // hooks
  const { id } = useParams();
  const { data: detail, isLoading: detailDataIsLoading } = useDetailOrder(id);
  const detailData = detail?.data;
  const { checkStock, checkStockResult } = useCheckOrderStock();
  const { data: menuData, isLoading } = usePublicMenu({
    limit: 200,
  });
  const { update } = useUpdateOrder();

  // state
  const [payloadData, setPayloadData] = useState({
    customer_name: detailData?.customer_name ?? "",
    phone: "",
    destination: "",
    order_date: "",
    delivery_method: "",
    note: "",
    items: [],
    shipping_cost: "",
    discount: "",
    order_status: "",
    shipping_status: "",
  });
  const [errors, setErrors] = useState({});

  const resolvePickupShippingStatus = (orderStatus) => {
    if (orderStatus === "pesanan_dibatalkan") return "pesanan_dibatalkan";
    if (
      orderStatus === "pesanan_diproses" ||
      orderStatus === "pesanan_selesai"
    ) {
      return "pesanan_selesai";
    }
    return "pesanan_disiapkan";
  };

  const handleOrder = async () => {
    console.log("errors", errors);

    const result = orderSchema.safeParse(payloadData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);

      if (fieldErrors.items) {
        toast.error(
          "Keranjang anda kosong, silahkan pilih menu terlebih dahulu",
        );
      }
      return;
    }
    if (checkStockResult && !checkStockResult?.data?.is_available) {
      toast.error(
        "Stok tidak tersedia pada tanggal ini, silakan pilih tanggal lain",
      );
      return;
    }

    const finalPayload =
      result.data.delivery_method === "ambil_sendiri"
        ? {
            ...result.data,
            destination: "",
            shipping_cost: "0",
            shipping_status: resolvePickupShippingStatus(result.data.order_status),
          }
        : result.data;

    update.mutate({ id: id, payload: finalPayload });
  };

  useEffect(() => {
    if (detailData) {
      setPayloadData({
        customer_name: detailData.customer_name || "",
        phone: formatPhoneToLocal(detailData.phone) || "",
        destination: detailData.destination || "",
        order_date: detailData.order_date
          ? new Date(detailData.order_date)
          : "",
        delivery_method: detailData.delivery_method || "",
        note: detailData.note || "",
        items: detailData.items || [],
        shipping_cost: String(detailData.shipping_cost) || "",
        discount: String(detailData.discount) || "",
        order_status: detailData.order_status || "",
        shipping_status: detailData.shipping_status || "",
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [detailData]);

  if (detailDataIsLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Edit Pesanan</h1>
      </div>
      <UpdateOrderForm
        isPending={update.isPending}
        handleOrder={handleOrder}
        menuData={menuData}
        payloadData={payloadData}
        setPayloadData={setPayloadData}
        errors={errors}
        checkStock={checkStock}
        checkStockResult={checkStockResult}
      />
    </div>
  );
}
