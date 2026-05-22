import { usePublicMenu } from "../hooks/use-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
// Tambahkan import Dialog dari shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatRupiah } from "@/lib/utils";
import useCartStore from "@/store/use-cart-store";
import Autoplay from "embla-carousel-autoplay";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const CardData = ({ data, isPending }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedItem, setSelectedItem] = useState(null);

  if (isPending) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 ">
        {data?.data?.map((item) => (
          <Card
            key={item.id}
            className="relative rounded-md w-full pt-0 hover:shadow-lg transition-shadow overflow-hidden flex flex-col pb-6"
          >
            {item.category?.name && (
              <div className="absolute top-2 right-2 z-30">
                <Badge
                  variant="secondary"
                  className="bg-white/80 dark:bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-medium border-none shadow-sm capitalize"
                >
                  {item.category.name}
                </Badge>
              </div>
            )}
            <Carousel
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
            >
              <CarouselContent className="cursor-pointer">
                {item.images.map((_, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={_.url}
                      alt={_.url}
                      className="relative z-20 aspect-video w-full object-cover h-24 sm:h-28 md:h-32 lg:h-40"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <CardHeader className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
              <CardTitle className="text-xs sm:text-sm md:text-sm line-clamp-2">
                {item.name}
              </CardTitle>

              <CardDescription className="flex flex-col w-full flex-grow justify-between mt-1">
                <div className="flex flex-col items-start">
                  <p className="text-xs sm:text-sm line-clamp-2">
                    {item.description}
                  </p>

                  {item.description && item.description.length > 30 && (
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-[10px] cursor-pointer sm:text-xs text-primary font-medium hover:underline mt-1"
                    >
                      selengkapnya...
                    </button>
                  )}
                </div>

                <div className="flex sm:flex-row sm:justify-between flex-col gap-2 mt-2">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs sm:text-sm font-semibold flex items-center">
                      {formatRupiah(item.price)}
                    </p>
                    {item.min_order > 1 && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Min. {item.min_order} porsi
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => addToCart(item)}
                    className="py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm w-fit"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Modal Detail Item */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}
      >
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          {selectedItem && (
            <>
              <ScrollArea className="max-h-[85vh] w-full">
                {/* Carousel di dalam Modal */}
                <Carousel
                  className="w-full"
                  plugins={[Autoplay({ delay: 3000 })]}
                >
                  <CarouselContent>
                    {selectedItem.images.map((_, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={_.url}
                          alt={_.url}
                          className="aspect-video w-full object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                <div className="p-6 space-y-4">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      {selectedItem.name}
                    </DialogTitle>
                    {selectedItem.category?.name && (
                      <Badge
                        variant="secondary"
                        className="w-fit capitalize mt-1"
                      >
                        {selectedItem.category.name}
                      </Badge>
                    )}
                  </DialogHeader>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Deskripsi Lengkap
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-lg font-bold">
                        {formatRupiah(selectedItem.price)}
                      </p>
                      {selectedItem.min_order > 1 && (
                        <p className="text-xs text-muted-foreground">
                          Min. {selectedItem.min_order} porsi
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        addToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Tambah
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
