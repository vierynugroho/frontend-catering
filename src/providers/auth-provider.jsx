"use client";

import { Spinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function AuthProvider({ children }) {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return <>{children}</>;
}