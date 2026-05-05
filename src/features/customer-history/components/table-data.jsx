import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah, formatWIB } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ReceiptText,
} from "lucide-react";
import { renderOrderStatus } from "../utils";
import { useRouter } from "next/navigation";

export function TableData({
  table,
  currentPage,
  setCurrentPage,
  data,
  isPending,
}) {
  const router = useRouter();

  return (
    <div>
      {/* Table */}
      <div className="hidden md:block overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24  text-center"
                >
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : data?.data?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div style={{ width: cell.column.getSize() }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- MOBILE VIEW (CARDS) --- */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {isPending ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          data?.data?.map((order) => (
            <div
              key={order.id}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm active:scale-[0.98] transition-transform"
              onClick={() => router.push(`/customer/history/${order.id}`)}
            >
              {/* Card Header: Tanggal & Status */}
              <div className="flex flex-col gap-2  p-4 bg-muted/20 border-b">
                <div className="flex justify-between items-center gap-2">
                  <ReceiptText className="w-6 h-6 text-muted-foreground" />
                  {renderOrderStatus(order.order_status)}
                </div>
                <span className="text-[11px] text-end font-medium text-muted-foreground uppercase tracking-wider">
                  {formatWIB(order.order_date)}
                </span>
              </div>

              {/* Card Body: Menu & Info Utama */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {order.code}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {order.items[0]?.menu_name}
                    {order.items.length > 1 && (
                      <span className="text-primary font-medium">
                        {` +${order.items.length - 1} menu lainnya`}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      Total Pembayaran
                    </p>
                    <p className="text-lg font-extrabold text-primary">
                      {formatRupiah(order.final_price)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 text-xs font-bold px-4 rounded-full"
                    onClick={() => router.push(`/customer/history/${order.id}`)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
        <div className="order-2 text-sm text-muted-foreground sm:order-1">
          Showing {` ${data?.pagination?.start_index + 1 || 0} `}
          to {` ${data?.pagination?.end_index || 0} `}
          of {` ${data?.pagination?.total_items || 0} `}
          results
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
            <span className="sr-only sm:not-sr-only sm:ml-2">Previous</span>
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {data?.pagination?.total_pages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(
                Math.min(data?.pagination?.total_pages || 1, currentPage + 1),
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
            onClick={() => setCurrentPage(data?.pagination?.total_pages || 1)}
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
  );
}
