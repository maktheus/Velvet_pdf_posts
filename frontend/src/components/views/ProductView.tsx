'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PillBtn, Badge } from '../shared';
import ProductCard from '../ProductCard';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

type Tab = 'historia' | 'ficha' | 'perguntas';

const FAQ = [
  { q: 'É seguro para gatos?', a: 'Sim, todos os materiais são testados e aprovados por veterinária comportamental felina.' },
  { q: 'Qual o prazo de entrega?', a: 'Entrega expressa em até 72h após confirmação do pagamento.' },
  { q: 'Posso trocar se meu gato não gostar?', a: '30 dias para troca sem perguntas.' },
];

export default function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    trackEvent('PRODUCT_VIEW', { productId: product.id });
  }, [product.id]);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('historia');
  const images = product.images?.length ? product.images : [null];
  const discount = product.old ? Math.round((1 - product.price / product.old) * 100) : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setToast(true); setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
      <nav className="pv-breadcrumb flex items-center gap-2 text-sm mb-6 text-[#2a1612]/60">
        <button onClick={() => router.push('/')} className="hover:text-[#ed6058] transition-colors">Início</button>
        <span>/</span>
        <button onClick={() => router.push(`/cat/${product.cat}`)} className="hover:text-[#ed6058] transition-colors capitalize">{product.cat}</button>
        <span>/</span>
        <span className="text-[#2a1612] truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-[32px] overflow-hidden bg-[#fcebf1] mb-3 relative">
            <AnimatePresence mode="wait">
              <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="w-full h-full">
                {images[activeImg] ? (
                  <img src={images[activeImg]!} alt={product.name} className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full" style={{ background: product.colorways[0] }}/>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`pv-pdp-thumb w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${i === activeImg ? 'border-[#ed6058] active' : 'border-transparent'}`}>
                  {img ? <img src={img} alt="" className="w-full h-full object-cover"/> : <div className="w-full h-full" style={{ background: product.colorways[0] }}/>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {product.tag && <Badge className="mb-3">{product.tag}</Badge>}
          <h1 className="font-['Bagel_Fat_One',cursive] text-3xl md:text-4xl text-[#2a1612] mb-2">{product.name}</h1>
          <p className="text-[#2a1612]/60 mb-4">{product.tagline}</p>
          <div className="pv-pdp-price flex items-baseline gap-3 mb-6">
            <strong className="font-['Bagel_Fat_One',cursive] text-3xl text-[#ed6058]">R$ {product.price.toFixed(2).replace('.', ',')}</strong>
            {product.old && <span className="text-[#2a1612]/40 line-through text-lg">R$ {product.old.toFixed(2).replace('.', ',')}</span>}
            {discount && <span className="text-green-600 font-semibold text-sm">−{discount}%</span>}
          </div>

          <div className="mb-6">
            <div className="pv-pdp-tabs flex gap-1 border-b border-[#2a1612]/10 mb-4">
              {(['historia', 'ficha', 'perguntas'] as Tab[]).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab ? 'text-[#ed6058] border-b-2 border-[#ed6058]' : 'text-[#2a1612]/50 hover:text-[#2a1612]'}`}>
                  {tab === 'historia' ? 'história' : tab === 'ficha' ? 'ficha técnica' : 'perguntas'}
                </button>
              ))}
            </div>
            <div className="pv-pdp-tabpane">
              {activeTab === 'historia' && (
                <p className="text-sm text-[#2a1612]/70 leading-relaxed">{product.story}</p>
              )}
              {activeTab === 'ficha' && (
                <ul className="space-y-2">
                  {product.specs.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[#2a1612]/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ed6058] flex-shrink-0"/>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'perguntas' && (
                <dl className="pv-faq space-y-4">
                  {FAQ.map(({ q, a }) => (
                    <div key={q}>
                      <dt className="font-semibold text-sm text-[#2a1612] mb-1">{q}</dt>
                      <dd className="text-sm text-[#2a1612]/60">{a}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.specs.map(s => <span key={s} className="px-3 py-1.5 bg-[#fdfedf] rounded-full text-xs font-medium text-[#2a1612]">{s}</span>)}
          </div>

          <div className="pv-pdp-ctas flex items-center gap-4 mb-4">
            <div className="pv-pdp-qty flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-xl font-bold hover:text-[#ed6058] transition">−</button>
              <span className="font-semibold text-base w-6 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="text-xl font-bold hover:text-[#ed6058] transition">+</button>
            </div>
            <PillBtn size="lg" onClick={handleAdd} className="flex-1 pv-pill">Adicionar ao carrinho</PillBtn>
          </div>
          <p className="text-xs text-[#2a1612]/50 text-center">🔒 Compra segura · Pix, Google Pay, cartão e boleto</p>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-['Bagel_Fat_One',cursive] text-2xl text-[#2a1612] mb-6">você também pode gostar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            className="pv-toast fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2a1612] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl z-50 flex items-center gap-2">
            <span className="text-[#ed6058]">✓</span> entrou no cesto
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
