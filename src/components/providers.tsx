"use client";

import { ThemeProvider } from "next-themes";
import { CustomToaster } from "@/components/ui/custom-toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="weather-app-theme"
    >
      {children}
      <CustomToaster />
    </ThemeProvider>
  );
}
