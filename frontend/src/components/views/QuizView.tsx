'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PillBtn } from '../shared';
import { PV_DATA } from '@/lib/data';

const QUESTIONS = [
  { q: 'O seu gato é mais...', opts: [
    { label:'Caçador ativo 🏃', value:'brincar' },
    { label:'Dorminhoco zen 😴', value:'descansar' },
    { label:'Explorador curioso 🔍', value:'passear' },
    { label:'Rei da higiene 👑', value:'cuidar' },
  ]},
  { q: 'Que horas ele fica mais animado?', opts: [
    { label:'De manhã cedo 🌅', value:'brincar' },
    { label:'À tarde morna ☀️', value:'hidratar' },
    { label:'Depois do jantar 🌙', value:'brincar' },
    { label:'Às 3 da manhã 👻', value:'brincar' },
  ]},
  { q: 'Qual o maior desafio?', opts: [
    { label:'Fica entediado 😒', value:'brincar' },
    { label:'Come muito rápido 😅', value:'brincar' },
    { label:'Não bebe água suficiente 💧', value:'hidratar' },
    { label:'Arranha tudo 😱', value:'cuidar' },
  ]},
];

export default function QuizView() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const answer = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) { setStep(step + 1); } else { setDone(true); }
  };

  const topCat = done
    ? Object.entries(answers.reduce((acc, a) => ({ ...acc, [a]: (acc[a]||0)+1 }), {} as Record<string,number>))
        .sort((a,b) => b[1]-a[1])[0][0]
    : '';
  const recommended = PV_DATA.products.filter(p => p.cat === topCat).slice(0, 3);

  return (
    <div className="min-h-[70vh] px-4 md:px-8 py-16 max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration:0.3 }}>
            <div className="text-center mb-10">
              <div className="text-5xl mb-3">🐱</div>
              <div className="flex justify-center gap-2 mb-4">
                {QUESTIONS.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i<=step ? 'w-8 bg-[#ed6058]' : 'w-4 bg-[#2a1612]/20'}`}/>)}
              </div>
              <h1 className="font-['Bagel_Fat_One',cursive] text-3xl md:text-4xl text-[#2a1612]">{QUESTIONS[step].q}</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUESTIONS[step].opts.map(opt => (
                <motion.button key={opt.label} whileTap={{ scale:0.97 }} onClick={() => answer(opt.value)}
                  className="p-5 bg-white rounded-[32px] text-left hover:bg-[#ed6058] hover:text-white transition-colors shadow-sm font-medium text-base">
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="font-['Bagel_Fat_One',cursive] text-4xl text-[#2a1612] mb-3">resultado!</h1>
            <p className="text-[#2a1612]/60 mb-8">O seu gato vai adorar os produtos de <strong className="text-[#ed6058]">{topCat}</strong>:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {recommended.map(p => (
                <a key={p.id} href={`/produto/${p.id}`} className="bg-white rounded-[20px] p-4 text-left hover:shadow-md transition-shadow">
                  <div className="aspect-square rounded-xl mb-3 overflow-hidden" style={{ background: p.colorways[0] }}>
                    {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover"/>}
                  </div>
                  <p className="font-semibold text-sm text-[#2a1612]">{p.name}</p>
                  <p className="text-[#ed6058] font-bold text-sm">R$ {p.price.toFixed(2).replace('.',',')}</p>
                </a>
              ))}
            </div>
            <PillBtn onClick={() => { setStep(0); setAnswers([]); setDone(false); }}>Refazer o quiz</PillBtn>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
