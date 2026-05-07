"use client";
import React, { useState } from "react";
import CreateOrderForm from "./components/create-form";
import { useCheckOrderStock } from "../customer-order/hooks/use-check-order-stock";
import { usePublicMenu } from "../customer-menu/hooks/use-list";
import { orderSchema } from "./schema";
import { toast } from "sonner";
import { useCreateOrder } from "./hooks/use-create";

export default function CreateOrderData() {
  // hooks
  const { checkStock, checkStockResult } = useCheckOrderStock();
  const { data: menuData, isLoading } = usePublicMenu({
    limit: 200,
  });
  const { create } = useCreateOrder();

  // state
  const [payloadData, setPayloadData] = useState({
    customer_name: "",
    phone: "",
    destination: "",
    order_date: "",
    delivery_method: "",
    note: "",
    items: [],
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

    create.mutate(result.data);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Buat Pesanan</h1>
      </div>
      <CreateOrderForm
        isPending={create.isPending}
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
