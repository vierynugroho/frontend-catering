const {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  FactoryIcon,
  SoupIcon,
  ShoppingBagIcon,
  UserCheck2,
} = require("lucide-react");

export const navByRole = {
  customer: [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Menu",
      url: "/customer/menu",
      icon: <ListIcon />,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Pesanan",
      url: "/admin/order",
      icon: <ShoppingBagIcon />,
    },
    {
      title: "Kategori",
      url: "/admin/category",
      icon: <ChartBarIcon />,
    },
    {
      title: "Menu",
      url: "/admin/menu",
      icon: <SoupIcon />,
    },
    {
      title: "Pengguna",
      url: "/admin/user",
      icon: <UsersIcon />,
    },


    {
      title: "Jadwal",
      url: "/admin/stock",
      icon: <FactoryIcon />,
    },
  ],
};

export const OrderStatus = [
  { label: "Pesanan Diterima", value: "pesanan_diterima" },
  { label: "Pesanan Diproses", value: "pesanan_diproses" },
  { label: "Pesanan Selesai", value: "pesanan_selesai" },
  { label: "Pesanan Dibatalkan", value: "pesanan_dibatalkan" },
];

export const ShippingStatus = [
  { label: "Pesanan Disiapkan", value: "pesanan_disiapkan" },
  {
    label: "Pesanan Dalam Proses Pengiriman",
    value: "pesanan_dalam_proses_pengiriman",
  },
  { label: "Pesanan Selesai", value: "pesanan_selesai" },
  { label: "Pesanan Dibatalkan", value: "pesanan_dibatalkan" },
];

export const orderDetailStatusConfig = {
  pesanan_diterima: "bg-blue-500 hover:bg-blue-600",
  pesanan_diproses: "bg-amber-500 hover:bg-amber-600",
  pesanan_selesai: "bg-emerald-500 hover:bg-emerald-600",
  pesanan_dibatalkan: "bg-rose-500 hover:bg-rose-600",
};