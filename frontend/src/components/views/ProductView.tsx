'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PillBtn, Badge } from '../shared';
import ProductCard from '../ProductCard';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

export default function ProductView({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);
  const images = product.images?.length ? product.images : [null];
  const discount = product.old ? Math.round((1 - product.price / product.old) * 100) : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setToast(true); setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
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
                  className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${i===activeImg ? 'border-[#ed6058]' : 'border-transparent'}`}>
                  {img ? <img src={img} alt="" className="w-full h-full object-cover"/> : <div className="w-full h-full" style={{ background: product.colorways[0] }}/>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {product.tag && <Badge className="mb-3">{product.tag}</Badge>}
          <h1 className="font-['Bagel_Fat_One',cursive] text-3xl md:text-4xl text-[#2a1612] mb-2">{product.name}</h1>
          <p className="text-[#2a1612]/60 mb-6">{product.tagline}</p>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-['Bagel_Fat_One',cursive] text-3xl text-[#ed6058]">R$ {product.price.toFixed(2).replace('.',',')}</span>
            {product.old && <span className="text-[#2a1612]/40 line-through text-lg">R$ {product.old.toFixed(2).replace('.',',')}</span>}
            {discount && <span className="text-green-600 font-semibold text-sm">−{discount}%</span>}
          </div>
          <p className="text-sm text-[#2a1612]/70 mb-6 leading-relaxed">{product.story}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {product.specs.map(s => <span key={s} className="px-3 py-1.5 bg-[#fdfedf] rounded-full text-xs font-medium text-[#2a1612]">{s}</span>)}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="text-xl font-bold hover:text-[#ed6058] transition">−</button>
              <span className="font-semibold text-base w-6 text-center">{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="text-xl font-bold hover:text-[#ed6058] transition">+</button>
            </div>
            <PillBtn size="lg" onClick={handleAdd} className="flex-1">Adicionar ao carrinho</PillBtn>
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2a1612] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl z-50 flex items-center gap-2">
            <span className="text-[#ed6058]">✓</span> Adicionado ao carrinho!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
