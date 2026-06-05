'use client';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '@/lib/api';

interface TodayStats { pageviews: number; orders: number; revenue: number; }
interface DailyPoint { date: string; pageviews: number; orders: number; revenue: number; }
interface DashboardData {
  revenueToday: number; revenueThisMonth: number;
  ordersPending: number; ordersPaid: number; ordersShipped: number;
  totalCustomers: number; totalActiveProducts: number; lowStockProducts: number;
}

function StatCard({ label, value, sub, color = '#C4826A' }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DCC8]">
      <p className="text-xs font-medium text-[#5A3A22]/60 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold mt-1" style={{ color }}>{value}</p>
      {sub && <p className="text-xs text-[#5A3A22]/50 mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [today, setToday]       = useState<TodayStats | null>(null);
  const [daily, setDaily]       = useState<DailyPoint[]>([]);
  const [dash, setDash]         = useState<DashboardData | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const toDate = new Date().toISOString().split('T')[0];
    const fromDate = new Date(Date.now() - 13 * 86400000).toISOString().split('T')[0];

    Promise.all([
      api.get<TodayStats>('/api/admin/analytics/today').catch(() => null),
      api.get<DailyPoint[]>(`/api/admin/analytics/daily?from=${fromDate}&to=${toDate}`).catch(() => []),
      api.get<DashboardData>('/api/admin/dashboard').catch(() => null),
    ]).then(([t, d, db]) => {
      setToday(t);
      setDaily(d as DailyPoint[]);
      setDash(db);
      setLoading(false);
    });
  }, []);

  const fmt = (n?: number | null) =>
    n == null ? '—' : n >= 1000 ? `R$${(n / 1000).toFixed(1)}k` : `R$${n.toFixed(2)}`;

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-[#5A3A22]/40">Carregando...</div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2D1A0E]">Dashboard</h1>
        <p className="text-sm text-[#5A3A22]/60 mt-1">Visão geral em tempo real</p>
      </div>

      {/* Today stats */}
      <div className="mb-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-medium text-[#5A3A22]/60 uppercase tracking-wide">Hoje — ao vivo</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Visitantes" value={today?.pageviews ?? 0} sub="page views hoje" color="#2D1A0E" />
        <StatCard label="Pedidos hoje" value={today?.orders ?? 0} color="#C4826A" />
        <StatCard label="Receita hoje" value={fmt(today?.revenue)} color="#8FAF8F" />
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DCC8] mb-8">
        <h2 className="text-sm font-semibold text-[#2D1A0E] mb-4">Receita — últimos 14 dias</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={daily} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C4826A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C4826A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0E8D8" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5A3A22' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#5A3A22' }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: '#2D1A0E', border: 'none', borderRadius: 8, color: '#F5EDD8', fontSize: 12 }}
              formatter={(v: number) => [`R$${v.toFixed(2)}`, 'Receita']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#C4826A" strokeWidth={2} fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Store stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DCC8]">
          <h2 className="text-xs font-medium text-[#5A3A22]/60 uppercase tracking-wide mb-3">Pedidos</h2>
          <div className="space-y-2">
            {[
              ['Aguardando pagamento', dash?.ordersPending, '#F59E0B'],
              ['Pagos',               dash?.ordersPaid,    '#10B981'],
              ['Enviados',            dash?.ordersShipped,  '#3B82F6'],
            ].map(([l, v, c]) => (
              <div key={l as string} className="flex justify-between items-center">
                <span className="text-sm text-[#5A3A22]">{l as string}</span>
                <span className="text-sm font-bold" style={{ color: c as string }}>{v ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DCC8]">
          <h2 className="text-xs font-medium text-[#5A3A22]/60 uppercase tracking-wide mb-3">Loja</h2>
          <div className="space-y-2">
            {[
              ['Clientes', dash?.totalCustomers, '#2D1A0E'],
              ['Produtos ativos', dash?.totalActiveProducts, '#C4826A'],
              ['Estoque baixo', dash?.lowStockProducts, '#EF4444'],
            ].map(([l, v, c]) => (
              <div key={l as string} className="flex justify-between items-center">
                <span className="text-sm text-[#5A3A22]">{l as string}</span>
                <span className="text-sm font-bold" style={{ color: c as string }}>{v ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
