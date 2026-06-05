'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

interface CartCtx {
  items: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addItem: (p: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  total: number;
}
const Ctx = createContext<CartCtx>(null!);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addItem = useCallback((p: Product) => {
    setItems(prev => {
      const ex = prev.find(i => i.product.id === p.id);
      if (ex) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
    setCartOpen(true);
    trackEvent('ADD_TO_CART', { productId: p.id });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  }, [removeItem]);

  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ items, cartCount, cartOpen, setCartOpen, addItem, removeItem, updateQty, total }}>
      {children}
    </Ctx.Provider>
  );
}
export const useCart = () => useContext(Ctx);
