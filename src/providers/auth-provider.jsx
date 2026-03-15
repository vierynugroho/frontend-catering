"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function AuthProvider({ children }) {
  const { isLoading, data } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10"></Spinner>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar currentUser={data} />
      <SidebarInset>
        <SiteHeader />

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
