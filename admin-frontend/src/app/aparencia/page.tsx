'use client';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';

interface Theme {
  colorBackground: string; colorPrimary: string; colorDark: string;
  colorMedium: string; colorAccent: string;
  fontHeading: string; fontBody: string;
  storeName: string; storeHandle: string; storeTagline: string;
  logoUrl: string; heroStyle: string;
}

const HEADING_FONTS = ['Georgia', 'Playfair Display', 'Lora', 'Merriweather', 'Inter'];
const BODY_FONTS    = ['Inter', 'DM Sans', 'Nunito', 'Poppins', 'Open Sans'];

function ColorField({ label, value, onChange }: { label: string; value: string; onChange(v: string): void }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-9 h-9 rounded-lg cursor-pointer border border-[#E8DCC8] p-0.5"
      />
      <div className="flex-1">
        <p className="text-xs text-[#5A3A22]/60">{label}</p>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="text-sm font-mono text-[#2D1A0E] bg-transparent border-none outline-none w-full"
        />
      </div>
    </div>
  );
}

export default function Aparencia() {
  const [theme, setTheme]     = useState<Theme | null>(null);
  const [saved, setSaved]     = useState(false);
  const [saving, setSaving]   = useState(false);
  const iframeRef             = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    api.get<Theme>('/api/store/theme').then(setTheme).catch(() => {
      // Fallback defaults if API is unavailable
      setTheme({
        colorBackground: '#F5EDD8',
        colorPrimary: '#C4826A',
        colorDark: '#2D1A0E',
        colorMedium: '#5A3A22',
        colorAccent: '#8FAF8F',
        fontHeading: 'Georgia',
        fontBody: 'Inter',
        storeName: 'Pata de Veludo',
        storeHandle: '@patadeveludo',
        storeTagline: 'Produtos artesanais para pets',
        logoUrl: '',
        heroStyle: 'gradient',
      });
    });
  }, []);

  // Push CSS vars into preview iframe on every theme change
  useEffect(() => {
    if (!theme || !iframeRef.current?.contentDocument) return;
    const root = iframeRef.current.contentDocument.documentElement;
    root.style.setProperty('--color-background', theme.colorBackground);
    root.style.setProperty('--color-primary',    theme.colorPrimary);
    root.style.setProperty('--color-dark',       theme.colorDark);
    root.style.setProperty('--color-medium',     theme.colorMedium);
    root.style.setProperty('--color-accent',     theme.colorAccent);
  }, [theme]);

  const set = (k: keyof Theme, v: string) => setTheme(prev => prev ? { ...prev, [k]: v } : prev);

  const save = async () => {
    if (!theme) return;
    setSaving(true);
    try {
      await api.put('/api/admin/theme', theme);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (!theme) return <div className="flex items-center justify-center h-64 text-[#5A3A22]/40">Carregando tema...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left panel */}
      <div className="w-80 flex-shrink-0 overflow-y-auto bg-white border-r border-[#E8DCC8]">
        <div className="px-6 py-5 border-b border-[#E8DCC8] flex items-center justify-between">
          <h1 className="text-base font-bold text-[#2D1A0E]">Aparência</h1>
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#C4826A] text-white disabled:opacity-50 hover:bg-[#b36d56] transition-colors"
          >
            {saving ? 'Salvando…' : saved ? '✓ Salvo' : 'Publicar'}
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Identity */}
          <section>
            <h2 className="text-xs font-semibold text-[#5A3A22]/50 uppercase tracking-wider mb-3">Identidade</h2>
            <div className="space-y-3">
              {[
                ['storeName',    'Nome da loja'],
                ['storeHandle',  'Handle (@)'],
                ['storeTagline', 'Tagline'],
                ['logoUrl',      'URL do logo'],
              ].map(([k, label]) => (
                <div key={k}>
                  <label className="text-xs text-[#5A3A22]/60 block mb-1">{label}</label>
                  <input
                    value={(theme as unknown as Record<string, string>)[k] ?? ''}
                    onChange={e => set(k as keyof Theme, e.target.value)}
                    className="w-full text-sm border border-[#E8DCC8] rounded-lg px-3 py-2 text-[#2D1A0E] outline-none focus:border-[#C4826A]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Colors */}
          <section>
            <h2 className="text-xs font-semibold text-[#5A3A22]/50 uppercase tracking-wider mb-3">Cores</h2>
            <div className="space-y-3">
              <ColorField label="Fundo"    value={theme.colorBackground} onChange={v => set('colorBackground', v)} />
              <ColorField label="Primária" value={theme.colorPrimary}    onChange={v => set('colorPrimary',    v)} />
              <ColorField label="Escura"   value={theme.colorDark}       onChange={v => set('colorDark',       v)} />
              <ColorField label="Média"    value={theme.colorMedium}     onChange={v => set('colorMedium',     v)} />
              <ColorField label="Destaque" value={theme.colorAccent}     onChange={v => set('colorAccent',     v)} />
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-xs font-semibold text-[#5A3A22]/50 uppercase tracking-wider mb-3">Tipografia</h2>
            <div className="space-y-3">
              {[
                ['fontHeading', 'Títulos', HEADING_FONTS],
                ['fontBody',    'Corpo',   BODY_FONTS],
              ].map(([k, label, opts]) => (
                <div key={k as string}>
                  <label className="text-xs text-[#5A3A22]/60 block mb-1">{label as string}</label>
                  <select
                    value={(theme as unknown as Record<string, string>)[k as string]}
                    onChange={e => set(k as keyof Theme, e.target.value)}
                    className="w-full text-sm border border-[#E8DCC8] rounded-lg px-3 py-2 text-[#2D1A0E] outline-none focus:border-[#C4826A]"
                  >
                    {(opts as string[]).map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </section>

          {/* Hero style */}
          <section>
            <h2 className="text-xs font-semibold text-[#5A3A22]/50 uppercase tracking-wider mb-3">Hero</h2>
            <div className="flex gap-2">
              {['gradient', 'image', 'solid'].map(s => (
                <button
                  key={s}
                  onClick={() => set('heroStyle', s)}
                  className={`flex-1 py-2 text-xs rounded-lg border font-medium transition-colors ${
                    theme.heroStyle === s
                      ? 'bg-[#C4826A] text-white border-[#C4826A]'
                      : 'border-[#E8DCC8] text-[#5A3A22] hover:border-[#C4826A]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 bg-[#f0ebe0] flex flex-col">
        <div className="px-6 py-3 bg-white border-b border-[#E8DCC8] flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-[#5A3A22]/40 bg-[#f4f0e8] px-4 py-1 rounded-full">localhost:3000</span>
          </div>
        </div>
        <div className="flex-1 p-4">
          <iframe
            ref={iframeRef}
            src="http://localhost:3000"
            className="w-full h-full rounded-xl shadow-lg border border-[#E8DCC8]"
            title="Store preview"
            onLoad={() => {
              if (!iframeRef.current?.contentDocument || !theme) return;
              const root = iframeRef.current.contentDocument.documentElement;
              Object.entries({
                '--color-background': theme.colorBackground,
                '--color-primary':    theme.colorPrimary,
                '--color-dark':       theme.colorDark,
              }).forEach(([k, v]) => root.style.setProperty(k, v));
            }}
          />
        </div>
      </div>
    </div>
  );
}
