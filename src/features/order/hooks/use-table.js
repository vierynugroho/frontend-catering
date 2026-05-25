import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Pencil,
  Trash2,
  EllipsisVerticalIcon,
  BadgeCheckIcon,
  XCircleIcon,
  ReceiptCentIcon,
  BoxIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useOrder } from "./use-list";
import { formatRupiah, formatWIB } from "@/lib/utils";
import {
  renderOrderStatus,
  renderShippingStatus,
} from "@/features/customer-history/utils";
import { useRouter } from "next/navigation";

export function useTableData({ onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    shipping_status: "",
    order_status: "",
    delivery_method: "",
    search: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [range, setRange] = useState(undefined);

  const { data, isPending } = useOrder({
    page: currentPage,
    ...(debouncedSearchParams && { search: debouncedSearchParams }),
    limit: 10,
    ...(queryParams.shipping_status !== "" && {
      shipping_status: queryParams.shipping_status,
    }),
    ...(queryParams.order_status !== "" && {
      order_status: queryParams.order_status,
    }),
    ...(queryParams.delivery_method !== "" && {
      delivery_method: queryParams.delivery_method,
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
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Kode Order
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },

        cell: ({ row }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => route.push(`/admin/order/${row.original.id}`)}
              className="ps-3 font-bold"
            >
              {row.original.code}
            </Button>
          );
        },
      },
      {
        accessorKey: "customer_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Pemesan
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
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
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Dipesankan oleh
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
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
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tanggal
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return <p className="ps-3">{formatWIB(row.original.order_date)}</p>;
        },
      },

      {
        accessorKey: "items",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Menu
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const items = row.original.items;
          const firstItem = items[0]?.menu_name;
          const extraItems = items.length - 1;
          return (
            <div className="text-sm ps-3">
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
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Total
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="font-semibold ps-3">
              {formatRupiah(row.original.final_price)}
            </div>
          );
        },
      },

      {
        accessorKey: "order_status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status Pesanan
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const status = row.original.order_status;

          return <p className="ps-3">{renderOrderStatus(status)}</p>;
        },
      },
      {
        accessorKey: "shipping_status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status Pengiriman
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                  >
                    <EllipsisVerticalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-42">
                  <DropdownMenuItem
                    onClick={() =>
                      route.push(`/admin/order/${row.original.id}`)
                    }
                  >
                    <BoxIcon className="h-4 w-4" />
                    Detail
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      route.push(`/admin/order/update/${row.original.id}`)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => onDelete(row.original)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
    setRange,
    range,
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    data,
    isPending,
  };
}
