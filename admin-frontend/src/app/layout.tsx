import type { Metadata } from 'next';
import './globals.css';
import AdminShell from '@/components/AdminShell';

export const metadata: Metadata = {
  title: 'Admin — Pata de Veludo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#faf8f4]">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
