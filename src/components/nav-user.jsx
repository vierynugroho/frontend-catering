"use client";

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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/use-logout";
import { EllipsisVerticalIcon, LogOutIcon, User2 } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function NavUser({ user }) {
  const route = useRouter();
  const { isMobile } = useSidebar();
  const { mutate: logout, isPending } = useLogout();
  const token = Cookies.get("access_token");
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
              <CircleUserRoundIcon />
              Account
              </DropdownMenuItem>
              <DropdownMenuItem>
              <CreditCardIcon />
              Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
              <BellIcon />
              Notifications
              </DropdownMenuItem>
              </DropdownMenuGroup> */}
            {token && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-2"
                  onClick={() =>
                    route.push(
                      user.role === "admin"
                        ? "/admin/profile"
                        : "/customer/profile",
                    )
                  }
                >
                  <User2 />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2"
                  onClick={() => logout()}
                  disabled={isPending}
                >
                  <LogOutIcon />
                  {isPending ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
