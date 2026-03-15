import AuthProvider from "@/providers/auth-provider";

export default function AdminLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
