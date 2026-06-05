'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type OrderStatus = 'PENDING'|'PAYMENT_PENDING'|'PAID'|'PROCESSING'|'SHIPPED'|'DELIVERED'|'CANCELLED'|'REFUNDED';

interface Order {
  id: string; createdAt: string; status: OrderStatus; total: number;
  customer?: { firstName: string; lastName: string; email: string };
  trackingCode?: string;
}

interface Page<T> { content: T[]; totalElements: number; totalPages: number; number: number; }

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pendente', PAYMENT_PENDING: 'Aguard. pgto', PAID: 'Pago',
  PROCESSING: 'Em processamento', SHIPPED: 'Enviado', DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado', REFUNDED: 'Reembolsado',
};
const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700', PAYMENT_PENDING: 'bg-orange-100 text-orange-700',
  PAID: 'bg-blue-100 text-blue-700', PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED: 'bg-cyan-100 text-cyan-700', DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-500', REFUNDED: 'bg-gray-100 text-gray-500',
};

export default function Pedidos() {
  const [page, setPage]       = useState<Page<Order> | null>(null);
  const [filter, setFilter]   = useState('');
  const [pageN, setPageN]     = useState(0);
  const [loading, setLoading] = useState(true);

  const load = (p = 0, status = '') => {
    setLoading(true);
    const path = status
      ? `/api/admin/orders?status=${status}&page=${p}&size=20&sort=createdAt,desc`
      : `/api/admin/orders?page=${p}&size=20&sort=createdAt,desc`;
    api.get<Page<Order>>(path)
      .then(setPage).catch(() => setPage(null)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.patch(`/api/admin/orders/${id}/status`, { status });
    load(pageN, filter);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2D1A0E]">Pedidos</h1>
          <p className="text-sm text-[#5A3A22]/60 mt-0.5">{page?.totalElements ?? 0} pedidos</p>
        </div>
        <button className="px-4 py-2 border border-[#E8DCC8] rounded-full text-sm text-[#5A3A22] hover:border-[#C4826A] transition-colors">
          Exportar CSV
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {([['', 'Todos'], ...Object.entries(STATUS_LABELS)] as [string, string][]).map(([v, l]) => (
          <button key={v} onClick={() => { setFilter(v); load(0, v); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
              filter === v ? 'bg-[#2D1A0E] text-white border-[#2D1A0E]' : 'border-[#E8DCC8] text-[#5A3A22] hover:border-[#2D1A0E]'
            }`}>
            {l}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8DCC8]">
              {['ID', 'Cliente', 'Data', 'Total', 'Status', 'Ações'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#5A3A22]/60 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-[#5A3A22]/40">Carregando...</td></tr>
            ) : (page?.content ?? []).map(o => (
              <tr key={o.id} className="border-b border-[#f5f0e8] hover:bg-[#faf8f4] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-[#5A3A22]/60">{o.id.slice(0,8)}…</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#2D1A0E]">{o.customer?.firstName} {o.customer?.lastName}</p>
                  <p className="text-xs text-[#5A3A22]/50">{o.customer?.email}</p>
                </td>
                <td className="px-4 py-3 text-xs text-[#5A3A22]/60">
                  {new Date(o.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-3 font-semibold text-[#2D1A0E]">R${Number(o.total).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[o.status]}`}>
                    {STATUS_LABELS[o.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={e => updateStatus(o.id, e.target.value)}
                    className="text-xs border border-[#E8DCC8] rounded-lg px-2 py-1 text-[#2D1A0E] outline-none focus:border-[#C4826A]"
                  >
                    {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {page && page.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[#E8DCC8] flex items-center justify-between">
            <p className="text-xs text-[#5A3A22]/60">Página {page.number + 1} de {page.totalPages}</p>
            <div className="flex gap-2">
              <button disabled={page.number === 0} onClick={() => { setPageN(p => p-1); load(pageN-1, filter); }}
                className="px-3 py-1 text-xs border border-[#E8DCC8] rounded-lg disabled:opacity-40">←</button>
              <button disabled={page.number >= page.totalPages-1} onClick={() => { setPageN(p => p+1); load(pageN+1, filter); }}
                className="px-3 py-1 text-xs border border-[#E8DCC8] rounded-lg disabled:opacity-40">→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
