'use client';
import { motion } from 'framer-motion';

const reasons = [
  { icon:'🔬', title:'Curadoria veterinária', desc:'Cada produto aprovado por veterinária comportamental felina.' },
  { icon:'📦', title:'Envio em 72h', desc:'Frete expresso pra todo Brasil. Rastreamento em tempo real.' },
  { icon:'🔄', title:'30 dias sem pergunta', desc:'Troca gratuita. Sem burocracia, sem julgamento.' },
  { icon:'💚', title:'Embalagem sustentável', desc:'Papelão reciclado, sem plástico bolha, sem culpa.' },
];

export default function WhyStrip() {
  return (
    <section className="bg-[#fdfedf] px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl text-[#2a1612] mb-8 text-center">por que a Pata de Veludo?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="text-4xl mb-3">{r.icon}</div>
              <h3 className="font-sans font-bold text-sm text-[#2a1612] mb-2">{r.title}</h3>
              <p className="text-xs text-[#2a1612]/60 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
