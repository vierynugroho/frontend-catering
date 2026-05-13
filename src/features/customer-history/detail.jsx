"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  Truck,
  Home,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Clock,
  ReceiptText,
  MessageCircle,
  Ban,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { TableToolbar } from "./components/table-toolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomerOrderDetail } from "./hooks/use-detail-order";
import { cn, formatRupiah, formatWIB } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useCustomerValidateInvoice } from "./hooks/use-validate-invoice";
import { useCustomerDownloadInvoice } from "./hooks/use-download-invoice";
import { orderDetailStatusConfig } from "@/types/enums";
import { useCancelOrder } from "./hooks/use-cancel-order";
import { useConfirmOrder } from "./hooks/use-confirm-order";
import useCartStore from "@/store/use-cart-store";

export default function OrderDetailHistoryTableData() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { data: response, isLoading } = useCustomerOrderDetail(id);
  const { data: validateResponse, isLoading: isValidateLoading } =
    useCustomerValidateInvoice(id);
  const { mutate: downloadInvoice, isPending: isDownloading } =
    useCustomerDownloadInvoice();
  const { cancel } = useCancelOrder();
  const { confirm } = useConfirmOrder();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const orderData = response?.data;
  const validateData = validateResponse?.data;

  if (isLoading || isValidateLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] animate-pulse">
        <Spinner />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="p-20 text-center text-muted-foreground">
        Data tidak ditemukan.
      </div>
    );
  }

  const statuses = [
    { label: "Disiapkan", key: "pesanan_disiapkan", icon: Package },
    {
      label: "Dalam Pengiriman",
      key: "pesanan_dalam_proses_pengiriman",
      icon: Truck,
    },
    { label: "Selesai", key: "pesanan_selesai", icon: Home },
  ];

  const isPickup = orderData.delivery_method === "ambil_sendiri";
  const isCancelled =
    orderData.order_status === "pesanan_dibatalkan" ||
    (!isPickup && orderData.shipping_status === "pesanan_dibatalkan");
  const isNewOrder = orderData.order_status === "pesanan_diterima";
  const canConfirm =
    orderData.order_status === "pesanan_diproses" &&
    (isPickup ||
      orderData.shipping_status === "pesanan_dalam_proses_pengiriman" ||
      orderData.shipping_status === "pesanan_selesai") &&
    orderData.order_status !== "pesanan_selesai";

  const canReorder =
    orderData.order_status === "pesanan_selesai" ||
    orderData.order_status === "pesanan_dibatalkan";

  const currentStatusIndex = statuses.findIndex(
    (s) => s.key === orderData.shipping_status,
  );
  const safeStatusIndex =
    currentStatusIndex !== -1 ? currentStatusIndex : isCancelled ? -1 : 0;

  const handleWhatsApp = () => {
    const adminPhone = "6282234187211";
    const message = `Halo Admin Catering Dhewi, saya ingin melakukan konfirmasi/mengajukan pembayaran untuk pesanan dengan kode invoice: *${orderData?.code || id}*.`;

    const encodedMessage = encodeURIComponent(message);

    const waUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 min-h-screen text-foreground sm:pb-0 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Detail Utama & Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <Card className="overflow-hidden border-border shadow-sm">
            <div className="bg-primary/5 p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-primary">
                  {orderData.code}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatWIB(orderData.order_date, true)}</span>
                </div>
              </div>
              <Badge
                className={`${orderDetailStatusConfig[orderData.order_status] || "bg-slate-500"} text-white border-none px-4 py-1 capitalize`}
              >
                {orderData.order_status.replace("_", " ")}
              </Badge>
            </div>

            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informasi Pembeli */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <div className="p-1.5 bg-secondary rounded-md">
                    <Package className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  Informasi Pembeli
                </div>
                <div className="pl-9 space-y-1">
                  <p className="font-semibold text-foreground">
                    {orderData.ordered_by?.fullname}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-3.5 h-3.5 mr-2" />
                    {orderData.ordered_by?.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 mr-2" /> {orderData.phone}
                  </div>
                </div>
              </div>

              {/* Lokasi Pengiriman */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <div className="p-1.5 bg-secondary rounded-md">
                    <MapPin className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  {orderData.destination
                    ? "Lokasi Pengiriman"
                    : "Lokasi Pengambilan"}
                </div>
                <div className="pl-9 space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {orderData.destination || "Catering Dhewi"}
                  </p>
                  {orderData.note && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-xs text-amber-600 dark:text-amber-400 italic">
                      Catatan: {orderData.note}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table Items */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                Daftar Produk
                <Badge variant="secondary" className="font-mono">
                  {orderData.items?.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[300px] md:w-[400px]">
                        Produk
                      </TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Harga</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderData.items?.map((item, idx) => (
                      <TableRow
                        key={idx}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg border border-border overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={item.menu_images?.[0]?.url}
                                alt={item.menu_name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-foreground truncate">
                                {item.menu_name}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono uppercase">
                                ID: {item.menu_id?.substring(0, 8)}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {item.quantity}x
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {formatRupiah(item.menu_price)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-primary">
                          {formatRupiah(item.subtotal)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Summary & Status */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="border-none shadow-md bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg opacity-90">
                Ringkasan Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm opacity-80">
                  <span>Subtotal</span>
                  <span>{formatRupiah(orderData.normal_price)}</span>
                </div>
                {!isPickup && (
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Ongkos Kirim</span>
                    <span>
                      {orderData.shipping_cost === 0
                        ? "GRATIS"
                        : formatRupiah(orderData.shipping_cost)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm opacity-80">
                  <span>Diskon</span>
                  <span>
                    {orderData.discount === 0
                      ? "0"
                      : formatRupiah(orderData.discount)}
                  </span>
                </div>
              </div>
              <Separator className="bg-primary-foreground/20" />
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium opacity-90">
                  Total Bayar
                </span>
                <span className="text-2xl font-black">
                  {formatRupiah(orderData.final_price)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* WA */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-md font-bold flex justify-between">
                Konfirmasi Pemesanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className=" flex-col flex gap-4">
                {isNewOrder && !isCancelled && (
                  <Button variant="secondary" onClick={handleWhatsApp}>
                    <MessageCircle />
                    Ajukan Pembayaran
                  </Button>
                )}

                {isNewOrder && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setIsCancelModalOpen(true)}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Batalkan Pesanan
                  </Button>
                )}
                {canConfirm && (
                  <Button
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Pesanan Diterima
                  </Button>
                )}

                {canReorder && (
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full font-semibold transition-all",
                      // Light Mode: Teks & Border Indigo, Hover tipis
                      "border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700",
                      // Dark Mode: Border & Teks Indigo terang agar kontras, Hover indigo gelap
                      "dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-300",
                    )}
                    onClick={() => {
                      orderData.items.forEach((item) => {
                        addToCart({
                          id: item.menu_id,
                          name: item.menu_name,
                          price: item.menu_price,
                          images: item.menu_images,
                          qty: item.quantity,
                        });
                      });
                      router.push("/customer/order");
                    }}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Pesan Lagi
                  </Button>
                )}

                <Button
                  variant="default"
                  disabled={
                    !validateData?.is_valid_to_download || isDownloading
                  }
                  onClick={() =>
                    downloadInvoice({
                      order_id: id,
                      order_code: orderData?.code,
                    })
                  }
                >
                  {isDownloading ? <Spinner /> : <ReceiptText />}
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Tracking Stepper */}
          {!isPickup && (
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-md font-bold flex justify-between">
                  Lacak Pengiriman
                  {isCancelled && (
                    <Badge variant="destructive">Dibatalkan</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isCancelled ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                    <div className="p-3 bg-destructive/10 rounded-full">
                      <ClipboardList className="w-8 h-8 text-destructive" />
                    </div>
                    <p className="text-sm font-medium text-destructive">
                      Pesanan ini telah dibatalkan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                    {statuses.map((step, idx) => {
                      const Icon = step.icon;
                      const isDone = idx <= safeStatusIndex;
                      const isCurrent = idx === safeStatusIndex;

                      return (
                        <div
                          key={idx}
                          className="relative flex items-start gap-4"
                        >
                          <div
                            className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                              isDone
                                ? "border-primary bg-background text-primary shadow-sm"
                                : "border-muted bg-background text-muted-foreground"
                            }`}
                          >
                            {isDone && idx !== safeStatusIndex ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Icon
                                className={`w-5 h-5 ${isCurrent ? "animate-pulse" : ""}`}
                              />
                            )}
                          </div>
                          <div className="flex flex-col pt-1">
                            <span
                              className={`text-sm font-bold ${isDone ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {step.label}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full w-fit mt-1">
                                Posisi Saat Ini
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center text-xl">
              Konfirmasi Pembatalan
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Apakah Anda yakin ingin membatalkan pesanan{" "}
              <span className="font-bold text-foreground">
                {orderData.code}
              </span>
              ? Tindakan ini tidak dapat dipulihkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsCancelModalOpen(false)}
            >
              Kembali
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              disabled={cancel.isPending}
              onClick={() => {
                cancel.mutate(
                  { id: id },
                  {
                    onSuccess: () => setIsCancelModalOpen(false), // Tutup modal jika sukses
                  },
                );
              }}
            >
              {cancel.isPending ? <Spinner /> : "Ya, Batalkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">
              Pesanan Sudah Sampai?
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Dengan menekan tombol di bawah, Anda menyatakan bahwa pesanan{" "}
              <span className="font-bold text-foreground">
                {orderData.code}
              </span>{" "}
              telah diterima dengan baik.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Belum, Kembali
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={confirm.isPending}
              onClick={() => {
                confirm.mutate(
                  { id: id },
                  { onSuccess: () => setIsConfirmModalOpen(false) },
                );
              }}
            >
              {confirm.isPending ? <Spinner /> : "Ya, Saya Terima"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
