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

export function useTableData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    search: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isPending } = useCustomerOrderHistory({
    page: currentPage,
    ...(debouncedSearchParams && { search: debouncedSearchParams }),
    limit: 10,
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
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.order_status;
          const statusConfig = {
            pesanan_diterima: {
              label: "Pesanan Diterima",
              className:
                "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
            },
            pesanan_diproses: {
              label: "Sedang Diproses",
              className:
                "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
            },
            pesanan_selesai: {
              label: "Selesai",
              className:
                "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
            },
            pesanan_dibatalkan: {
              label: "Dibatalkan",
              className:
                "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400",
            },
          };

          const config = statusConfig[status] || {
            label: status.replace("_", " "),
            className: "bg-gray-50 text-gray-700 border-gray-200",
          };

          return (
            <Badge
              variant="outline"
              className={`font-medium ${config.className}`}
            >
              {config.label}
            </Badge>
          );
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
    data,
    isPending,
  };
}
