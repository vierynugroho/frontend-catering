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
  BadgeCheckIcon,
  Grid2X2,
  Pencil,
  Trash2,
  EllipsisVerticalIcon,
  XCircleIcon,
  Ban,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCategories } from "./use-list";
import { formatWIB } from "@/lib/utils";

export function useTableData({ onEdit, onDelete, onDisable }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    search: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isPending } = useCategories({
    page: currentPage,
    ...(debouncedSearchParams && { name: debouncedSearchParams }),
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
        accessorKey: "name",
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
            <div
              className="ps-2 sm:ps-3 font-medium truncate max-w-[100px] sm:max-w-[200px] md:max-w-xs"
              title={row.original.name}
            >
              {row.original.name}
            </div>
          );
        },
      },
      {
        accessorKey: "slug",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Slug
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div
              className="ps-2 sm:ps-3 font-medium truncate max-w-[100px] sm:max-w-[200px] md:max-w-xs"
              title={row.original.slug}
            >
              {row.original.slug}
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Tanggal dibuat",

        cell: ({ row }) => {
          return (
            <div className="font-medium">
              {formatWIB(row.original.created_at)}
            </div>
          );
        },
      },
      {
        accessorKey: "updated_at",
        header: "Tanggal diperbarui",
        cell: ({ row }) => {
          return (
            <div className="font-medium">
              {formatWIB(row.original.updated_at)}
            </div>
          );
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
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuItem onClick={() => onEdit(row.original)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => onDisable(row.original)}>
                    <Ban className="h-4 w-4" />
                    Nonaktifkan
                  </DropdownMenuItem> */}
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
