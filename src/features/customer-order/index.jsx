"use client";
import React, { useState } from "react";
import { FormData } from "./components/form-data";
import { Cart } from "./components/cart";
import { FloatingCart } from "./components/floating-cart";
import { orderSchema } from "./schema";
import { useCheckOrderStock } from "./hooks/use-check-order-stock";
import useCartStore from "@/store/use-cart-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "./hooks/use-create-order";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function OrderPageData() {
  const { data: user } = useCurrentUser();
  const [payloadData, setPayloadData] = useState({
    customer_name: user?.fullname || "",
    phone: user?.phone || "",
    destination: user?.address || "",
    order_date: "",
    delivery_method: "",
    note: "",
    items: [],
  });

  // hooks
  const route = useRouter();
  const isMobile = useIsMobile();
  const { checkStock, checkStockResult } = useCheckOrderStock();
  const { cart, clearCart } = useCartStore();
  const { create } = useCreateOrder({
    onSuccessCallback: () => {
      clearCart();
    },
  });
  const [errors, setErrors] = useState({});
  const [showMobileCart, setShowMobileCart] = useState(false);

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
    if (
      checkStockResult &&
      (!checkStockResult.data.is_available ||
        checkStockResult.data.out_of_stock)
    ) {
      toast.error(
        "Stok tidak tersedia pada tanggal ini, silakan pilih tanggal lain atau silahkan hubungi admin untuk perubahan jadwal pesanan",
      );
      return;
    }

    create.mutate(result.data);
  };

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100dvh-12rem)] lg:min-h-0 lg:flex-row lg:gap-6">
      <div className="flex min-w-0 flex-1 flex-col lg:min-h-0 lg:overflow-y-auto lg:pr-2">
        <FormData
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          errors={errors}
          checkStock={checkStock}
          checkStockResult={checkStockResult}
        />
      </div>

      {/* Desktop Cart Sidebar */}
      <div className="hidden min-h-0 flex-col gap-4 lg:flex lg:h-full lg:w-3/12">
        <Cart orderIsPending={create.isPending} handleOrder={handleOrder} />
      </div>

      {/* Mobile Floating Cart Button */}
      {isMobile && (
        <FloatingCart
          isOpen={showMobileCart}
          onOpenChange={setShowMobileCart}
          orderIsPending={create.isPending}
          handleOrder={handleOrder}
          payloadData={payloadData}
        />
      )}
    </div>
  );
}
