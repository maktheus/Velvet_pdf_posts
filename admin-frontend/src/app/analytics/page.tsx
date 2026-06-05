'use client';
import { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { api } from '@/lib/api';

interface DailyPoint { date: string; pageviews: number; orders: number; revenue: number; }

export default function Analytics() {
  const [period, setPeriod]   = useState(30);
  const [daily, setDaily]     = useState<DailyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const to   = new Date().toISOString().split('T')[0];
    const from = new Date(Date.now() - (period - 1) * 86400000).toISOString().split('T')[0];
    setLoading(true);
    api.get<DailyPoint[]>(`/api/admin/analytics/daily?from=${from}&to=${to}`)
      .then(setDaily).catch(() => setDaily([])).finally(() => setLoading(false));
  }, [period]);

  const totalRevenue  = daily.reduce((s, d) => s + Number(d.revenue), 0);
  const totalOrders   = daily.reduce((s, d) => s + Number(d.orders), 0);
  const totalVisitors = daily.reduce((s, d) => s + Number(d.pageviews), 0);
  const convRate      = totalVisitors > 0 ? ((totalOrders / totalVisitors) * 100).toFixed(1) : '0';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2D1A0E]">Analytics</h1>
        <div className="flex gap-2">
          {[7, 14, 30, 90].map(d => (
            <button key={d} onClick={() => setPeriod(d)}
              className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                period === d ? 'bg-[#2D1A0E] text-white border-[#2D1A0E]' : 'border-[#E8DCC8] text-[#5A3A22]'
              }`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          ['Receita total', `R$${totalRevenue.toFixed(2)}`, '#C4826A'],
          ['Pedidos', totalOrders, '#2D1A0E'],
          ['Visitantes', totalVisitors, '#8FAF8F'],
          ['Conversão', `${convRate}%`, '#5A3A22'],
        ].map(([l, v, c]) => (
          <div key={l as string} className="bg-white rounded-xl p-5 shadow-sm border border-[#E8DCC8]">
            <p className="text-xs text-[#5A3A22]/60 uppercase tracking-wide mb-1">{l as string}</p>
            <p className="text-2xl font-bold" style={{ color: c as string }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DCC8] mb-6">
        <h2 className="text-sm font-semibold text-[#2D1A0E] mb-4">Receita por dia</h2>
        {loading ? <div className="h-48 flex items-center justify-center text-[#5A3A22]/40">Carregando…</div> : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={daily} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C4826A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C4826A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0E8D8" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#2D1A0E', border: 'none', borderRadius: 8, color: '#F5EDD8', fontSize: 11 }} />
              <Area type="monotone" dataKey="revenue" stroke="#C4826A" strokeWidth={2} fill="url(#gr)" name="Receita (R$)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Visitors + orders */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DCC8]">
        <h2 className="text-sm font-semibold text-[#2D1A0E] mb-4">Visitantes vs Pedidos</h2>
        {loading ? <div className="h-48 flex items-center justify-center text-[#5A3A22]/40">Carregando…</div> : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={daily} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0E8D8" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#2D1A0E', border: 'none', borderRadius: 8, color: '#F5EDD8', fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="pageviews" fill="#E8DCC8" name="Visitantes" radius={[3,3,0,0]} />
              <Bar dataKey="orders"    fill="#C4826A" name="Pedidos"    radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
