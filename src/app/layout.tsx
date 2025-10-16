import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adquion - Gestión Fiscal Inteligente',
  description: 'Plataforma SaaS para contadores y contribuyentes. Gestión fiscal automatizada e inteligente.',
  keywords: ['fiscal', 'contadores', 'contribuyentes', 'saas', 'gestión'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}