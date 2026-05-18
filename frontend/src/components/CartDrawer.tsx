'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PillBtn } from './shared';

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeItem, updateQty, total } = useCart();
  const frete = total >= 149 ? 0 : 18;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#2a1612]" onClick={() => setCartOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[400px] bg-[#faf6ef] shadow-2xl flex flex-col"
            role="dialog" aria-label="Carrinho de compras"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a1612]/10">
              <h2 className="font-sans font-bold text-xl">Carrinho {items.length > 0 && <span className="text-[#ed6058]">({items.length})</span>}</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-[#2a1612]/10 transition" aria-label="Fechar carrinho">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16 text-[#2a1612]/50">
                  <div className="text-6xl mb-4">🐾</div>
                  <p className="font-semibold text-lg text-[#2a1612]">Carrinho vazio.</p>
                  <p className="text-sm mt-1">Seu gato merece um mimo!</p>
                  <button onClick={() => setCartOpen(false)} className="mt-4 text-[#ed6058] font-semibold underline text-sm">
                    Ver brinquedos
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(({ product, qty }) => (
                    <motion.div key={product.id} layout
                      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      className="flex gap-3 p-3 bg-white rounded-[20px]"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: product.colorways[0] || '#fcebf1' }}>
                        {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover"/>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight truncate text-[#2a1612]">{product.name}</p>
                        <p className="text-[#ed6058] font-bold text-sm mt-0.5">R$ {(product.price * qty).toFixed(2).replace('.', ',')}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(product.id, qty - 1)} className="w-6 h-6 rounded-full bg-[#2a1612]/10 flex items-center justify-center font-bold hover:bg-[#ed6058] hover:text-white transition text-sm">−</button>
                          <span className="text-sm font-semibold w-5 text-center">{qty}</span>
                          <button onClick={() => updateQty(product.id, qty + 1)} className="w-6 h-6 rounded-full bg-[#2a1612]/10 flex items-center justify-center font-bold hover:bg-[#ed6058] hover:text-white transition text-sm">+</button>
                          <button onClick={() => removeItem(product.id)} className="ml-auto text-[#2a1612]/30 hover:text-red-400 transition text-xs">remover</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            {items.length > 0 && (
              <motion.div layout className="px-6 py-5 border-t border-[#2a1612]/10 space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-[#2a1612]/60">Subtotal</span><span>R$ {total.toFixed(2).replace('.', ',')}</span></div>
                  <div className="flex justify-between">
                    <span className="text-[#2a1612]/60">Frete</span>
                    {frete === 0 ? <span className="text-green-600 font-semibold">Grátis 🎉</span> : <span>R$ {frete.toFixed(2).replace('.', ',')}</span>}
                  </div>
                  {frete > 0 && <p className="text-xs text-[#ed6058]">Falta R$ {(149 - total).toFixed(2).replace('.', ',')} para frete grátis</p>}
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-[#ed6058]">R$ {(total + frete).toFixed(2).replace('.', ',')}</span>
                </div>
                <Link href="/checkout" onClick={() => setCartOpen(false)} className="block">
                  <PillBtn size="lg" className="w-full">Finalizar compra →</PillBtn>
                </Link>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
