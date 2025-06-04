import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ClearThemeOnFirstLoad from '@/components/ClearThemeOnFirstLoad';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DomainHub - Custom Subdomains for Developers',
  description: 'Launch your next project with a premium subdomain. Instant setup, zero configuration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
         <ClearThemeOnFirstLoad />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}