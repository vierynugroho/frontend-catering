const {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
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
      icon: <ListIcon />,
    },
    {
      title: "Users",
      url: "#",
      icon: <ChartBarIcon />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <FolderIcon />,
    },
  ],
};
