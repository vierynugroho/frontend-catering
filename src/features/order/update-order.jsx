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

    console.log("Data Valid:", result.data);
    console.log("Data Valid:", id);
    update.mutate({ id: id, payload: result.data });
  };

  useEffect(() => {
    if (detailData) {
      setPayloadData({
        customer_name: detailData.customer_name || "",
        phone: detailData.phone || "",
        destination: detailData.destination || "",
        order_date: detailData.order_date
          ? new Date(detailData.order_date)
          : "",
        delivery_method: detailData.delivery_method || "",
        note: detailData.note || "",
        items: detailData.items || [],
        shipping_cost: detailData.shipping_cost || 0,
        discount: detailData.discount || 0,
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
