import "./globals.css";
import type { Metadata } from "next";
import { Quicksand, Righteous, Bungee } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap"
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap"
});

const bungee = Bungee({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap"
});

export const metadata: Metadata = {
  title: "GhostDNS - Your Subdomain Marketplace",
  description: "Find and register your perfect subdomain from domain owners or list your own domain for subdomain registration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${quicksand.variable} ${righteous.variable} ${bungee.variable}`}>
      <body className={quicksand.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}