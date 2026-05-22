import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import useCartStore from "@/store/use-cart-store";
import { formatRupiah } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, getSubtotal, updateQuantity } =
    useCartStore();

  const router = useRouter();

  return (
    <>
      <Card className="rounded-md flex-1 overflow-auto">
        <CardHeader>
          <CardTitle className="font-semibold text-base">Keranjang</CardTitle>
        </CardHeader>

        <CardContent className="px-4 md:px-6 flex-1 overflow-auto">
          <div className="space-y-3 md:space-y-4">
            {cart.length != 0 &&
              cart.map((item) => (
                <div key={item.id} className="flex gap-2 md:gap-3">
                  <div className="relative size-12 md:size-20 shrink-0">
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].url}
                      className="h-full w-full object-cover rounded-sm"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start">
                    <div className="mb-1 md:mb-2 space-y-0.5 md:space-y-1">
                      <h3 className="font-semibold text-xs md:text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                      {item.min_order > 1 && (
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                          Min. {item.min_order} porsi
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 md:gap-4 w-full items-center">
                      <Button
                        variant="outline"
                        className="p-0.5 h-5 md:h-6 w-5 md:w-6"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="w-2.5 h-2.5 md:w-4 md:h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          updateQuantity(item.id, isNaN(val) ? 0 : val);
                        }}
                        className="w-10 md:w-16 h-5 md:h-6 p-0.5 md:p-1 text-center text-xs md:text-sm"
                      />
                      <Button
                        variant="outline"
                        className="p-0.5 h-5 md:h-6 w-5 md:w-6"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="w-2.5 h-2.5 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {cart.length <= 0 && (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
              <span className="text-2xl">🍪</span>
              <span className="text-xs md:text-sm">Keranjang anda kosong.</span>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className={`rounded-md bg-muted ${cart.length <= 0 && "hidden"}`}>
        <div data-slot="card-content" className="px-4 md:px-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold text-sm md:text-base">Total</span>
              <span className="font-medium text-sm md:text-base">
                {formatRupiah(getSubtotal())}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-6 flex gap-2">
            <Button
              className="w-full text-xs md:text-base"
              onClick={() => router.push("/customer/order")}
            >
              Buat Pesanan
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
