'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PawGlyph, PillBtn, Squircle } from '../shared';

export default function Hero() {
  return (
    <section className="px-4 md:px-8 py-10 md:py-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}
          className="order-2 md:order-1">
          <div className="flex items-center gap-2 mb-5 text-sm text-[#2a1612]/60 font-medium">
            <PawGlyph size={18} color="#ed6058"/>
            <span>Coleção primavera · gatos primeiro</span>
          </div>
          <h1 className="font-['Bagel_Fat_One',cursive] text-5xl md:text-6xl lg:text-7xl text-[#2a1612] leading-[0.92] mb-6">
            brinquedos<br/>
            <span className="text-[#ed6058]">que entendem</span><br/>
            de gato.
          </h1>
          <p className="text-base md:text-lg text-[#2a1612]/60 max-w-md mb-8 leading-relaxed">
            Curadoria com veterinária comportamental. Testados na rotina real de gatos de apartamento.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/cat/brincar"><PillBtn size="lg">Ver brinquedos</PillBtn></Link>
            <Link href="/quiz"><PillBtn size="lg" variant="ghost">Descobrir qual brinquedo é o meu gato</PillBtn></Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {[{s:'10% OFF', l:'na 1ª compra'},{s:'72h', l:'frete expresso'},{s:'30 dias', l:'pra trocar'}].map(t => (
              <div key={t.s} className="flex flex-col">
                <strong className="text-base text-[#ed6058] font-['Bagel_Fat_One',cursive]">{t.s}</strong>
                <span className="text-[#2a1612]/50">{t.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, ease: 'easeOut', delay: 0.12 }}
          className="order-1 md:order-2 grid grid-cols-2 gap-3">
          <Squircle color="#ed6058" className="col-span-2 aspect-[16/9] relative">
            <img src="/uploads/gato-laranja.webp" alt="Gato brincando" className="w-full h-full object-cover"/>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-[20px] px-3 py-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#ed6058] flex-shrink-0">
                <img src="/uploads/sprinx-dois.png" alt="Mafalda" className="w-full h-full object-cover"/>
              </div>
              <div>
                <strong className="text-[#2a1612] block text-xs">Mafalda, 4 anos</strong>
                <span className="text-[#2a1612]/50 text-xs">caçadora oficial</span>
              </div>
            </div>
          </Squircle>
          <Squircle color="#fcebf1" className="aspect-square">
            <img src="/uploads/sprinx-um.png" alt="Gato siamês" className="w-full h-full object-cover"/>
          </Squircle>
          <Squircle color="#fdfedf" className="aspect-square flex items-center justify-center">
            <div className="text-center">
              <span className="font-['Bagel_Fat_One',cursive] text-5xl text-[#2a1612] block">09</span>
              <em className="text-xs text-[#2a1612]/60 not-italic">brinquedos<br/>escolhidos a dedo</em>
            </div>
          </Squircle>
        </motion.div>
      </div>
    </section>
  );
}
