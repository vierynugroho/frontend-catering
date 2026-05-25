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
import { useMenus } from "./use-list";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function useTableData({ onEdit, onDelete, onDisable }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    search: "",
    category_id: "",
    from: "",
    to: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data, isPending } = useMenus({
    page: currentPage,
    ...(debouncedSearchParams && { name: debouncedSearchParams }),
    ...(queryParams.from && { from: queryParams.from }),
    ...(queryParams.to && { to: queryParams.to }),
    ...(queryParams.category_id && { category_id: queryParams.category_id }),
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

  useEffect(() => {
    setCurrentPage(1);
  }, [queryParams.category_id, queryParams.from, queryParams.to]);

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
          return <div className="ps-3 font-medium"> {row.original.name} </div>;
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
          return <div className="ps-3 font-medium"> {row.original.slug} </div>;
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Harga
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium">
              {formatRupiah(row.original.price)}
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Kategori
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium">
              {row?.original?.category?.name || ""}
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
        accessorKey: "description",
        header: "Deskripsi",

        cell: ({ row }) => {
          return (
            <div className="font-medium truncate">
              {row.original.description}
            </div>
          );
        },
      },
      {
        accessorKey: "images",
        header: "Gambar",
        cell: ({ row }) => {
          return (
            <Carousel
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent className="cursor-pointer">
                {row.original.images.map((_, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={_.url}
                      alt={_.url}
                      className="object-cover w-full h-32 rounded-sm"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          );
        },
      },

      {
        id: "actions",
        size: 10,
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
