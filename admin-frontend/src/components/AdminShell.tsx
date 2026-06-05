'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Palette, Package, ShoppingBag, BarChart2, LogOut } from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/aparencia', label: 'Aparência',  icon: Palette },
  { href: '/produtos',  label: 'Produtos',   icon: Package },
  { href: '/pedidos',   label: 'Pedidos',    icon: ShoppingBag },
  { href: '/analytics', label: 'Analytics',  icon: BarChart2 },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-[#2D1A0E] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-[#C4826A] font-bold text-base leading-tight">Pata de Veludo</p>
          <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#C4826A] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 w-full transition-colors">
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
