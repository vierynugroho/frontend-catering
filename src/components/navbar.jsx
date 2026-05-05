"use client";

import { useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLogout } from "@/hooks/use-logout";
import { LogOutIcon, User2, UserIcon, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navbar({ user }) {
  const [openMobile, setOpenMobile] = useState(false);
  const route = useRouter();
  const { mutate: logout, isPending } = useLogout();
  const token = Cookies.get("access_token");

  const navItems = [
    { title: "Riwayat Pemesanan", url: "/customer/history" },
    { title: "Menu", url: "/customer/menu" },
  ];

  const handleNavClick = () => {
    setOpenMobile(false);
  };


  return (
    <div className="border-b bg-muted">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 max-w-[90rem] mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/customer/menu" className="text-lg sm:text-xl font-bold">
            Catering Dhewi
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link key={item.title} href={item.url}>
              <Button variant="ghost">{item.title}</Button>
            </Link>
          ))}

          {!token && (
            <Button asChild>
              <Link href="/login">Masuk</Link>
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
                  <span className="hidden lg:inline">{user?.fullname}</span>
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

          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <ModeToggle />
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={handleNavClick}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      {item.title}
                    </Button>
                  </Link>
                ))}

                <div className="border-t pt-4">
                  {!token && (
                    <Button asChild className="w-full">
                      <Link href="/auth/login" onClick={handleNavClick}>
                        Masuk
                      </Link>
                    </Button>
                  )}
                  {token && (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          route.push("/customer/profile");
                          handleNavClick();
                        }}
                      >
                        <User2 className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          logout();
                          handleNavClick();
                        }}
                        disabled={isPending}
                      >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
