import AuthProvider from "@/providers/auth-provider";
import { DashboardWrapper } from "@/providers/dashboard-provider";

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </AuthProvider>
  );
}
