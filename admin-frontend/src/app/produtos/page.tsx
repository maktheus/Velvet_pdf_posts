'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Plus, Search, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Product {
  id: string; name: string; tagline?: string; price: number; originalPrice?: number;
  stockQty: number; active: boolean; tag?: string; sku?: string;
}

interface Page<T> { content: T[]; totalElements: number; totalPages: number; number: number; }

export default function Produtos() {
  const [page, setPage]     = useState<Page<Product> | null>(null);
  const [search, setSearch] = useState('');
  const [pageN, setPageN]   = useState(0);
  const [loading, setLoading] = useState(true);

  const load = (p = 0, q = '') => {
    setLoading(true);
    const path = q
      ? `/api/admin/products?search=${encodeURIComponent(q)}&page=${p}&size=20`
      : `/api/admin/products?page=${p}&size=20`;
    api.get<Page<Product>>(path)
      .then(setPage)
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(0, search); }, []);

  const toggle = async (id: string, active: boolean) => {
    await api.patch(`/api/admin/products/${id}`, { active: !active });
    load(pageN, search);
  };

  const del = async (id: string) => {
    if (!confirm('Desativar produto?')) return;
    await api.delete(`/api/admin/products/${id}`);
    load(pageN, search);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2D1A0E]">Produtos</h1>
          <p className="text-sm text-[#5A3A22]/60 mt-0.5">{page?.totalElements ?? 0} produtos</p>
        </div>
        <button className="flex items-center gap-2 bg-[#C4826A] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#b36d56] transition-colors">
          <Plus size={16} /> Novo produto
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A3A22]/40" />
        <input
          placeholder="Buscar produto..."
          value={search}
          onChange={e => { setSearch(e.target.value); load(0, e.target.value); }}
          className="w-full pl-10 pr-4 py-2.5 border border-[#E8DCC8] rounded-xl text-sm text-[#2D1A0E] outline-none focus:border-[#C4826A] bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8DCC8]">
              {['Produto', 'SKU', 'Preço', 'Estoque', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#5A3A22]/60 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-[#5A3A22]/40">Carregando...</td></tr>
            ) : (page?.content ?? []).map(p => (
              <tr key={p.id} className="border-b border-[#f5f0e8] hover:bg-[#faf8f4] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-[#2D1A0E]">{p.name}</p>
                  {p.tagline && <p className="text-xs text-[#5A3A22]/50">{p.tagline}</p>}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#5A3A22]/60">{p.sku ?? '—'}</td>
                <td className="px-4 py-3 font-semibold text-[#2D1A0E]">
                  R${Number(p.price).toFixed(2)}
                  {p.originalPrice && (
                    <span className="ml-2 text-xs line-through text-[#5A3A22]/40">R${Number(p.originalPrice).toFixed(2)}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`font-semibold ${p.stockQty < 5 ? 'text-red-500' : 'text-[#2D1A0E]'}`}>{p.stockQty}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(p.id, p.active)} className="text-[#5A3A22]/40 hover:text-[#C4826A] transition-colors">
                      {p.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    </button>
                    <button className="text-[#5A3A22]/40 hover:text-[#C4826A] transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => del(p.id)} className="text-[#5A3A22]/40 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {page && page.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[#E8DCC8] flex items-center justify-between">
            <p className="text-xs text-[#5A3A22]/60">Página {page.number + 1} de {page.totalPages}</p>
            <div className="flex gap-2">
              <button disabled={page.number === 0} onClick={() => { setPageN(p => p-1); load(pageN-1, search); }}
                className="px-3 py-1 text-xs border border-[#E8DCC8] rounded-lg disabled:opacity-40 hover:border-[#C4826A] transition-colors">←</button>
              <button disabled={page.number >= page.totalPages-1} onClick={() => { setPageN(p => p+1); load(pageN+1, search); }}
                className="px-3 py-1 text-xs border border-[#E8DCC8] rounded-lg disabled:opacity-40 hover:border-[#C4826A] transition-colors">→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
