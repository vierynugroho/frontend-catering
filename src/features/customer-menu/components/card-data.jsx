import { usePublicMenu } from "../hooks/use-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
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
import { formatRupiah } from "@/lib/utils";
import useCartStore from "@/store/use-cart-store";
import Autoplay from "embla-carousel-autoplay";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export const CardData = ({ queryParams }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");

  const { data, isLoading } = usePublicMenu({
    limit: 200,
    ...(debouncedSearchParams && { name: debouncedSearchParams }),
    ...(queryParams.from && { from: queryParams.from }),
    ...(queryParams.to && { to: queryParams.to }),
  });


  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearchParams(queryParams.search),
      1000,
    );
    return () => clearTimeout(timer);
  }, [queryParams.search]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 pb-20">
      {data?.data?.map((item) => (
        <Card
          key={item.id}
          className="relative rounded-md mx-auto w-full max-w-sm pt-0"
        >
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
                    className="relative z-20 aspect-video w-full object-cover h-40"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <CardHeader>
            <CardTitle className="text-sm">{item.name}</CardTitle>
            <CardDescription>
              <div className="flex items-center justify-between">
                <p>{formatRupiah(item.price)}</p>
                <Button variant="outline" onClick={() => addToCart(item)}>
                  <ShoppingCart />
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
