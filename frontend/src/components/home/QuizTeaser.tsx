'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PillBtn } from '../shared';

export default function QuizTeaser() {
  return (
    <section className="px-4 md:px-8 py-12">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-[#ed6058] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="text-5xl mb-4">🐱</div>
          <h2 className="font-['Bagel_Fat_One',cursive] text-3xl md:text-4xl text-white mb-3">qual brinquedo é o seu gato?</h2>
          <p className="text-white/80 text-base max-w-md">3 perguntas rápidas. Descubra o brinquedo ideal para o estilo de vida e personalidade do seu felino.</p>
        </div>
        <div className="flex-shrink-0">
          <Link href="/quiz">
            <PillBtn variant="ghost" size="lg" className="border-white text-white hover:!bg-white hover:!text-[#ed6058]">
              Descobrir agora →
            </PillBtn>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
