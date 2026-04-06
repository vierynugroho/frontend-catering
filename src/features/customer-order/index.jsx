"use client";
import React, { useState } from "react";
import { FormData } from "./components/form-data";
import { Cart } from "./components/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { orderSchema } from "./schema";
import { useCheckOrderStock } from "./hooks/use-check-order-stock";
import useCartStore from "@/store/use-cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "./hooks/use-create-order";

export default function OrderPageData() {
  const [payloadData, setPayloadData] = useState({
    customer_name: "",
    phone: "",
    destination: "",
    order_date: "",
    delivery_method: "",
    note: "",
    items: [],
  });

  // hooks
  const route = useRouter();
  const { checkStock, checkStockResult } = useCheckOrderStock();
  const { cart, clearCart } = useCartStore();
  const { create } = useCreateOrder({
    onSuccessCallback: () => {
      clearCart();
    },
  });
  const [errors, setErrors] = useState({});

  const handleOrder = async () => {
    console.log("errors", errors);

    const completePayload = {
      ...payloadData,
      items: cart.map((item) => ({
        menu_id: item.id,
        quantity: item.quantity,
      })),
    };

    const result = orderSchema.safeParse(completePayload);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);

      if (fieldErrors.items) {
        toast.error(
          "Keranjang anda kosong, silahkan pilih menu terlebih dahulu",
        );
        route.push("/customer/menu");
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
    create.mutate(result.data);
  };

  return (
    <div className="flex gap-6 flex-row h-[calc(100vh-12rem)] min-h-0 overflow-hidden">
      <div className="w-9/12 ">
        <FormData
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          errors={errors}
          checkStock={checkStock}
          checkStockResult={checkStockResult}
        />
      </div>
      <div className="w-3/12 hidden flex-col gap-4 group-data-[theme-content-layout=centered]/layout:h-[calc(100vh-8rem)] group-data-[theme-content-layout=full]/layout:h-[calc(100vh-6rem)] lg:col-span-2 lg:flex ">
        <Cart orderIsPending={create.isPending} handleOrder={handleOrder} />
      </div>
    </div>
  );
}
