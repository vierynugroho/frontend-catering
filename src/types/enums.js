const {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  FactoryIcon,
  SoupIcon,
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
      title: "Kategori",
      url: "/admin/category",
      icon: <FactoryIcon />,
    },
    {
      title: "Stock",
      url: "/admin/stock",
      icon: <FactoryIcon />,
    },
  ],
};
