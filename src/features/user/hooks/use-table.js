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
  Ban,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "./use-list";
import { formatWIB } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function useTableData({ onEdit, onDelete, onDisable }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    search: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isPending } = useUser({
    page: currentPage,
    ...(debouncedSearchParams && { search: debouncedSearchParams }),
    limit: 10,
  });

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
        accessorKey: "fullname",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nama
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium"> {row.original.fullname} </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return <div className="ps-3 font-medium"> {row.original.email} </div>;
        },
      },
      {
        accessorKey: "role",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Role
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return <div className="ps-3 font-medium"> {row.original.role} </div>;
        },
      },
      {
        accessorKey: "customer_type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tipe Pelanggan
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const type = row.original.customer_type;

          const label = type ? type.replace(/_/g, " ") : "-";

          const badgeStyles =
            type === "new_customer"
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 border-blue-200 dark:border-blue-800"
              : type === "reguler_customer"
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";

          return (
            <div className="ps-3">
              <Badge
                variant="outline"
                className={`capitalize px-2.5 py-0.5 font-semibold transition-colors ${badgeStyles}`}
              >
                {label}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "phone",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Telepon
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium">{row.original.phone ?? "-"}</div>
          );
        },
      },
      {
        accessorKey: "address",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Alamat
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium">
              {row.original.address ?? "-"}
            </div>
          );
        },
      },
      {
        accessorKey: "is_active",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium">
              {row.original.is_active === true ? (
                <Badge
                  variant="secondary"
                  className="border border-green-400 bg-green-50 text-green-800 dark:bg-green-900/70 dark:text-white/80"
                >
                  <BadgeCheckIcon />
                  Aktif
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="border border-red-400 bg-red-50 text-red-800 dark:bg-red-900/70 dark:text-white/80"
                >
                  <XCircleIcon />
                  Tidak Aktif
                </Badge>
              )}
            </div>
          );
        },
      },

      {
        size: 10,
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
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuItem onClick={() => onEdit(row.original)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDisable(row.original)}>
                    <Ban className="h-4 w-4" />
                    Nonaktifkan
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
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    data,
    isPending,
  };
}
