import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppQueryProvider from "@/providers/app-query-provider";
import ThemeProvider from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Catering Dhewi",
  description: "Website Katering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable}  antialiased`}>
        <AppQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AppQueryProvider>
      </body>
    </html>
  );
}
