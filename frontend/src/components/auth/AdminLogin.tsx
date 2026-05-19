'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo, PillBtn } from '../shared';

type Phase = 'email'|'otp'|'success';

const ADMIN_DOMAINS = ['gmail.com'];

export default function AdminLogin() {
  const [phase, setPhase] = useState<Phase>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['','','','','','']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain || !ADMIN_DOMAINS.includes(domain)) {
      setError('Acesso restrito a contas Gmail (@gmail.com).');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setPhase('otp');
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) {
      document.getElementById(`otp-${i+1}`)?.focus();
    }
    if (next.every(d => d !== '') && i === 5) {
      verifyOtp(next.join(''));
    }
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      document.getElementById(`otp-${i-1}`)?.focus();
    }
  };

  const verifyOtp = async (code: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    // Demo: any 6-digit code works
    if (code.length === 6) { setPhase('success'); }
    else { setError('Código inválido. Tente novamente.'); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size={80} />
          <p className="text-[#2a1612]/60 text-sm mt-2">Painel Administrativo</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {phase === 'email' && (
              <motion.div key="email" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}>
                <h1 className="font-['Bagel_Fat_One',cursive] text-2xl text-[#2a1612] mb-2">Entrar como admin</h1>
                <p className="text-[#2a1612]/60 text-sm mb-6">Digite seu e-mail Gmail. Vamos enviar um código de 6 dígitos.</p>
                <form onSubmit={handleEmail} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">E-mail Gmail</label>
                    <div className="relative">
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                        placeholder="seu@gmail.com"
                        className="w-full px-4 py-3 pl-10 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white"/>
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a1612" strokeWidth="2" strokeLinecap="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
                      </svg>
                    </div>
                  </div>
                  {error && <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-red-500 text-xs">{error}</motion.p>}
                  <PillBtn type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar código OTP →'}
                  </PillBtn>
                </form>
                <p className="text-center text-xs text-[#2a1612]/40 mt-4">Acesso exclusivo para administradores com conta Gmail.</p>
              </motion.div>
            )}

            {phase === 'otp' && (
              <motion.div key="otp" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📨</div>
                  <h1 className="font-['Bagel_Fat_One',cursive] text-2xl text-[#2a1612] mb-1">Código enviado!</h1>
                  <p className="text-[#2a1612]/60 text-sm">Enviamos um código de 6 dígitos para<br/><strong className="text-[#2a1612]">{email}</strong></p>
                </div>
                <div className="flex gap-2 justify-center mb-6">
                  {otp.map((digit, i) => (
                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
                      value={digit} onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleOtpKeyDown(i, e)}
                      className={`w-11 h-14 text-center text-xl font-bold rounded-[12px] border-2 outline-none transition ${digit ? 'border-[#ed6058] bg-[#ed6058]/5' : 'border-[#2a1612]/20'} focus:border-[#ed6058]`}/>
                  ))}
                </div>
                {error && <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-red-500 text-xs text-center mb-4">{error}</motion.p>}
                {loading && <p className="text-center text-[#2a1612]/60 text-sm mb-4">Verificando...</p>}
                <div className="flex flex-col gap-3 text-center">
                  <PillBtn size="lg" onClick={() => verifyOtp(otp.join(''))} disabled={otp.some(d => !d) || loading} className="w-full">
                    Confirmar código
                  </PillBtn>
                  <button onClick={() => { setPhase('email'); setOtp(['','','','','','']); setError(''); }}
                    className="text-sm text-[#2a1612]/50 hover:text-[#ed6058] transition">
                    ← Usar outro e-mail
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'success' && (
              <motion.div key="success" initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} className="text-center py-6">
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:200, damping:12, delay:0.1 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </motion.div>
                <h2 className="font-['Bagel_Fat_One',cursive] text-2xl text-[#2a1612] mb-2">Bem-vindo de volta!</h2>
                <p className="text-[#2a1612]/60 text-sm mb-6">Autenticado com sucesso. Redirecionando para o painel...</p>
                <a href="/admin/dashboard"><PillBtn size="lg" className="w-full">Acessar o painel →</PillBtn></a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
