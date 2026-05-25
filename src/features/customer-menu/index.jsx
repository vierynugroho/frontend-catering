"use client";
import React, { useEffect, useState } from "react";
import { TableToolbar } from "./components/table-toolbar";
import { CardData } from "./components/card-data";
import { Cart } from "./components/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FloatingCart } from "./components/floating-cart";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { usePublicMenu } from "./hooks/use-list"; // pindah ke sini
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function MenuData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    search: "",
    from: "",
    to: "",
    category_id: "",
  });
  const isMobile = useIsMobile();
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce search di parent, reset page ke 1 saat search berubah
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(queryParams.search);
      setCurrentPage(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [queryParams.search]);

  // reset page ke 1 saat filter non-search berubah
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [queryParams.category_id, queryParams.from, queryParams.to]);

  const { data, isPending } = usePublicMenu({
    page: currentPage,
    limit: 16,
    ...(debouncedSearch && { name: debouncedSearch }),
    ...(queryParams.from && { from: queryParams.from }),
    ...(queryParams.to && { to: queryParams.to }),
    ...(queryParams.category_id && { category_id: queryParams.category_id }),
  });

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[calc(100vh-12rem)] min-h-0 overflow-hidden">
      <div className="flex-1 pt-1 min-w-0 flex flex-col overflow-hidden">
        <TableToolbar
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        <ScrollArea className="flex-1 mt-6 min-h-0">
          <div className="sm:pr-4">
            <CardData data={data} isPending={isPending} /> {/* teruskan data */}
            {/* pagination */}
            <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row pb-20">
              <div className="order-2 text-sm text-muted-foreground sm:order-1">
                Showing {data?.pagination?.start_index + 1 || 0} to{" "}
                {data?.pagination?.end_index || 0} of{" "}
                {data?.pagination?.total_items || 0} results
              </div>
              <div className="order-1 flex items-center space-x-2 sm:order-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1 || isPending}
                  className="hidden sm:flex"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={!data?.pagination?.has_previous_page || isPending}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:ml-2">
                    Previous
                  </span>
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {data?.pagination?.total_pages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        data?.pagination?.total_pages || 1,
                        currentPage + 1,
                      ),
                    )
                  }
                  disabled={!data?.pagination?.has_next_page || isPending}
                >
                  <span className="sr-only sm:not-sr-only sm:mr-2">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(data?.pagination?.total_pages || 1)
                  }
                  disabled={
                    currentPage === data?.pagination?.total_pages || isPending
                  }
                  className="hidden sm:flex"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="hidden lg:flex lg:w-3/12 flex-col gap-4 ...">
        <Cart />
      </div>

      {isMobile && (
        <FloatingCart
          isOpen={showMobileCart}
          onOpenChange={setShowMobileCart}
        />
      )}
    </div>
  );
}
