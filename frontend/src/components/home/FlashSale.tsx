'use client';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard';
import type { Product } from '@/lib/types';

export default function FlashSale({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="bg-[#2a1612] text-[#fdfedf] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="text-2xl">⚡</motion.span>
          <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl">flash sale — só até meia-noite</h2>
        </div>
        <p className="text-[#fdfedf]/60 mb-8 text-sm">Preços que seu gato merece. E você também.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p, i) => (
            <div key={p.id} className="bg-white/5 rounded-[32px] overflow-hidden">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
