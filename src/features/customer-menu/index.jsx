"use client";
import React, { useState } from "react";
import { TableToolbar } from "./components/table-toolbar";
import { CardData } from "./components/card-data";
import { Cart } from "./components/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FloatingCart } from "./components/floating-cart";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MenuData() {
  const [queryParams, setQueryParams] = useState({
    search: "",
    from: "",
    to: "",
    category_id: "",
  });
  const isMobile = useIsMobile();
  const [showMobileCart, setShowMobileCart] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[calc(100vh-12rem)] min-h-0 overflow-hidden">
      <div className="flex-1 pt-1 min-w-0 flex flex-col overflow-hidden">
        <TableToolbar
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        <ScrollArea className="flex-1 mt-6 min-h-0">
          <div className="sm:pr-4">
            <CardData queryParams={queryParams} />
          </div>
        </ScrollArea>
      </div>

      {/* Desktop Cart Sidebar */}
      <div className="hidden lg:flex lg:w-3/12 flex-col gap-4 group-data-[theme-content-layout=centered]/layout:h-[calc(100vh-8rem)] group-data-[theme-content-layout=full]/layout:h-[calc(100vh-6rem)]">
        <Cart />
      </div>

      {/* Mobile Floating Cart Button */}
      {isMobile && (
        <FloatingCart
          isOpen={showMobileCart}
          onOpenChange={setShowMobileCart}
        />
      )}
    </div>
  );
}
