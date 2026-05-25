import { Button } from "@/components/ui/button";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowRightIcon, ListOrderedIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCustomerOrderHistory } from "./use-list";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { formatRupiah, formatWIB } from "@/lib/utils";
import { renderOrderStatus, renderShippingStatus } from "../utils";

export function useTableData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    shipping_status: "",
    order_status: "",
    delivery_method: "",
    search: "",
  });
  const [range, setRange] = useState(undefined);

  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isPending } = useCustomerOrderHistory({
    page: currentPage,
    ...(debouncedSearchParams && { search: debouncedSearchParams }),
    limit: 10,
    ...(queryParams.shipping_status !== "" && {
      shipping_status: queryParams?.shipping_status,
    }),
    ...(queryParams.order_status !== "" && {
      order_status: queryParams?.order_status,
    }),
    ...(queryParams.delivery_method !== "" && {
      delivery_method: queryParams?.delivery_method,
    }),
    ...(range?.from && {
      from: range?.from,
    }),
    ...(range?.to && {
      to: range?.to,
    }),
  });

  const route = useRouter();

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearchParams(queryParams.search),
      1000,
    );
    return () => clearTimeout(timer);
  }, [queryParams.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [queryParams.shipping_status, queryParams.order_status, queryParams.delivery_method, range]);

  const table = useReactTable({
    data: data?.data || [],
    columns: [
      {
        accessorKey: "code",
        header: () => {
          return <p className="ps-3">Kode Order</p>;
        },
        cell: ({ row }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => route.push(`/customer/history/${row.original.id}`)}
              className="ps-3 font-bold"
            >
              {row.original.code}
            </Button>
          );
        },
      },
      {
        accessorKey: "customer_name",
        header: () => {
          return <p className="ps-3">Pemesan</p>;
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 ">
              <p className="sm:text-sm text-xs ">
                {row.original.customer_name}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "ordered_by",
        header: () => {
          return <p className="ps-3">Dipesankan Oleh</p>;
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 ">
              <p className="sm:text-sm text-xs font-semibold ">
                {row.original.ordered_by.fullname}
              </p>
              <p className="sm:text-sm text-xs ">
                {row.original.ordered_by.email}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "order_date",
        header: "Tanggal",
        cell: ({ row }) => {
          return <p>{formatWIB(row.original.order_date)}</p>;
        },
      },
      {
        accessorKey: "items",
        header: "Menu",
        cell: ({ row }) => {
          const items = row.original.items;
          const firstItem = items[0]?.menu_name;
          const extraItems = items.length - 1;
          return (
            <div className="text-sm">
              {firstItem}
              {extraItems > 0 && (
                <span className="text-muted-foreground">
                  (+{extraItems} lainnya)
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "final_price",
        header: "Total",
        cell: ({ row }) => {
          return (
            <div className="font-semibold">
              {formatRupiah(row.original.final_price)}
            </div>
          );
        },
      },
      {
        accessorKey: "order_status",
        header: "Status Pesanan",
        cell: ({ row }) => {
          const status = row.original.order_status;

          return renderOrderStatus(status);
        },
      },
      {
        accessorKey: "shipping_status",
        header: "Status Pengirimin",
        cell: ({ row }) => {
          const status = row.original.shipping_status;

          return <p className="ps-3">{renderShippingStatus(status)}</p>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  route.push(`/customer/history/${row.original.id}`)
                }
              >
                Detail Order
                <ArrowRightIcon className="w-full" />
              </Button>
            </div>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: data?.pagination?.total_pages || 1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
  });

  return {
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    range,
    setRange,
    data,
    isPending,
  };
}
