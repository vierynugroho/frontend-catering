import AuthProvider from "@/providers/auth-provider";

export default function DashboardLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
