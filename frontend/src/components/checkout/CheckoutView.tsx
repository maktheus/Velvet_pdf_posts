'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PillBtn } from '../shared';
import { useCart } from '@/context/CartContext';

type Step = 'address'|'payment'|'confirm'|'done';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function CheckoutView() {
  const { items, total } = useCart();
  const [step, setStep] = useState<Step>('address');
  const [dir, setDir] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [payMethod, setPayMethod] = useState<'gpay'|'pix'|'card'|'boleto'>('gpay');

  const frete = total >= 149 ? 0 : 18;
  const totalFinal = total + frete - discount;

  const go = (next: Step, direction = 1) => { setDir(direction); setStep(next); };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'VELUDO10') setDiscount(+(total * 0.1).toFixed(2));
  };

  const steps: Step[] = ['address','payment','confirm','done'];
  const stepIdx = steps.indexOf(step);

  const stepLabels = { address:'Endereço', payment:'Pagamento', confirm:'Revisão', done:'✓ Pedido' };

  return (
    <div className="px-4 md:px-8 py-10 max-w-5xl mx-auto">
      <h1 className="font-['Bagel_Fat_One',cursive] text-3xl text-[#2a1612] mb-8">Finalizar compra</h1>

      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <motion.div animate={{ backgroundColor: i <= stepIdx ? '#ed6058' : '#e5e7eb' }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {i < stepIdx ? '✓' : i + 1}
            </motion.div>
            <span className={`hidden sm:block ml-1.5 text-xs font-medium transition-colors ${i <= stepIdx ? 'text-[#2a1612]' : 'text-[#2a1612]/30'}`}>{stepLabels[s]}</span>
            {i < steps.length - 1 && (
              <motion.div className="flex-1 h-0.5 mx-2 rounded-full" animate={{ backgroundColor: i < stepIdx ? '#ed6058' : '#e5e7eb' }} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ type:'spring', stiffness:300, damping:30 }}>

              {step === 'address' && (
                <div className="space-y-4">
                  <h2 className="font-sans font-bold text-xl text-[#2a1612]">Endereço de entrega</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">Nome completo</label>
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="Maria Souza"/>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">CEP</label>
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="00000-000"/>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">Telefone</label>
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="(11) 99999-9999"/>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">Endereço</label>
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="Rua, número, complemento"/>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">Cidade</label>
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="São Paulo"/>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">Estado</label>
                      <select className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white">
                        {['SP','RJ','MG','PR','RS','SC','BA','GO','DF','CE','PE','AM','PA'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <PillBtn size="lg" onClick={() => go('payment')}>Continuar para pagamento →</PillBtn>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-4">
                  <h2 className="font-sans font-bold text-xl text-[#2a1612]">Forma de pagamento</h2>

                  {/* Google Pay button (mock) */}
                  <button
                    onClick={() => setPayMethod('gpay')}
                    className={`w-full flex items-center justify-center gap-3 p-4 rounded-[20px] border-2 transition font-semibold ${payMethod==='gpay' ? 'border-[#ed6058] bg-[#ed6058]/5' : 'border-[#2a1612]/20 hover:border-[#2a1612]/40'}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="white"/>
                      <text x="3" y="17" fontSize="11" fontWeight="bold" fill="#4285F4">G</text>
                      <text x="11" y="17" fontSize="11" fontWeight="bold" fill="#EA4335">P</text>
                      <text x="17" y="17" fontSize="11" fontWeight="bold" fill="#FBBC05">a</text>
                      <text x="21" y="17" fontSize="11" fontWeight="bold" fill="#34A853">y</text>
                    </svg>
                    <span>Google Pay</span>
                    {payMethod === 'gpay' && <span className="ml-auto text-xs bg-[#ed6058] text-white px-2 py-0.5 rounded-full">Recomendado</span>}
                  </button>

                  <div className="grid grid-cols-3 gap-3">
                    {([['pix','⚡','Pix','5% OFF'],['card','💳','Cartão',''],['boleto','📄','Boleto','']] as const).map(([m, icon, label, tag]) => (
                      <button key={m} onClick={() => setPayMethod(m as typeof payMethod)}
                        className={`p-4 rounded-[20px] border-2 text-center transition ${payMethod===m ? 'border-[#ed6058] bg-[#ed6058]/5' : 'border-[#2a1612]/20 hover:border-[#2a1612]/40'}`}>
                        <div className="text-2xl mb-1">{icon}</div>
                        <div className="text-sm font-medium">{label}</div>
                        {tag && <div className="text-xs text-green-600 font-semibold">{tag}</div>}
                      </button>
                    ))}
                  </div>

                  {payMethod === 'gpay' && (
                    <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} className="bg-[#fdfedf] rounded-[20px] p-4 text-sm text-[#2a1612]/70">
                      <p>🔒 Pagamento processado pelo Google Pay. Seus dados de cartão nunca passam pelo nosso servidor.</p>
                    </motion.div>
                  )}

                  {payMethod === 'pix' && (
                    <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} className="bg-[#fdfedf] rounded-[20px] p-4 text-sm text-[#2a1612]/70">
                      <p>⚡ O QR Code Pix será gerado na próxima etapa. Pagamento confirmado em segundos. <strong className="text-green-600">+5% de desconto aplicado!</strong></p>
                    </motion.div>
                  )}

                  {payMethod === 'card' && (
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-3">
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="Número do cartão"/>
                      <div className="grid grid-cols-2 gap-3">
                        <input className="px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="MM/AA"/>
                        <input className="px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="CVV"/>
                      </div>
                      <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" placeholder="Nome no cartão"/>
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {['1×','2×','3×','4×'].map((p, i) => (
                          <button key={p} className={`py-2 rounded-[12px] text-sm font-medium transition ${i===0 ? 'bg-[#ed6058] text-white' : 'bg-white border border-[#2a1612]/20 hover:border-[#ed6058]'}`}>{p}</button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <PillBtn variant="ghost" onClick={() => go('address', -1)}>← Voltar</PillBtn>
                    <PillBtn onClick={() => go('confirm')}>Revisar pedido →</PillBtn>
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-4">
                  <h2 className="font-sans font-bold text-xl text-[#2a1612]">Revisar pedido</h2>
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-white rounded-[20px]">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: product.colorways[0] }}>
                        {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover"/>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate text-[#2a1612]">{product.name}</p>
                        <p className="text-[#2a1612]/50 text-xs">Qtd: {qty}</p>
                      </div>
                      <p className="font-bold text-[#ed6058] text-sm">R$ {(product.price*qty).toFixed(2).replace('.',',')}</p>
                    </div>
                  ))}
                  <div className="flex gap-3">
                    <PillBtn variant="ghost" onClick={() => go('payment', -1)}>← Voltar</PillBtn>
                    <PillBtn size="lg" onClick={() => go('done')}>Confirmar e pagar</PillBtn>
                  </div>
                </div>
              )}

              {step === 'done' && (
                <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }} className="text-center py-10">
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:200, damping:12, delay:0.15 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </motion.div>
                  <h2 className="font-['Bagel_Fat_One',cursive] text-3xl text-[#2a1612] mb-3">Pedido confirmado! 🐾</h2>
                  <p className="text-[#2a1612]/60 mb-2">Você receberá um e-mail de confirmação em instantes.</p>
                  <p className="text-[#2a1612]/60 mb-8">Entrega em até 72h após a confirmação do pagamento.</p>
                  <a href="/"><PillBtn size="lg">Continuar comprando</PillBtn></a>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Order summary */}
        {step !== 'done' && (
          <div className="bg-white rounded-[32px] p-6 h-fit sticky top-24">
            <h3 className="font-sans font-bold text-lg text-[#2a1612] mb-4">Resumo</h3>
            <div className="space-y-2 text-sm mb-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between text-[#2a1612]/70">
                  <span className="truncate mr-2">{product.name} ×{qty}</span>
                  <span className="flex-shrink-0">R$ {(product.price*qty).toFixed(2).replace('.',',')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#2a1612]/10 pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#2a1612]/60">Subtotal</span><span>R$ {total.toFixed(2).replace('.',',')}</span></div>
              <div className="flex justify-between">
                <span className="text-[#2a1612]/60">Frete</span>
                {frete===0 ? <span className="text-green-600 font-semibold">Grátis</span> : <span>R$ {frete.toFixed(2).replace('.',',')}</span>}
              </div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Desconto (10%)</span><span>−R$ {discount.toFixed(2).replace('.',',')}</span></div>}
            </div>
            <div className="flex gap-2 my-4">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Cupom de desconto"
                className="flex-1 px-3 py-2 rounded-[12px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm"/>
              <button onClick={applyCoupon} className="px-4 py-2 bg-[#2a1612] text-white rounded-[12px] text-sm font-medium hover:bg-[#ed6058] transition">Aplicar</button>
            </div>
            <div className="border-t border-[#2a1612]/10 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-[#ed6058] text-lg">R$ {totalFinal.toFixed(2).replace('.',',')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
