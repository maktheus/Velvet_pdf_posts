'use client';
import { motion } from 'framer-motion';

export function Logo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.45} viewBox="0 0 180 80" fill="none" aria-hidden="true">
      <text x="4" y="68" fontFamily="Bagel Fat One, cursive" fontSize="52" fill="#2a1612">pata</text>
      <text x="94" y="68" fontFamily="Bagel Fat One, cursive" fontSize="52" fill="#ed6058">de</text>
      <circle cx="162" cy="22" r="14" fill="#ed6058"/>
      <circle cx="152" cy="10" r="7" fill="#2a1612"/>
      <circle cx="166" cy="8" r="5" fill="#2a1612"/>
      <circle cx="172" cy="18" r="5" fill="#2a1612"/>
    </svg>
  );
}

export function PillBtn({
  children, variant = 'solid', size = 'md', onClick, className = '', disabled = false, type = 'button'
}: {
  children: React.ReactNode; variant?: 'solid'|'ghost'|'ink'; size?: 'sm'|'md'|'lg';
  onClick?: () => void; className?: string; disabled?: boolean; type?: 'button'|'submit';
}) {
  const sz = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };
  const v = {
    solid: 'bg-coral text-white hover:bg-[#d94f47]',
    ghost: 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
    ink: 'bg-ink text-white hover:bg-[#1a0e0c]',
  };
  return (
    <motion.button type={type} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}
      onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full transition-colors cursor-pointer ${sz[size]} ${v[variant]} ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >{children}</motion.button>
  );
}

export function Squircle({ color, className = '', children, style }: {
  color?: string; className?: string; children?: React.ReactNode; style?: React.CSSProperties;
}) {
  return <div className={`rounded-[32px] overflow-hidden ${className}`} style={{ background: color, ...style }}>{children}</div>;
}

export function PawGlyph({ size = 24, color = '#ed6058' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <ellipse cx="12" cy="17" rx="5" ry="4"/>
      <ellipse cx="7" cy="11" rx="2.5" ry="3"/>
      <ellipse cx="17" cy="11" rx="2.5" ry="3"/>
      <circle cx="10" cy="7" r="2"/>
      <circle cx="14" cy="7" r="2"/>
    </svg>
  );
}

export function Badge({ children, color = '#ed6058', className = '' }: { children: React.ReactNode; color?: string; className?: string }) {
  return <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full text-white ${className}`} style={{ background: color }}>{children}</span>;
}

export function Marquee({ items, speed = 30 }: { items: string[]; speed?: number }) {
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div className="inline-flex gap-8" animate={{ x: ['0%', '-50%'] }} transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
        {all.map((item, i) => <span key={i} className="text-sm font-medium"><span className="text-coral mr-2">✦</span>{item}</span>)}
      </motion.div>
    </div>
  );
}

export function StarRating({ rating }: { rating: number }) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} className={i <= rating ? 'text-[#f2c98a]' : 'text-gray-300'}>★</span>)}</div>;
}
