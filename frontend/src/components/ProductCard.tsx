'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge, PillBtn } from './shared';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const mainImg = product.images?.[0];
  const discount = product.old ? Math.round((1 - product.price / product.old) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }} transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={`/produto/${product.id}`} className="block relative aspect-[4/3] bg-[#fcebf1] overflow-hidden">
        {mainImg ? (
          <img src={mainImg} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: product.colorways[0] || '#fcebf1' }}>🐾</div>
        )}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <Badge color={product.tag.startsWith('-') ? '#2a1612' : '#ed6058'}>{product.tag}</Badge>
          </div>
        )}
      </Link>
      <div className="p-4">
        <div className="flex gap-1.5 mb-2">
          {product.colorways.slice(0, 3).map(c => (
            <div key={c} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
          ))}
        </div>
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-sans font-semibold text-sm text-[#2a1612] leading-tight mb-1 hover:text-[#ed6058] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-[#2a1612]/60 mb-3 line-clamp-2">{product.tagline}</p>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base text-[#ed6058]">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              {product.old && <span className="text-xs text-[#2a1612]/40 line-through">R$ {product.old.toFixed(2).replace('.', ',')}</span>}
            </div>
            {discount && <span className="text-xs font-semibold text-green-600">−{discount}%</span>}
          </div>
          <motion.button whileTap={{ scale: 0.88, rotate: 12 }} onClick={() => addItem(product)}
            className="w-10 h-10 rounded-full bg-[#ed6058] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#d94f47] transition-colors"
            aria-label={`Adicionar ${product.name}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
