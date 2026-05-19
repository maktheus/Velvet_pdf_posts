'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard';
import type { Product } from '@/lib/types';

function Countdown() {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pv-countdown font-mono text-lg font-bold text-[#ed6058]">
      {time.h}h {time.m}m {time.s}s
    </div>
  );
}

export default function FlashSale({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="bg-[#2a1612] text-[#fdfedf] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="text-2xl">⚡</motion.span>
          <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl">flash sale — só até meia-noite</h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-[#fdfedf]/60 text-sm">Preços que seu gato merece. E você também.</p>
          <Countdown />
        </div>
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
