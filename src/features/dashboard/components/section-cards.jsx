"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import {
  Wallet,
  ShoppingCart,
  Truck,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";

export function SectionCards({ orderReport, shippingReport, stockReport }) {
  const orders = orderReport?.data;
  const shipping = shippingReport?.data;
  const stocks = stockReport?.data;

  const outOfStockCount = stocks?.out_of_stock?.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-4 lg:px-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {/* CARD 1: REVENUE */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pendapatan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(orders?.total_revenue || 0)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <Wallet className="size-3.5" />
              Revenue
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="bg-base flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Dari {orders?.total_orders || 0} Total Pesanan
          </div>
          <div className="text-muted-foreground">
            {orders?.completed_orders || 0} Pesanan selesai
          </div>
        </CardFooter>
      </Card>

      {/* CARD 2: ORDERS */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pesanan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orders?.total_orders || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <ShoppingCart className="size-3.5" />
              Orders
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm bg-base">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-amber-600 dark:text-amber-400">
            <Clock className="size-4" />
            {orders?.must_be_processed_orders || 0} Perlu Diproses
          </div>
          <div className="text-muted-foreground flex items-center gap-2">
            <Truck className="size-3.5" />
            {orders?.in_process_orders || 0} Sedang Diproses
          </div>
        </CardFooter>
      </Card>

      {/* CARD 3: SHIPPING */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Status Pengiriman</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {shipping?.completed_deliveries || 0} /{" "}
            {shipping?.retrieved_deliveries || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              <Truck className="size-3.5" />
              Delivery
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm bg-base">
          <div className="line-clamp-1 flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-4" /> Selesai Dikirim
          </div>
          <div className="text-muted-foreground">
            {shipping?.processed_deliveries || 0} Dalam Perjalanan
          </div>
        </CardFooter>
      </Card>

      {/* CARD 4: STOCK WARNING */}
      <Card
        className={`@container/card ${outOfStockCount > 0 ? "border-red-500/50 bg-red-50/50 dark:bg-red-950/10" : ""}`}
      >
        <CardHeader>
          <CardDescription
            className={
              outOfStockCount > 0 ? "text-red-600 dark:text-red-400" : ""
            }
          >
            Peringatan Stok
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums flex items-baseline gap-1 @[250px]/card:text-3xl">
            {outOfStockCount}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              Hari Kosong
            </span>
          </CardTitle>
          <CardAction>
            <Badge
              variant={outOfStockCount > 0 ? "destructive" : "outline"}
              className="flex items-center gap-1"
            >
              <AlertTriangle className="size-3.5" />
              Urgent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm bg-base">
          <div
            className={`line-clamp-1 flex items-center gap-2 font-medium ${outOfStockCount > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}
          >
            {outOfStockCount > 0 ? "Ada stok yang habis!" : "Stok bahan aman"}
          </div>
          <div className="text-muted-foreground">Cek heatmap stok di bawah</div>
        </CardFooter>
      </Card>
    </div>
  );
}