import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import useCartStore from "@/store/use-cart-store";
import { formatRupiah } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export const Cart = ({ handleOrder, orderIsPending }) => {
  const { cart, addToCart, removeFromCart, getSubtotal, updateQuantity } =
    useCartStore();

  return (
    <>
      <Card className="min-h-0 flex-1 overflow-auto rounded-md ring-0">
        <CardHeader>
          <CardTitle className="font-semibold">Keranjang</CardTitle>
        </CardHeader>

        <CardContent className="min-h-0 flex-1 overflow-auto px-6">
          <div className="space-y-4">
            {cart.length != 0 &&
              cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative size-10 shrink-0 lg:size-20">
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].url}
                      className="h-full w-full object-cover rounded-sm"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start ">
                    <div className="mb-0 space-y-1 lg:mb-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>{formatRupiah(item.price * item.quantity)}</p>
                      {item.min_order > 1 && (
                        <p className="text-xs text-muted-foreground">
                          Min. {item.min_order} porsi
                        </p>
                      )}
                    </div>
                    <div className="flex gap-4 w-full items-center">
                      <Button
                        variant="outline"
                        className="p-1 h-6"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          updateQuantity(item.id, isNaN(val) ? 0 : val);
                        }}
                      />
                      <Button
                        variant="outline"
                        className="p-1 h-6"
                        onClick={() => addToCart(item)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {cart.length <= 0 && (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
              <span className="text-2xl">🍪</span>
              <span>Keranjang anda kosong.</span>
            </div>
          )}
        </CardContent>
      </Card>
      {/* ${cart.length <= 0 && "hidden"} */}
      <Card className={`rounded-md bg-muted `}>
        <div data-slot="card-content" className="px-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-medium">{formatRupiah(getSubtotal())}</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button
              className="w-full"
              onClick={() => handleOrder()}
              disabled={orderIsPending}
            >
              {orderIsPending && <Spinner />}
              Pesan
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
