'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Category } from '@/lib/types';

const EMOJIS: Record<string,string> = { brincar:'🎾', descansar:'😴', hidratar:'💧', passear:'🎒', cuidar:'🪮' };

export default function MomentStrip({ categories }: { categories: Category[] }) {
  return (
    <section className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
      <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl text-[#2a1612] mb-6">o momento do seu gato</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {categories.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Link href={`/cat/${cat.id}`}
              className="flex-shrink-0 snap-start flex flex-col items-center justify-center gap-2 w-24 h-24 md:w-28 md:h-28 bg-white rounded-[32px] hover:bg-[#ed6058] hover:text-white transition-colors group shadow-sm">
              <span className="text-3xl">{EMOJIS[cat.id] || '🐾'}</span>
              <span className="text-xs font-semibold text-[#2a1612] group-hover:text-white">{cat.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
