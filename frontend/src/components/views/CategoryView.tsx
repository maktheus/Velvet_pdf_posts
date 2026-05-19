'use client';
import { useState } from 'react';
import ProductCard from '../ProductCard';
import type { Product, Category } from '@/lib/types';

type Sort = 'popular'|'price-asc'|'price-desc'|'discount';
const SORT_LABELS: Record<Sort,string> = { popular:'Popular', 'price-asc':'Menor preço', 'price-desc':'Maior preço', discount:'Desconto' };

export default function CategoryView({ category, products }: { category?: Category; products: Product[] }) {
  const [sort, setSort] = useState<Sort>('popular');
  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'discount') return ((b.old ? (b.old-b.price)/b.old : 0) - (a.old ? (a.old-a.price)/a.old : 0));
    return 0;
  });
  return (
    <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-['Bagel_Fat_One',cursive] text-4xl md:text-5xl text-[#2a1612] mb-2">{category?.label ?? 'Produtos'}</h1>
        {category?.desc && <p className="text-[#2a1612]/60">{category.desc}</p>}
      </div>
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth:'none' }}>
        {(['popular','price-asc','price-desc','discount'] as Sort[]).map(s => (
          <button key={s} onClick={() => setSort(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${sort===s ? 'bg-[#ed6058] text-white' : 'bg-white text-[#2a1612] hover:bg-[#2a1612]/10'}`}>
            {SORT_LABELS[s]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
