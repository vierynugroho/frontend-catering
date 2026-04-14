"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
// 1. Tambahkan 'Legend' pada import recharts di bawah ini:
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from "recharts";
import { CalendarX, CheckCircle, Package } from "lucide-react";

export function SectionCharts({ orderReport, stockReport }) {
  // 1. Ekstrak Data Order
  const orders = orderReport?.data || {};
  const totalOrders = orders.total_orders || 0;

  // Siapkan data untuk grafik Donut (Pie Chart)
  const chartData = useMemo(() => {
    return [
      {
        name: "Perlu Diproses",
        value: orders.must_be_processed_orders || 0,
        fill: "#ef4444", // Merah (Tailwind red-500)
      },
      {
        name: "Sedang Diproses",
        value: orders.in_process_orders || 0,
        fill: "#3b82f6", // Biru (Tailwind blue-500)
      },
      {
        name: "Selesai",
        value: orders.completed_orders || 0,
        fill: "#10b981", // Hijau (Tailwind emerald-500)
      },
      {
        name: "Dibatalkan",
        value: orders.cancelled_orders || 0,
        fill: "#9ca3af", // Abu-abu (Tailwind gray-400)
      },
    ].filter((item) => item.value > 0); // Sembunyikan kalau nilainya 0 biar chart rapi
  }, [orders]);

  // Konfigurasi wajib untuk shadcn chart
  const chartConfig = {
    value: { label: "Pesanan" },
  };

  // 2. Ekstrak Data Stock
  const stocks = stockReport?.data || {};
  const outOfStockDates = stocks.out_of_stock || [];

  // Formatter tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 lg:px-6 mt-4">
      {/* BAGIAN KIRI (Lebar): Grafik Distribusi Pesanan */}
      <Card className="lg:col-span-7 flex flex-col shadow-xs">
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribusi Status Pesanan</CardTitle>
          <CardDescription>
            Proporsi pesanan berdasarkan status saat ini
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {/* Tambahkan margin bawah pada ChartContainer jika Legend terpotong */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px] w-full pb-4" 
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={90}
                  strokeWidth={5}
                  paddingAngle={2}
                >
                  {/* Label di tengah donut */}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold tabular-nums"
                            >
                              {totalOrders}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              Total Order
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                
                {/* 2. Tambahkan komponen Legend di sini */}
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle" // Mengubah icon legend menjadi bulat agar lebih modern
                  wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} 
                />

              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* BAGIAN KANAN (Sempit): Peringatan & Log Stok */}
      <Card className="lg:col-span-5 shadow-xs flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="size-5" />
            Log Kekosongan Stok
          </CardTitle>
          <CardDescription>Riwayat tanggal stok bahan habis</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pr-2">
          {outOfStockDates.length > 0 ? (
            <ScrollArea className="h-[250px] w-full pr-4">
              <div className="flex flex-col gap-3">
                {outOfStockDates.map((dateStr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-md border bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
                        <CalendarX className="size-4" />
                      </div>
                      <span className="text-sm font-medium">
                        {formatDate(dateStr)}
                      </span>
                    </div>
                    <Badge variant="destructive" className="text-[10px]">
                      Out of Stock
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground min-h-[200px]">
              <CheckCircle className="size-10 text-emerald-500/50" />
              <p className="text-sm">Stok selalu aman bulan ini!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}