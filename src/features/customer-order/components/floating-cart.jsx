import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/use-cart-store";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";

export const FloatingCart = ({
  isOpen,
  onOpenChange,
  orderIsPending,
  handleOrder,
  payloadData,
}) => {
  const { cart, addToCart, removeFromCart, getSubtotal, updateQuantity } =
    useCartStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isFormComplete =
    payloadData?.customer_name &&
    payloadData?.phone &&
    payloadData?.destination &&
    payloadData?.order_date &&
    payloadData?.delivery_method;

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-16 right-6 rounded-full w-14 h-14 p-0 shadow-lg z-100 flex items-center justify-center"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>
      </Button>

      {/* Drawer */}
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="h-3/4 flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Keranjang Saya</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="flex-1 overflow-hidden px-4">
            <div className="space-y-4 pr-4">
              {cart.length !== 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4">
                    <div className="relative size-16 shrink-0">
                      <img
                        src={item.images[0].url}
                        alt={item.images[0].url}
                        className="h-full w-full object-cover rounded-sm"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-start">
                      <div className="mb-2 space-y-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-sm">
                          {formatRupiah(item.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full items-center">
                        <Button
                          variant="outline"
                          className="p-1 h-6 w-6"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateQuantity(item.id, isNaN(val) ? 0 : val);
                          }}
                          className="w-12 h-8 p-1 text-center"
                        />
                        <Button
                          variant="outline"
                          className="p-1 h-6 w-6"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground flex h-40 flex-col items-center justify-center gap-2 text-center">
                  <span className="text-3xl">🍪</span>
                  <span>Keranjang anda kosong.</span>
                </div>
              )}
            </div>
          </ScrollArea>

          {cart.length > 0 && (
            <DrawerFooter className="border-t">
              <div className="space-y-3">
                <div className="flex justify-between px-2">
                  <span className="font-bold">Total</span>
                  <span className="font-medium">
                    {formatRupiah(getSubtotal())}
                  </span>
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    onOpenChange(false);
                    handleOrder();
                  }}
                  disabled={orderIsPending || !isFormComplete}
                  title={
                    !isFormComplete
                      ? "Lengkapi data pemesanan terlebih dahulu"
                      : ""
                  }
                >
                  {orderIsPending && <Spinner />}
                  Pesan
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Tutup
                </Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
