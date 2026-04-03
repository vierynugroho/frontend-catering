"use client";
import AuthProvider from "@/providers/auth-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function DashboardLayout({ children }) {
  const { data: user } = useCurrentUser();

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-1 w-full max-w-[90rem] mx-auto px-10 py-6 flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
