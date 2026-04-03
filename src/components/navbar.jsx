"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import {
  EllipsisVerticalIcon,
  LogOutIcon,
  User2,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar({ user }) {
  const route = useRouter();
  const { mutate: logout, isPending } = useLogout();
  const token = Cookies.get("access_token");

  const navItems = [
    { title: "Dashboard", url: "/customer/dashboard" },
    { title: "Menu", url: "/customer/menu" },
  ];

  console.log("user dari navbar", user);

  return (
    <div className="border-b bg-muted">
      <nav className="flex items-center justify-between px-10 py-4 max-w-[90rem] mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/customer/dashboard" className="text-xl font-bold">
            Catering Dhewi
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button variant="ghost">{item.title}</Button>
            </Link>
          ))}
          {!token && (
            <Button asChild>
              <Link href="/auth/login">Masuk</Link>
            </Button>
          )}
          {token && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback className="rounded-lg">
                      <UserIcon className=" h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <span>{user?.fullname}</span>
                  <EllipsisVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => route.push("/customer/profile")}
                  >
                    <User2 className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} disabled={isPending}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </div>
  );
}
