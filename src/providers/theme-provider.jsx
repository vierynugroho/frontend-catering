"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export default function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      <Toaster richColors position="top-right" />
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
