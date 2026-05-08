import { Badge } from "@/components/ui/badge";

export const renderOrderStatus = (status) => {
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
    label: status?.replace("_", " ") || "Unknown",
    className: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <Badge
      variant="outline"
      className={`font-medium whitespace-nowrap ${config.className}`}
    >
      {config.label}
    </Badge>
  );
};

export const renderShippingStatus = (status) => {
  const statusConfig = {
    pesanan_disiapkan: {
      label: "Pesanan Disiapkan",
      className:
        "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400",
    },
    pesanan_dalam_proses_pengiriman: {
      label: "Pesanan Dalam Proses Pengiriman",
      className:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
    },
    pesanan_selesai: {
      label: "Pesanan Selesai",
      className:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
    },
    pesanan_dibatalkan: {
      label: "Pesanan Dibatalkan",
      className:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  const config = statusConfig[status] || {
    label: status?.replace(/_/g, " ") || "Unknown",
    className:
      "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <Badge
      variant="outline"
      className={`font-medium whitespace-nowrap capitalize ${config.className}`}
    >
      {config.label}
    </Badge>
  );
};
