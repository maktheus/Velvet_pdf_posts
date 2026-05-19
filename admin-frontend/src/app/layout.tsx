import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pata de Veludo — Admin',
  description: 'Painel administrativo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
