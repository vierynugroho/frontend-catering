"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";

export function DashboardWrapper({ children }) {
  const { data: user } = useCurrentUser();

  return (
    <SidebarProvider>
      <AppSidebar currentUser={user} />
      
      <SidebarInset>
        <SiteHeader />
        <main className="p-6 h-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}