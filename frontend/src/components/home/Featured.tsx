'use client';
import ProductCard from '../ProductCard';
import type { Product } from '@/lib/types';

export default function Featured({ products }: { products: Product[] }) {
  return (
    <section className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl text-[#2a1612]">mais queridos 🐾</h2>
        <a href="/cat/brincar" className="text-[#ed6058] text-sm font-semibold hover:underline">ver todos →</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.slice(0, 6).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
