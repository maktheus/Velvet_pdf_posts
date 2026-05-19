'use client';
import { motion } from 'framer-motion';
import { StarRating } from '../shared';
import type { Review } from '@/lib/types';

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl text-[#2a1612] mb-8">o que os donos dizem 🐾</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] p-6 shadow-sm">
            <StarRating rating={r.rating} />
            <p className="text-[#2a1612]/80 text-sm leading-relaxed mt-3 mb-4 italic">&ldquo;{r.text}&rdquo;</p>
            <div>
              <p className="font-semibold text-sm text-[#2a1612]">{r.who}</p>
              <p className="text-xs text-[#2a1612]/50">{r.city}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
