"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, TrendingDown } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

// Helper untuk mengambil inisial nama (misal: "Admin Catering" -> "AC")
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export function SectionLeaderboards({ customerReport, menuReport }) {
  // Ekstrak Data
  const customers = customerReport?.data || {};
  const menus = menuReport?.data || {};

  const topCustomers = customers.top_customers || [];
  const leastCustomers = customers.least_customers || [];

  const topMenus = menus.top_selling || [];
  const leastMenus = menus.least_selling || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6 mt-4 pb-8">
      {/* KARTU 1: CUSTOMER LEADERBOARD */}
      <Card className="shadow-xs flex flex-col h-[400px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-blue-500" />
            Performa Pelanggan
          </CardTitle>
          <CardDescription>Peringkat loyalitas pelanggan</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <Tabs defaultValue="top" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="top">Top Spenders</TabsTrigger>
              <TabsTrigger value="least">Needs Attention</TabsTrigger>
            </TabsList>

            {/* Konten Top Spenders */}
            <TabsContent value="top" className="flex-1 mt-0">
              <ScrollArea className="h-[260px] pr-4">
                <div className="flex flex-col gap-4">
                  {topCustomers.map((cust, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 -mx-2 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {getInitials(cust.fullname)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium leading-none mb-1 group-hover:text-primary transition-colors">
                            {cust.fullname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cust.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                          {formatRupiah(cust.total_spent)}
                        </p>
                        {/* Area ini cocok untuk trigger modal top_ordered_menu_by_customer nantinya */}
                        {/* <p className="text-[10px] text-muted-foreground mt-0.5 underline decoration-dashed underline-offset-2">
                          Lihat Favorit
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Konten Least Spenders */}
            <TabsContent value="least" className="flex-1 mt-0">
              <ScrollArea className="h-[260px] pr-4">
                <div className="flex flex-col gap-4">
                  {leastCustomers.map((cust, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 -mx-2"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                            {getInitials(cust.fullname)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium leading-none mb-1">
                            {cust.fullname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cust.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium tabular-nums text-muted-foreground">
                          {formatRupiah(cust.total_spent)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* KARTU 2: TOP SELLING MENUS */}
      <Card className="shadow-xs flex flex-col h-[400px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5 text-amber-500" />
            Menu Paling Laris
          </CardTitle>
          <CardDescription>Penyumbang pendapatan utama</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ScrollArea className="h-[300px] pr-4">
            <div className="flex flex-col gap-4">
              {topMenus.map((menu) => (
                <div
                  key={menu.menu_id}
                  className="flex items-center gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  {/* Thumbnail Gambar */}
                  <div className="size-12 rounded-md overflow-hidden bg-muted shrink-0">
                    <img
                      src={menu.images[0]?.url || "/placeholder-food.jpg"}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate mb-1.5">
                      {menu.name}
                    </p>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-normal px-1.5"
                    >
                      {menu?.category?.name}
                    </Badge>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold tabular-nums">
                      {menu.total_order}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Terjual</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* KARTU 3: LEAST SELLING MENUS */}
      <Card className="shadow-xs flex flex-col h-[400px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="size-5 text-destructive" />
            Menu Kurang Laris
          </CardTitle>
          <CardDescription>Kandidat untuk dievaluasi/promo</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ScrollArea className="h-[300px] pr-4">
            <div className="flex flex-col gap-4">
              {leastMenus.map((menu) => (
                <div
                  key={menu.menu_id}
                  className="flex items-center gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="size-12 rounded-md overflow-hidden bg-muted shrink-0 grayscale">
                    <img
                      src={menu.images[0]?.url || "/placeholder-food.jpg"}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate mb-1.5">
                      {menu.name}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-normal px-1.5 text-muted-foreground"
                    >
                      {menu?.category?.name}
                    </Badge>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium tabular-nums text-destructive">
                      {menu.total_order}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Terjual</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
