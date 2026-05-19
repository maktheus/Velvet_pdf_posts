'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PillBtn } from '../shared';
import type { Kit } from '@/lib/types';

const BG = ['#ed6058','#fcebf1','#fdfedf'];
const TXT = ['#fdfedf','#2a1612','#2a1612'];

export default function KitsSection({ kits }: { kits: Kit[] }) {
  return (
    <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl text-[#2a1612] mb-2">kits pensados pra cada fase</h2>
      <p className="text-[#2a1612]/60 mb-8 text-sm">Economize até 30% comprando em conjunto.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kits.map((kit, i) => (
          <motion.div key={kit.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-[32px] p-6 flex flex-col gap-4" style={{ background: BG[i % BG.length] }}>
            <div>
              <h3 className="font-['Bagel_Fat_One',cursive] text-xl mb-1" style={{ color: TXT[i % TXT.length] }}>{kit.name}</h3>
              <p className="text-sm opacity-70">{kit.desc}</p>
            </div>
            <ul className="space-y-1">
              {kit.items.map(item => (
                <li key={item} className="text-sm flex items-center gap-2 opacity-80">
                  <span style={{ color: i === 0 ? '#fdfedf' : '#ed6058' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-['Bagel_Fat_One',cursive] text-2xl" style={{ color: TXT[i % TXT.length] }}>R$ {kit.price.toFixed(2).replace('.', ',')}</span>
                <span className="text-sm opacity-50 line-through">R$ {kit.old.toFixed(2).replace('.', ',')}</span>
              </div>
              <Link href="/kits"><PillBtn variant={i === 0 ? 'ghost' : 'ink'} size="sm">Levar kit</PillBtn></Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
