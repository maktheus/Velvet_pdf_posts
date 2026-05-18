// Pata de Veludo — componentes compartilhados
const { useState, useEffect, useRef, useMemo } = React;

// ───────── SVG / desenhos placeholder ─────────
const BlobShape = ({ variant = 0, fill = "#ed6058", style }) => {
  const paths = [
    "M50 10 C 78 6 96 26 96 50 C 96 76 76 96 50 96 C 24 96 4 78 4 50 C 4 24 22 14 50 10 Z",
    "M50 6 C 82 6 96 28 94 54 C 92 80 70 96 46 94 C 22 92 6 72 8 46 C 10 22 28 6 50 6 Z",
    "M50 8 C 76 4 98 22 96 50 C 94 78 74 98 48 96 C 22 94 4 76 6 48 C 8 24 26 12 50 8 Z"
  ];
  return (
    <svg viewBox="0 0 100 100" style={style} preserveAspectRatio="none">
      <path d={paths[variant % paths.length]} fill={fill} />
    </svg>
  );
};

// Cat face icon — bubbly, original
const CatGlyph = ({ size = 56, color = "#ed6058", mood = "happy", style }) => {
  const moods = {
    happy: { eyes: <><circle cx="36" cy="50" r="3"/><circle cx="64" cy="50" r="3"/></>, mouth: <path d="M44 60 Q 50 66 56 60" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/> },
    sleepy: { eyes: <><path d="M30 50 Q 36 47 42 50" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M58 50 Q 64 47 70 50" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/></>, mouth: <path d="M44 60 Q 50 64 56 60" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/> },
    surprise: { eyes: <><circle cx="36" cy="50" r="4"/><circle cx="64" cy="50" r="4"/></>, mouth: <ellipse cx="50" cy="63" rx="3" ry="4" fill={color}/> }
  };
  const m = moods[mood] || moods.happy;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <path d="M22 32 L 28 18 L 40 30 M78 32 L 72 18 L 60 30" fill="none" stroke={color} strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M50 24 C 78 24 88 44 86 60 C 84 78 70 88 50 88 C 30 88 16 78 14 60 C 12 44 22 24 50 24 Z" fill="none" stroke={color} strokeWidth="3.5"/>
      <g fill={color}>{m.eyes}</g>
      {m.mouth}
      <path d="M30 56 L 22 58 M30 60 L 22 64 M70 56 L 78 58 M70 60 L 78 64" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

const PawGlyph = ({ size = 36, color = "#ed6058", style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <ellipse cx="50" cy="68" rx="22" ry="20" fill={color}/>
    <ellipse cx="28" cy="42" rx="9" ry="12" fill={color}/>
    <ellipse cx="44" cy="30" rx="9" ry="13" fill={color}/>
    <ellipse cx="62" cy="30" rx="9" ry="13" fill={color}/>
    <ellipse cx="78" cy="42" rx="9" ry="12" fill={color}/>
  </svg>
);

// Category icons (bubbly, original)
const CategoryIcon = ({ kind, size = 64, color = "#ed6058" }) => {
  const props = { width: size, height: size, viewBox: "0 0 100 100" };
  switch (kind) {
    case "play":
      return (
        <svg {...props}>
          <path d="M30 50 Q 30 22 50 22 Q 70 22 70 50 Q 70 78 50 78 Q 30 78 30 50 Z" fill={color}/>
          <path d="M50 22 L 58 8 M50 22 L 42 8" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
          <circle cx="42" cy="46" r="2.5" fill="#fdfedf"/>
          <circle cx="58" cy="46" r="2.5" fill="#fdfedf"/>
        </svg>
      );
    case "sleep":
      return (
        <svg {...props}>
          <path d="M14 60 Q 14 38 50 38 Q 86 38 86 60 L 86 78 L 14 78 Z" fill={color}/>
          <path d="M30 38 Q 30 26 38 26" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="32" cy="38" r="6" fill={color}/>
          <text x="60" y="32" fill={color} fontFamily="Bagel Fat One" fontSize="14">z</text>
          <text x="70" y="22" fill={color} fontFamily="Bagel Fat One" fontSize="10">z</text>
        </svg>
      );
    case "water":
      return (
        <svg {...props}>
          <path d="M50 14 C 70 36 78 50 78 64 C 78 80 64 88 50 88 C 36 88 22 80 22 64 C 22 50 30 36 50 14 Z" fill={color}/>
          <ellipse cx="42" cy="50" rx="6" ry="10" fill="#fdfedf" opacity="0.6"/>
        </svg>
      );
    case "travel":
      return (
        <svg {...props}>
          <rect x="18" y="34" width="64" height="48" rx="20" fill={color}/>
          <circle cx="50" cy="56" r="16" fill="#fdfedf"/>
          <circle cx="44" cy="54" r="2" fill={color}/>
          <circle cx="56" cy="54" r="2" fill={color}/>
          <path d="M36 34 Q 38 22 50 22 Q 62 22 64 34" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round"/>
        </svg>
      );
    case "groom":
      return (
        <svg {...props}>
          <rect x="38" y="20" width="24" height="40" rx="12" fill={color}/>
          <rect x="30" y="58" width="40" height="26" rx="10" fill={color}/>
          <line x1="36" y1="68" x2="36" y2="80" stroke="#fdfedf" strokeWidth="2"/>
          <line x1="44" y1="68" x2="44" y2="80" stroke="#fdfedf" strokeWidth="2"/>
          <line x1="52" y1="68" x2="52" y2="80" stroke="#fdfedf" strokeWidth="2"/>
          <line x1="60" y1="68" x2="60" y2="80" stroke="#fdfedf" strokeWidth="2"/>
        </svg>
      );
    default:
      return <PawGlyph size={size} color={color} />;
  }
};

// Paw pattern background tile
const PawPattern = ({ color = "#ed6058", opacity = 0.18, style }) => (
  <svg style={style} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="paws" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <g opacity={opacity} fill={color} transform="translate(10 10) scale(0.5)">
          <ellipse cx="50" cy="68" rx="22" ry="20"/>
          <ellipse cx="28" cy="42" rx="9" ry="12"/>
          <ellipse cx="44" cy="30" rx="9" ry="13"/>
          <ellipse cx="62" cy="30" rx="9" ry="13"/>
          <ellipse cx="78" cy="42" rx="9" ry="12"/>
        </g>
        <g opacity={opacity} fill={color} transform="translate(50 50) rotate(20) scale(0.4)">
          <ellipse cx="50" cy="68" rx="22" ry="20"/>
          <ellipse cx="28" cy="42" rx="9" ry="12"/>
          <ellipse cx="44" cy="30" rx="9" ry="13"/>
          <ellipse cx="62" cy="30" rx="9" ry="13"/>
          <ellipse cx="78" cy="42" rx="9" ry="12"/>
        </g>
      </pattern>
    </defs>
    <rect width="200" height="200" fill="url(#paws)"/>
  </svg>
);

// Product placeholder — striped squircle with monospaced label
const ProductPlaceholder = ({ label = "foto do produto", color = "#ed6058", bg = "#fcebf1", style }) => (
  <div className="pv-placeholder" style={{ background: bg, ...style }}>
    <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="pv-placeholder-stripes">
      <defs>
        <pattern id={`stripes-${label.replace(/\s/g, "")}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="12" stroke={color} strokeWidth="2" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#stripes-${label.replace(/\s/g, "")})`}/>
    </svg>
    <div className="pv-placeholder-label">[{label}]</div>
  </div>
);

// ───────── Logo ─────────
const Logo = ({ size = 64, onClick, onDark = false }) => {
  return (
    <button className={`pv-logo ${onDark ? "pv-logo-dark" : ""}`} onClick={onClick} aria-label="Pata de Veludo — Início">
      <img src="assets/logo.png" alt="Pata de Veludo" style={{ height: size, width: "auto", display: "block" }}/>
    </button>
  );
};

// ───────── Pill button ─────────
const PillBtn = ({ children, variant = "primary", onClick, size = "md", icon, ...rest }) => (
  <button className={`pv-pill pv-pill-${variant} pv-pill-${size}`} onClick={onClick} {...rest}>
    <span>{children}</span>
    {icon && <span className="pv-pill-icon">{icon}</span>}
  </button>
);

// ───────── Squircle card wrapper ─────────
const Squircle = ({ children, color = "#fcebf1", className = "", style, onClick }) => (
  <div className={`pv-squircle ${className}`} style={{ background: color, ...style }} onClick={onClick}>
    {children}
  </div>
);

// ───────── Toast ─────────
const PaymentIcons = () => (
  <div className="pv-pay-icons">
    <div className="pv-pay" title="Visa">
      <svg viewBox="0 0 48 32" width="42" height="28">
        <rect width="48" height="32" rx="5" fill="#fff"/>
        <path d="M19.4 21.4 21 10.7h2.6L22 21.4h-2.6Zm12.4-10.5c-.5-.2-1.3-.4-2.4-.4-2.6 0-4.4 1.3-4.4 3.3 0 1.4 1.3 2.2 2.4 2.7 1 .5 1.4.8 1.4 1.2 0 .7-.8 1-1.6 1-1.1 0-1.7-.2-2.6-.6l-.4-.2-.4 2.4c.7.3 1.9.6 3.2.6 2.7 0 4.5-1.3 4.6-3.4 0-1.2-.7-2-2.3-2.7-1-.4-1.5-.7-1.5-1.2 0-.4.4-.8 1.4-.8.8 0 1.4.1 1.9.3l.2.1.5-2.3Zm6.4-.2h-2c-.6 0-1.1.2-1.4.8l-3.8 9.9h2.7l.5-1.5h3.3l.3 1.5h2.4l-2-10.7Zm-3.2 6.9c.2-.6 1-2.8 1-2.8s.2-.6.4-1l.2 1 .6 2.8h-2.2ZM17.2 10.7l-2.5 7.3-.3-1.4c-.5-1.6-1.9-3.4-3.5-4.3l2.3 8.9h2.7l4-10.5h-2.7Z" fill="#1a1f71"/>
        <path d="M11.6 10.7H7.5l-.1.2c3.2.8 5.3 2.7 6.2 5l-.9-4.4c-.1-.6-.5-.8-1.1-.8Z" fill="#f9a51a"/>
      </svg>
    </div>
    <div className="pv-pay" title="Mastercard">
      <svg viewBox="0 0 48 32" width="42" height="28">
        <rect width="48" height="32" rx="5" fill="#fff"/>
        <circle cx="19" cy="16" r="8" fill="#eb001b"/>
        <circle cx="29" cy="16" r="8" fill="#f79e1b"/>
        <path d="M24 10.4a8 8 0 0 0 0 11.2 8 8 0 0 0 0-11.2Z" fill="#ff5f00"/>
      </svg>
    </div>
    <div className="pv-pay" title="Pix">
      <svg viewBox="0 0 48 32" width="42" height="28">
        <rect width="48" height="32" rx="5" fill="#fff"/>
        <g transform="translate(14 6)" fill="#32bcad">
          <path d="M15.5 13.6a4.3 4.3 0 0 1-3-1.3l-2.5-2.4a1.5 1.5 0 0 0-1-.4H7.8L11 6.4a4.3 4.3 0 0 1 6.1 0l3.2 3.2 1.5-1.5L18.6 5a6 6 0 0 0-8.5 0L7 8H5.5c-.3 0-.7.2-1 .4L2.2 10.7l2.4 2.4a1.5 1.5 0 0 0 1 .4H7l3 3a6 6 0 0 0 8.6 0l3.1-3.1-1.5-1.5-3.2 3.2a4.3 4.3 0 0 1-1.5-1.5"/>
        </g>
      </svg>
    </div>
    <div className="pv-pay" title="Boleto">
      <svg viewBox="0 0 48 32" width="42" height="28">
        <rect width="48" height="32" rx="5" fill="#fff"/>
        <g fill="#1a1f1f">
          <rect x="7" y="8" width="2.5" height="16"/>
          <rect x="11" y="8" width="1" height="16"/>
          <rect x="13.5" y="8" width="3.5" height="16"/>
          <rect x="18.5" y="8" width="1.5" height="16"/>
          <rect x="21" y="8" width="2.5" height="16"/>
          <rect x="25" y="8" width="1" height="16"/>
          <rect x="27.5" y="8" width="3.5" height="16"/>
          <rect x="32.5" y="8" width="1.5" height="16"/>
          <rect x="35.5" y="8" width="1" height="16"/>
          <rect x="38" y="8" width="3" height="16"/>
        </g>
      </svg>
    </div>
  </div>
);

const Toast = ({ msg, onClose }) => {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return (
    <div className="pv-toast">
      <PawGlyph size={24} color="#fdfedf"/>
      <span>{msg}</span>
    </div>
  );
};

// Scroll-triggered reveal wrapper
function Reveal({ children, delay = 0, as = "div", className = "", once = true, threshold = 0.12 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          setSeen(true);
          if (once) io.unobserve(e.target);
        } else if (!once) {
          setSeen(false);
        }
      }),
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`pv-reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

// Infinite marquee
function Marquee({ items, speed = 28 }) {
  const seq = [...items, ...items];
  return (
    <div className="pv-marquee">
      <div className="pv-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {seq.map((it, i) => (
          <span key={i} className="pv-marquee-item">
            <PawGlyph size={16} color="currentColor"/>
            <span>{it}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Countdown timer (resets daily at 23:59:59)
function Countdown({ targetHour = 23, targetMinute = 59 }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const end = new Date(now);
  end.setHours(targetHour, targetMinute, 59, 0);
  if (end <= now) end.setDate(end.getDate() + 1);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div className="pv-countdown">
      <span><strong>{pad(h)}</strong><em>h</em></span>
      <span><strong>{pad(m)}</strong><em>m</em></span>
      <span><strong>{pad(s)}</strong><em>s</em></span>
    </div>
  );
}

// Expose
Object.assign(window, {
  BlobShape, CatGlyph, PawGlyph, CategoryIcon, PawPattern,
  ProductPlaceholder, Logo, PillBtn, Squircle, Toast, PaymentIcons,
  Reveal, Marquee, Countdown
});
